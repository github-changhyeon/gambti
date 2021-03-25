from bs4 import BeautifulSoup as bs
from urllib.request import urlopen
import pymysql          #mariaDB 사용
import sqlalchemy      #DB 접속 엔진
import json
import pandas as pd
import os

with open('config.json', 'r') as f:
    config = json.load(f)
HOST = config['DATABASE']['HOST']
USER = config['DATABASE']['USER']
PW = config['DATABASE']['PW']

DATABASE_URL = 'mysql+pymysql://'+USER+':'+PW+'@'+HOST+':3306/gambti?charset=utf8mb4'
engine_mariadb = sqlalchemy.create_engine(DATABASE_URL, echo=False)

IMAGE_FILE = os.path.join("image_data.pkl")
BG_IMAGE_FILE = os.path.join("background_image_data.pkl")
VIDEO_FILE = os.path.join("video_data.pkl")

def get_data():
    # mariadb의 table 값을 읽어서 DataFrame으로 반환
    game_data = pd.read_sql_table('game', engine_mariadb, columns={'game_id', 'url'})

    return game_data

def save_mariadb(data, table_name, column_name):
    # background_image, video가 없는 데이터에 대해서 drop 시켜야 sql 에러발생하지 않음
    data = data.dropna(subset=[column_name])

    for i in range(len(data)):
        row = data.iloc[i, :]
        game_id = row['game_id']
        path = row[column_name]
        #UPDATE game SET logo_image_path = 'image_path' WHERE game_id = 1;
        sql = 'UPDATE {} SET {} = {} WHERE {} = {}'.format(table_name, column_name, "'"+path+"'", 'game_id', game_id)

        with engine_mariadb.begin() as conn:
            conn.execute(sql)
    
    print("[*] 데이터 저장 완료")

def dump_dataframes(data, file_name):
    pd.to_pickle(data, file_name)

def load_dataframes(file_name):
    return pd.read_pickle(file_name)

def image_scrapy(data):
    #url, game_id DataFrame을 순회
    logo_list = []
    background_list = []
    video_list = []

    for i in range(len(data)):
        row = data.iloc[i, :]
        url = row['url']
        game_id = row['game_id']
        
        with urlopen(url) as response:
            soup = bs(response, 'html.parser')
            
            #logo_image
            for anchor in soup.select("img.game_header_image_full"):
                image_url = anchor.get('src')
            
            #background_image
            background_url = soup.find("a", attrs={"class" : "highlight_screenshot_link"})
            if(background_url is not None):
                background_url = background_url.get('href')
            
            #video
            video_url = soup.find("div", attrs={"class" : "highlight_movie"})
            if(video_url is not None):
                video_url = video_url.get('data-webm-source')
            print(i)

        logo_list.append({"game_id":game_id, "logo_image_path":image_url})
        background_list.append({"game_id":game_id, "background_image_path":background_url})
        video_list.append({"game_id":game_id, "video_url":video_url})


    logo_df = pd.DataFrame(logo_list)
    background_df = pd.DataFrame(background_list)
    video_df = pd.DataFrame(video_list)

    
    #pkl 파일로 생성
    dump_dataframes(logo_df, IMAGE_FILE)
    dump_dataframes(background_df, BG_IMAGE_FILE)
    dump_dataframes(video_df, VIDEO_FILE)
    print("스크래핑 끝!")


def main():
    print("[+] 게임 데이터 가져오기")
    game_data = get_data()
    print("[*] done..")
    print("[+] url 크롤링")
    image_scrapy(game_data)

    logo_image_data = load_dataframes(IMAGE_FILE)
    background_image_data = load_dataframes(BG_IMAGE_FILE)
    video_data = load_dataframes(VIDEO_FILE)
    
    save_mariadb(logo_image_data, "game", "logo_image_path")
    save_mariadb(background_image_data, "game", "background_image_path")
    save_mariadb(video_data, "game", "video_url")
    print("[*] success")

if __name__ == "__main__":
    main()
