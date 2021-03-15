package com.ssafy.gambti.models.auth;

import lombok.Data;

@Data
public class FirebaseProperties {

	int sessionExpiryInDays;
	String databaseUrl;
	boolean enableStrictServerSession;
	boolean enableCheckSessionRevoked;
	boolean enableLogoutEverywhere;

}
