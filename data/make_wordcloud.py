from wordcloud import WordCloud, STOPWORDS
import matplotlib.pyplot as plt
from konlpy.tag import Okt
import pandas as pd
import os
import numpy as np

BASE_URL = "./rawdata"
DATA_FILE = os.path.join(BASE_URL, "reviews.jl")
DUMP_FILE = os.path.join(BASE_URL, "review_data.pkl")

STOPWORDS = ["를", "접", "정말", "게임"]
kkma = Okt()


#워드클라우드 함수
def displayWordCloud(data = None, game_id = None, backgroundcolor = 'black', width=1600, height=800):
    wordcloud = WordCloud(
                        font_path = './font/NanumSquareRoundB.ttf',
                        stopwords = STOPWORDS, 
                        background_color = backgroundcolor, 
                        width = width, height = height).generate(data)
    plt.figure(figsize = (15 , 10))
    plt.imshow(wordcloud)
    plt.axis("off")
    plt.tight_layout()

    image_file = os.path.join('./wordcloud_image', 'wc_'+str(game_id))
    
    plt.savefig(fname=image_file, bbox_inches='tight', pad_inches=0)


def nouns_wordcloud(content):
    for i in range(len(content)):
        game_id = content.iloc[i, 0]
        game_id = game_id['product_id']
        text = content.iloc[i, 1]

        # Kkma 으로 명사만 추출합니다.
        extract_nouns = kkma.nouns(''.join(str(text)))

        # 너무 적은 단어를 가진 것은 제외
        if(len(extract_nouns) >= 10):
            displayWordCloud(' '.join(extract_nouns), game_id)
    

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

def make_text_data(game_data, review_data):
    #game_data : 게임 아이디
    #review_data : 리뷰, 게임 아이디 데이터
    review_data = review_data.dropna(subset=['text'])

    # product_id 순으로 정렬
    game_data = game_data.sort_values('product_id')
    review_data = review_data.sort_values('product_id')
    
    index = 0
    reviews_list = []

    for idx, game_id in game_data.iterrows():
        text_list = []
        while(1):
            if(game_id.values == review_data.iloc[index, 0]):
                # text_list.append(reveiw_data.iloc[index, 0])
                text_list.append(review_data.iloc[index,1])
                index += 1
                if(index >= len(review_data)):
                    break
            else:
                break
        reviews_list.append({"game_id" : game_id, "text" : text_list})
    
    review_df = pd.DataFrame(reviews_list)

    return review_df


def main():
    data = import_data()
    dump_dataframes(data)
    data = load_dataframes(DUMP_FILE)

    #product_id, review text 데이터
    review_df = data["reviews"]
    #game_id만 저장되어있는 데이터 (Series 형태여서 DataFrame형태로 변환)
    game_df = pd.DataFrame(data["games"])

    # 게임별 리뷰 데이터
    reviews_df = make_text_data(game_df, review_df)
    nouns_wordcloud(reviews_df)


if __name__ == "__main__":
    main()