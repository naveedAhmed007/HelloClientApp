package com.hello;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.auth.oauth2.GoogleCredentials;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

public class AccessToken extends ReactContextBaseJavaModule {

    private static final String firebaseMessagingScope =
            "https://www.googleapis.com/auth/firebase.messaging";

    @NonNull
    @Override
    public String getName() {
        return "AccessToken";
    }

    public AccessToken(ReactApplicationContext reactContext) {
        super(reactContext);
    }



    @ReactMethod
    public void getAccessToken(Promise promise) {
        try {
            String jsonString = "{\n" +
                    "  \"type\": \"service_account\",\n" +
                    "  \"project_id\": \"hello-90a68\",\n" +
                    "  \"private_key_id\": \"fb191e290e3eacbe241d5f6c54d11d2a02f128bc\",\n" +
                    "  \"private_key\": \"-----BEGIN PRIVATE KEY-----\\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDfkjB894zToQHz\\nALiWxniwE6sRezRo616TjOkwJGp4GQr+92co2jFw74V/DgwX0lBpWn5Q2GEZsnvd\\npysCsCiGE2iy9Urw8/mKmrTHxRwlTTuzTrisHhuaQska4h1k0Nwq0jI8qWO3E8Tr\\nUgJjVRkmWKA3GX1AkgOFYZOSGQRBIiNVv/i6evuerHesQMwl7q4zUXa0n71UhKCL\\nWQ6dlwlPSpzMDGc0DtgoHfUcJluU4vmESPXC98kgxMi3j7sMbeh0aaC/Wy13id9A\\n0fHOwtxv/PFe8KScTDosD2edpGEWoamIE3/61B/yS8Hoi5gHoMuc6kTmTGMJI1J1\\neHxfuc3ZAgMBAAECggEABfEpkcC166VYBcCLUhKPVZqy4sGOszUs69NZxUT1LCD6\\nQ6wz/912D/AwcPU2HryhFNO/ZLWuNakilVG37m0xKTMYhsfHM0qWDiLY0tsVyZYD\\nvrBvxGn+cNCn7gDRfYL26bpxdF701AJWAFfLJsm1uT5aGmzL1pdVjvTOH8VuHARY\\nB08hrw5OiwPwQIB6eraPvCwUlPSQLUtx9DB5WXHZmPUmpSBHdMtO6WtReLfd9wQJ\\ntDQy65JdRg5HrFmbNzHPuIqBSdQeB+ic65BIGohf8QkQxIb8WK6KV5TLcAgc9SfP\\nXDSKMd5vif+MsriAr3PxPfbzXZ9fnKew6W3h/Im0iQKBgQD6rH/eyVrScGp3wbc3\\nsGuwoYFyHCEhzuj1kUEcHpFdTyS2Lr7ZvRBZh0L2qNPyyZkbqZexYKlaTadKsv+K\\nwutotvUF9Ff86jUmtJDQDeaGbPw9YgvwqMq7DzVe/XvUwcI9VAkRAzaYJkJ6U5b5\\nsw8ij/edguJjWKOyVMlt1MOqlQKBgQDkUkTH7b8lI/88O3XdLor7y8ulG57yQYrT\\n3T+sQXXzs7X3hkOYbYyPt5Pmdtk0UWZSg6BGDxQh5ZOl81OT48Cho4GcumTfeAxD\\nun8OSExVBUefDiZYJI/fKk3R7cB+bYAJKqx7/NaRp2DYh5N768iyciiRgNjBo4U/\\n5IEwh4dJNQKBgQD6T3o4W1SHwp1uDFAKGe7PJ9b8vT4QZm6VmIAtthBt3nPIQBFv\\nl61V2Q1zBM7wJ4Lt7oF9LAqwE86zdt5aD53GqLsvQPkDolOE3NWmC9tf7EBMgzVt\\nEP+vntYqjnAy2XA+kUWkaVMAx2OmhwXBPZ4lYyFdda7eiUqc7rFdLRJdqQKBgQDH\\nJOKNJ1cTRAR5OruhAdmDqcuj5SWL05MNG+tPiYEh4NuUW+1VZCe3qr07xOnKcj03\\nN0tyD/DVZ/KSSlvZoEsCMST52LHnIERCRsZPZMv/VC2WE7dqJem/Epzxv9en7kZA\\nuJHdSzizrjQQaKBA8/UHf/7WenWU39V3Vw0/kNZ1CQKBgQDxop1hoovh6dk2CoSY\\nNuRTSQmjRDxF+AmTtgZF0d/2z0PWrxBoWrWeZiMIhQMF5Kjrnsaiyy65/17ORAd0\\nemXkKrGXat++YzIQFe0aYwwCwOQNunkcb58xHhvoCGshHJQfUaYVmu93OVprUt6b\\nmFKCX68LKjC2UG2TM2hL5lQ3ug==\\n-----END PRIVATE KEY-----\\n\",\n" +
                    "  \"client_email\": \"firebase-adminsdk-hb1gg@hello-90a68.iam.gserviceaccount.com\",\n" +
                    "  \"client_id\": \"111707734921742597357\",\n" +
                    "  \"auth_uri\": \"https://accounts.google.com/o/oauth2/auth\",\n" +
                    "  \"token_uri\": \"https://oauth2.googleapis.com/token\",\n" +
                    "  \"auth_provider_x509_cert_url\": \"https://www.googleapis.com/oauth2/v1/certs\",\n" +
                    "  \"client_x509_cert_url\": \"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-hb1gg%40hello-90a68.iam.gserviceaccount.com\",\n" +
                    "  \"universe_domain\": \"googleapis.com\"\n" +
                    "}\n";
            InputStream stream = new ByteArrayInputStream(jsonString.getBytes(StandardCharsets.UTF_8));
            GoogleCredentials googleCredentials = GoogleCredentials.fromStream(stream).createScoped(firebaseMessagingScope);
            googleCredentials.refresh();
            String token = googleCredentials.getAccessToken().getTokenValue();
            promise.resolve(token);
        } catch (Exception e) {
            promise.reject("ACCESS_TOKEN_ERROR", e);
        }
    }
}
