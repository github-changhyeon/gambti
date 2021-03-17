import pandas as pd
import json
import os
import shutil
import numpy as np
import pickle
import pymysql          #mariaDB 사용
import sqlalchemy      #DB 접속 엔진

DATA_FILE = os.path.join("products_all.jl")
DUMP_FILE = os.path.join("game_data.pkl")

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

    games = data[[*game_columns, "tags", "specs", "genres"]]  #게임관련 데이터 테이블 + tag, specs

    return {"games": games}


def dump_dataframes(dataframes):
    pd.to_pickle(dataframes, DUMP_FILE)


def load_dataframes():
    return pd.read_pickle(DUMP_FILE)

def save_mariadb(data):
    HOST = 'gambtidb.c4kbbredlqua.ap-northeast-2.rds.amazonaws.com'
    USER = 'ssafy'
    PW = 'gambti123!'

    DATABASE_URL = 'mysql+pymysql://'+USER+':'+PW+'@'+HOST+':3306/gambti?charset=utf8mb4'
    engine_mariadb = sqlalchemy.create_engine(DATABASE_URL, echo=False)

    game_df = data["games"]
    game_df = game_df[['id', 'app_name', 'developer', 'metascore', 'price', 'publisher', 'release_date', 'sentiment']]
    game_df.rename({'id':'game_id'}, inplace=True)
    table_name = 'game'
    
    print(game_df.head())
#    game_df.to_sql(name=table_name, con=engine_mariadb, index=False, if_exists='append') --> append로 테스트 안해봄
    game_df.to_sql(name=table_name, con=engine_mariadb, index=False, if_exists='replace')


def main():

    print("[*] Parsing data...")
    data = import_data()
    print("[+] Done")

    print("[*] Dumping data...")
    dump_dataframes(data)
    print("[+] Done\n")

    data = load_dataframes()

    term_w = shutil.get_terminal_size()[0] - 1
    separater = "-" * term_w

    print("[게임]")
    print(f"{separater}\n")
    print(data["games"].head())
    print(f"\n{separater}\n\n")

    save_mariadb(data)

if __name__ == "__main__":
    main()
