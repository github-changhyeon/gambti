import requests
import json
import pandas as pd

API_KEY = '22A1030E33EBE73E25C415353E77E2BB'
STEAM_ID = '76561198173609817'

#STEAM_ID에 해당하는 user가 가지고 있는 게임의 app_id와 playtime
url = 'https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key='+API_KEY+'&steamid='+STEAM_ID

#rest api 요청
response = requests.get(url)
json_data = response.json()
game_data = json_data.get('response').get('games')

#list type을 dataframe으로 만들기
df = pd.DataFrame(game_data)
print(df)
