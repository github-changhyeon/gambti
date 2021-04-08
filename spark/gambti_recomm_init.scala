import java.util.Properties
import org.apache.spark.sql._
import spark.implicits._
import org.apache.spark.sql.types._
import org.apache.spark.sql.expressions.Window

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
val user_rec_df = getTable("user_recommend_game").drop('id)

val user_info = user_df.select('no, 'gender, 'mbti).withColumnRenamed("no", "user_id")
val join_rec = user_rec_df.join(user_info, Seq("user_id"), "inner").orderBy('user_id)
val rec_filter = join_rec.filter('user_id > 31)
val w = Window.orderBy("user_id")
val final_rec_init = rec_filter.withColumn("id", row_number().over(w).cast(LongType)).drop('user_id)

def saveMariaDB(res_df: DataFrame, tname: String){
		res_df.write.mode(SaveMode.Append).jdbc(url, tname, prop)
		print("[*] Save MariaDB Success")
}

saveMariaDB(final_rec_init, "user_recommend_game_init")