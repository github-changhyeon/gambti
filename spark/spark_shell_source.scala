import java.util.Properties
import org.apache.spark.sql.DataFrame
import org.apache.spark.ml.evaluation.RegressionEvaluator
import org.apache.spark.ml.recommendation.ALS


case class Genre(mgenre_id: Int, mgenre: String, sgenre_id: Int)
case class mGenre(mgenre_id: Int, mbti: String, score: Double)
case class gGenre(gender: Int,sgenre_id: Int)
case class aGenre(age: Int,sgenre_id: Int)

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

//mbti별 steam 장르에 해당하는 점수 계산 값
val final_mgenre_rating = mbti_genre_rating.drop('score).drop('count)


/* game에 대한 mbti rating 반영 점수 */
val game_genre_df = getTable("game_genre").drop('id).withColumnRenamed("genre_id", "sgenre_id").orderBy('game_id)


val join_mgame_rating = game_genre_df.join(final_mgenre_rating, Seq("sgenre_id"), "inner")
val mgame_genre_count = join_mgame_rating.groupBy('game_id, 'mbti).count

val calc_mgame_rating = join_mgame_rating.groupBy('game_id, 'mbti).agg(sum('rating))
val join_mgame_count = calc_mgame_rating.join(mgame_genre_count, Seq("game_id", "mbti"), "inner").withColumnRenamed("sum(rating)", "rating")

// game별 mbti별 rating
val final_mgame_rating = join_mgame_count.withColumn("m_rating", ('rating/'count)*0.4).drop('count).drop('rating)


/* 성별에 따른 rating */
val raw_data3 = spark.read.textFile("/home/ubuntu/apps/spark/data/gambti/gender_steam_genre.txt")
val gender_sgenre_df = raw_data3.map(x => x.split("\t")).map(x => gGenre(x(0).toInt, x(1).toInt)).toDF()

//성별과 steam 장르 매칭
val join_gender_sgenre = game_genre_df.join(gender_sgenre_df, Seq("sgenre_id"), "inner")
val gender_sgenre_count = join_gender_sgenre.groupBy('game_id, 'gender).count
val male_sgenre_rating = gender_sgenre_count.where($"gender".isin(1)).withColumn("g_rating", 'count*2*0.2).drop('count)
val female_sgenre_rating = gender_sgenre_count.where($"gender".isin(2)).withColumn("g_rating", 'count*3*0.2).drop('count)

//game별 성별에 따른 rating
val final_gender_rating = male_sgenre_rating.union(female_sgenre_rating)


/* 연령대에 따른 rating */
val raw_data4 = spark.read.textFile("/home/ubuntu/apps/spark/data/gambti/age_steam_genre.txt")
val age_sgenre_df = raw_data4.map(x => x.split("\t")).map(x => aGenre(x(0).toInt, x(1).toInt)).toDF()
val join_age_sgenre = game_genre_df.join(age_sgenre_df, Seq("sgenre_id"), "inner")
val age_sgenre_count = join_age_sgenre.groupBy('game_id, 'age).count

val etc_items = List(30, 40, 50)
val age_10_rating = age_sgenre_count.where($"age".isin(10)).withColumn("a_rating", 'count*2*0.1)
val age_20_rating = age_sgenre_count.where($"age".isin(20)).withColumn("a_rating", 'count*3*0.1)
val age_etc_rating = age_sgenre_count.where($"age".isin(etc_items:_*)).withColumn("a_rating", 'count*10*0.1)

val union_df = age_10_rating.union(age_20_rating)

//game 별 연령대에 따른 rating
val final_age_rating = union_df.union(age_etc_rating).drop('count)


/* user-game matrix 생성 */
val cjoin_user_game = user_info.crossJoin(game_info).drop('max_price)
val gender_toint = cjoin_user_game.withColumn("gender", when($"gender".isin("MALE"), lit(1)).otherwise(lit(2)))

val join_mbti = gender_toint.join(final_mgame_rating, Seq("game_id", "mbti"), "inner").drop('mbti)
val join_gender = join_mbti.join(final_gender_rating, Seq("game_id", "gender"), "inner").drop('gender)
val join_age = join_gender.join(final_age_rating, Seq("game_id", "age"), "inner").drop('age)
val final_rating = join_age.withColumn("rating", 'm_rating + 'g_rating + 'a_rating + ('metascore * 0.03))

//user-game-rating matrix 
val user_game = final_rating.drop("m_rating", "g_rating", "a_rating", "metascore").select("no", "game_id", "rating")


/* als model */
// val Array(training, test) = user_game.randomSplit(Array(0.8, 0.2))
val als = new ALS()
  .setMaxIter(10)
  .setRegParam(0.01)
  .setUserCol("no")
  .setItemCol("game_id")
  .setRatingCol("rating")
  .setImplicitPrefs(true)

val model = als.fit(user_game)

//모든 user에 대해서 10개의 게임 추천
val userRecs = model.recommendForAllUsers(10)

//user_id, game_id, rating 컬럼을 가지는 dataFrame으로 변환
val user_rec_game = userRecs.select($"no", explode($"recommendations")).select($"no", $"col.game_id", $"col.rating")
