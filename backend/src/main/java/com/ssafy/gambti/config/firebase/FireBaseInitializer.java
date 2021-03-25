package com.ssafy.gambti.config.firebase;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class FireBaseInitializer {

    private static final Logger logger = LoggerFactory.getLogger(FireBaseInitializer.class);
    private static final String FIREBASE_DATABASE_URL = "https://gambti-9002f-default-rtdb.firebaseio.com";

    @PostConstruct
    public void initialize() {
        try {
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.getApplicationDefault())
                    .setDatabaseUrl(FIREBASE_DATABASE_URL)
                    .build();
            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
                logger.info("Firebase application has been initialized");
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
    }
}