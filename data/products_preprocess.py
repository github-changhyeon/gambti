import pandas as pd
import json
import os
import shutil
import numpy as np
import pickle
import pymysql          #mariaDB 사용
import sqlalchemy      #DB 접속 엔진

BASE_URL = "./rawdata"
DATA_FILE = os.path.join(BASE_URL, "products_all.jl")
DUMP_FILE = os.path.join(BASE_URL, "game_data.pkl")

game_columns = (
    "id",  # 스팀 고유 게임 아이디
    "app_name",  # 게임 이름
    "developer",  # 개발사
    "publisher",  # 배급사
    "release_date",  # 출시일
    "metascore",  # 메타스코어
    "price",  # 가격(int)
    "sentiment",  # 사용자 반응
    "url",  # 게임 링크(스팀링크)
)

def import_data(data_path=DATA_FILE):
    """
    파일을 읽어서 Pandas DataFrame 형태로 저장
    """
    try:
        data = pd.read_json(data_path, lines=True, encoding="utf-8")
    except FileNotFoundError as e:
        print(f"`{data_path}` 가 존재하지 않습니다.")
        exit(1)

    # 결측치 제거 --> id가 존재하지 않는 것은 삭제
    nullcnt = data["id"].isnull().sum()
    if nullcnt > 0:
        data = data.dropna(subset=["id"])

    # app_name이 존재하지 않는 값 삭제
    data = data.dropna(subset=["app_name"])
   
    # id가 float64 형태이기 때문에 index 사용을 위해서 int64 형태로 변환
    data["id"] = data["id"].astype(np.int64)

    # price 원화를 int로 변환하기 위해 특수문자 제거
    data["price"] = data["price"].str.replace(pat=r'[^\w]', repl=r'', regex=True)
    # 숫자인 것은 숫자로 변경하고 아닌 것은 NaN 반환
    data["price"] = pd.to_numeric(data["price"], errors='coerce')

    #  metascore nan인 것은 0점으로 처리, price 없는 것 0으로 처리
    data = data.fillna({"metascore" : 0, "price" : 0})
    data["metascore"] = data["metascore"].replace('NA', 0) #'NA' 값은 0으로 처리

    #id 중복인 것에 대해서 duplicate drop
    data = data.drop_duplicates(["id"])

    games = data[[*game_columns, "tags", "specs", "genres"]]  #게임관련 데이터 테이블 + tag, specs

    return {"games": games}


def dump_dataframes(dataframes):
    pd.to_pickle(dataframes, DUMP_FILE)


def load_dataframes(filename):
    return pd.read_pickle(filename)

def save_mariadb(data, table_name):
    with open('config.json', 'r') as f:
        config = json.load(f)

    HOST = config['DATABASE']['HOST']
    USER = config['DATABASE']['USER']
    PW = config['DATABASE']['PW']

    DATABASE_URL = 'mysql+pymysql://'+USER+':'+PW+'@'+HOST+':3306/gambti?charset=utf8mb4'
    engine_mariadb = sqlalchemy.create_engine(DATABASE_URL, echo=False)

    #duplicate 문제를 해결하기 위해 data 저장 전에 truncate table을 먼저 수행
    # if table_name == "game":
    #     engine_mariadb.connect().execute("TRUNCATE TABLE "+table_name) 

    data.to_sql(name=table_name, con=engine_mariadb, index=False, if_exists='append') 

def extract_dataframe(data, column_name):
    target_data = data[column_name].dropna() 
    lists = []
    
    for index, row in target_data.items():
        for item in row:
            lists.append(item)

    #리스트를 dataframe으로 만들기
    extract_df = pd.DataFrame(lists, columns=[column_name[0:-1]+"_name"]).drop_duplicates()
    return extract_df

def make_mapping_table(games, category, map_names):
    #nan값을 drop 시켜야 for문에서 float it not iterable 오류가 발생하지 않음
    map_df = games[["id", map_names]].dropna(subset=[map_names])

    #genres->genre / tags->tag
    name = map_names[0:-1]

    rows_list = []
    for idx, row in map_df.iterrows():
        for item in row[map_names]:
            #dict 형태로 만들어서 list에 append 한 다음
            rows_list.append({"game_id":row["id"], name+"_name":item})
    
    #list를 DataFrame 형태로 만들기
    df = pd.DataFrame(rows_list)

    #category의 id를 가져오기 위해서 index reset + 1 (index는 0번부터 시작이므로)
    category[name+"_id"] = category.reset_index(drop=True).index+1

    #inner join
    df_result = pd.merge(df, category, on=name+"_name", how="inner")
    df_result = df_result[["game_id", name+"_id"]]
    
    return df_result

def add_image_path(data):
    IMAGE_FILE = os.path.join(BASE_URL, "image_data.pkl")
    image_data = load_dataframes(IMAGE_FILE)

    df_result = pd.merge(data, image_data, on='game_id', how="inner")
    
    return df_result

def main():
    print("[*] Parsing data...")
    data = import_data()
    print("[+] Done")

    print("[*] Dumping data...")
    dump_dataframes(data)
    print("[+] Done\n")

    data = load_dataframes(DUMP_FILE)
    #DB에 저장하기 위한 정제(game 테이블)
    game_df = data["games"]
    game_df = game_df[[*game_columns]]
    game_df.rename(columns={'id':'game_id'}, inplace=True) #id를 DB의 컬럼명(game_id)과 맞춰주기

    #장르, 태그 dataframe 추출
    genre_df = extract_dataframe(data["games"], "genres")
    tag_df = extract_dataframe(data["games"], "tags")

    #game-genre 맵핑 테이블
    game_genre_df = make_mapping_table(data["games"], genre_df, "genres")
    game_tag_df = make_mapping_table(data["games"], tag_df, "tags")

    #image주소가 포함된 df
    game_df = add_image_path(game_df)

    '''
    #maria DB에 저장
    save_mariadb(genre_df, 'genre')
    save_mariadb(tag_df, 'tag')
    save_mariadb(game_genre_df, 'game_genre')
    save_mariadb(game_tag_df, 'game_tag')
    save_mariadb(game_df, 'game')
    '''

if __name__ == "__main__":
    main()
