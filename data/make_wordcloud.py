from wordcloud import WordCloud, STOPWORDS
import matplotlib.pyplot as plt
from konlpy.tag import Okt
import pandas as pd
import os
import numpy as np

BASE_URL = "./rawdata"
DATA_FILE = os.path.join(BASE_URL, "reviews.jl")
DUMP_FILE = os.path.join(BASE_URL, "review_data.pkl")

#워드클라우드 함수
def displayWordCloud(data = None, backgroundcolor = 'white', width=1600, height=800):
    wordcloud = WordCloud(
                        font_path = '/Library/Fonts/NanumBarunGothic.ttf', 
                        stopwords = STOPWORDS, 
                        background_color = backgroundcolor, 
                         width = width, height = height).generate(data)
    plt.figure(figsize = (15 , 10))
    plt.imshow(wordcloud)
    plt.axis("off")
    plt.show()

kkma = Okt()

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
    nullcnt = data["product_id"].isnull().sum()
    if nullcnt > 0:
        data = data.dropna(subset=["product_id"])
   
    # id가 float64 형태이기 때문에 index 사용을 위해서 int64 형태로 변환
    data["product_id"] = data["product_id"].astype(np.int64)

    reviews = data[["product_id", "text"]]
    games = data.drop_duplicates(["product_id"])
    games = games["product_id"]

    return {"reviews": reviews, "games": games}

def dump_dataframes(dataframes):
    pd.to_pickle(dataframes, DUMP_FILE)


def load_dataframes(filename):
    return pd.read_pickle(filename)

def make_text_data(game_data, reveiw_data):
    #game_data : 게임 아이디
    #review_data : 리뷰, 게임 아이디 데이터
    
    for idx, game_id in game_data.items():
        text_list = []
        for i, row in reveiw_data.iterrows():
            if(game_id == row["product_id"]):
                # print(str(game_id) + " " + str(row["product_id"]))
                text_list.append(row["text"])
            else:
                continue
        print(text_list)
      

def main():
    # Kkma 으로 명사만 추출합니다.
    # kkma_content_nouns = kkma.nouns(''.join(str(df['content'].fillna(''))))
    # print(kkma_content_nouns[-10:])
    data = import_data()
    dump_dataframes(data)
    data = load_dataframes(DUMP_FILE)

    #product_id, review text 데이터
    review_df = data["reviews"]
    #game_id만 저장되어있는 데이터
    game_df = data["games"]
    
    make_text_data(game_df, review_df)

if __name__ == "__main__":
    main()