from bs4 import BeautifulSoup as bs
from urllib.request import urlopen
import pymysql          #mariaDB 사용
import sqlalchemy      #DB 접속 엔진
import json
import pandas as pd
import os

# 일단 game의 id와 url을 가져온다
# url을 하나씩 순회하면서 bs4를 이용하여 대표 이미지 주소 가져오기
# <img class = "game_header_image_full" />
with open('config.json', 'r') as f:
    config = json.load(f)
HOST = config['DATABASE']['HOST']
USER = config['DATABASE']['USER']
PW = config['DATABASE']['PW']

DATABASE_URL = 'mysql+pymysql://'+USER+':'+PW+'@'+HOST+':3306/gambti?charset=utf8mb4'
engine_mariadb = sqlalchemy.create_engine(DATABASE_URL, echo=False)

DUMP_FILE = os.path.join("image_data.pkl")

def get_data():
    # mariadb의 table 값을 읽어서 DataFrame으로 반환
    game_data = pd.read_sql_table('game', engine_mariadb, columns={'game_id', 'url'})

    return game_data

def save_mariadb(data):
    table_name = 'game'
    for i in range(len(data)):
        row = data.iloc[i, :]
        game_id = row['game_id']
        path = row['logo_image_path']
        #UPDATE game SET logo_image_path = 'image_path' WHERE game_id = 1;
        sql = 'UPDATE {} SET {} = {} WHERE {} = {}'.format(table_name, 'logo_image_path', "'"+path+"'", 'game_id', game_id)

        with engine_mariadb.begin() as conn:
            conn.execute(sql)
    
    print("[*] 데이터 저장 완료")

def dump_dataframes(data):
    pd.to_pickle(data, DUMP_FILE)

def load_dataframes():
    return pd.read_pickle(DUMP_FILE)

def image_scrapy(data):
    #url, game_id DataFrame을 순회
    rows_list = []
    for i in range(len(data)):
        row = data.iloc[i, :]
        url = row['url']
        game_id = row['game_id']
        
        with urlopen(url) as response:
            soup = bs(response, 'html.parser')
            for anchor in soup.select("img.game_header_image_full"):
                image_url = anchor.get('src')
                print(i)

        rows_list.append({"game_id":game_id, "logo_image_path":image_url})

    df = pd.DataFrame(rows_list)
    
    #pkl 파일로 생성
    dump_dataframes(df)
    
    print("스크래핑 끝!")
    save_mariadb(df)

def main():
    print("[+] 게임 데이터 가져오기")
    game_data = get_data()
    print("[*] done..")
    print("[+] url 크롤링")
    # image_scrapy(game_data)

    data = load_dataframes()
    # save_mariadb(data)
    print("[*] success")

if __name__ == "__main__":
    main()
