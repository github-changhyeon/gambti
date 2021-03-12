import pandas as pd

#.jl 파일을 DataFrame으로
df = pd.read_json('products_all.jl', lines=True)




# print(tabulate(df.head(), headers='keys', tablefmt='psql'))
print('total '+ str(len(df)))
