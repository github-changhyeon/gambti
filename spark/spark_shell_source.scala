import java.util.Properties
import org.apache.spark.sql.DataFrame

case class Genre(mgenre_id: Int, mgenre: String, sgenre_id: Int)
case class mGenre(mgenre_id: Int, mbti: String, score: Double)


val url = "jdbc:mysql://gambtidb.c4kbbredlqua.ap-northeast-2.rds.amazonaws.com:3306/gambti?serverTimezone=UTC&useUnicode=true&characterEncoding=utf8"
val prop = new Properties()

def loadMariaDB(){
	prop.put("user", "ssafy")
	prop.put("password", "gambti123!")
	prop.setProperty("driver", "com.mysql.cj.jdbc.Driver")
	print("Load MariaDB Success")
}
	
loadMariaDB()

def getTable(tname: String): DataFrame = {
	val get_df = spark.read.jdbc(url, tname, prop)
	
	return get_df
}
	
val user_df = getTable("user")
val game_df = getTable("game")

/* calcRating */
val genre_df = getTable("genre")
val game_genre_df = getTable("game_genre")







//전처리 : 계산에 필요한 정보만 추출
val user_info = user_df.select('no, 'age, 'gender, 'max_price, 'mbti)
val game_info = game_df.select('game_id, 'metascore)

//Rating 계산할 정보
val raw_data = spark.read.textFile("/home/ubuntu/apps/spark/data/gambti/mbti_steam_genre.txt")
val genre_mapping_df = raw_data.map(x => x.split("\t")).map(x => Genre(x(0).toInt, x(1), x(2).toInt)).toDF()

val raw_data2 = spark.read.textFile("/home/ubuntu/apps/spark/data/gambti/mbti_mgenre_rating.txt")
val mgenre_rating_df = raw_data2.map(x => x.split("\t")).map(x => mGenre(x(0).toInt, x(1), x(2).toDouble)).toDF()

//계산에 사용할 count 구하기
val sgenre_count = genre_mapping_df.groupBy("sgenre_id").count.orderBy("sgenre_id")

val join_genre_rating = mgenre_rating_df.join(genre_mapping_df, Seq("mgenre_id"), "inner").orderBy("mbti","mgenre_id")
val mbti_genre_score = join_genre_rating.groupBy("mbti", "sgenre_id").agg(sum("score"))
val join_count = mbti_genre_score.join(sgenre_count, Seq("sgenre_id"), "inner").orderBy("mbti", "sgenre_id").withColumnRenamed("sum(score)", "score")

val mbti_genre_rating = join_count.withColumn("rating", 'score/'count)
val final_mgenre_rating = mbti_genre_rating.drop('score).drop('count)
