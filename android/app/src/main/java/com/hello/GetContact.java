package com.hello;

import static android.app.Activity.RESULT_OK;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.provider.ContactsContract;
import android.telephony.TelephonyManager;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class GetContact extends ReactContextBaseJavaModule implements ActivityEventListener {
    private static final int CONTACT_PICKER_RESULT = 1001;
    private Callback onActivityResultCallback;

    GetContact(ReactApplicationContext context) {
        super(context);
        context.addActivityEventListener(this);
    }

    @NonNull
    @Override
    public String getName() {
        return "GetContact";
    }

    @ReactMethod
    public void getNumber(Callback callBack) {
        Log.d("getNumber======== ", "aaaaaaa");
        callBack.invoke("aaaaa");


    }

    @ReactMethod
    private void openContactPicker(Callback callback) {
        this.onActivityResultCallback = callback;
        if (getCurrentActivity() != null) {
            Intent contactPickerIntent = new Intent(Intent.ACTION_PICK, ContactsContract.CommonDataKinds.Phone.CONTENT_URI);
            getCurrentActivity().startActivityForResult(contactPickerIntent,CONTACT_PICKER_RESULT);

        }
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, @Nullable Intent data) {

        if (resultCode == RESULT_OK && data != null) {
            switch (requestCode) {
                case CONTACT_PICKER_RESULT:
                    Log.d("data===================",requestCode+"");
                    handleContactPickerResult(activity, data);
                    break;
                // Add more cases for other requestCode values if needed
                // case ANOTHER_REQUEST_CODE:
                //     handleAnotherResult(activity, data);
                //     break;
                default:
                    // Handle unexpected requestCode values
                    break;
            }
        }
    }




    @Override
    public void onNewIntent(Intent intent) {

    }


    private void handleContactPickerResult(Activity activity, Intent data) {
        Uri contactUri = data.getData();

        if (contactUri != null) {
            // Proceed with the rest of the code as before
            Cursor cursor = activity.getContentResolver().query(contactUri, null, null, null, null);

            if (cursor != null && cursor.moveToFirst()) {
                try {
                    int nameColumnIndex = cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER);
                    String contactName = cursor.getString(nameColumnIndex);

                    if (contactName != null) {
                        if (contactName.startsWith("0") && !contactName.startsWith("00")) {
                            TelephonyManager telephonyManager = (TelephonyManager) activity.getSystemService(Context.TELEPHONY_SERVICE);

                            if (telephonyManager != null) {
                                String networkOperator = telephonyManager.getNetworkCountryIso();

                                if (networkOperator != null) {
                                    String countryCode = CountryUtils.getISDFromCode2(networkOperator.toUpperCase());

                                    if (countryCode != null) {
                                        String convertedNumber = countryCode + contactName.substring(1);
                                        if (onActivityResultCallback != null) {
                                            onActivityResultCallback.invoke(convertedNumber);
                                        }
                                    }
                                }
                            }
                        } else {
                            if (onActivityResultCallback != null) {
                                onActivityResultCallback.invoke(contactName);
                            }
                        }
                    }
                } finally {
                    cursor.close();
                }
            }
        } else {
            // Handle the case where contactUri is null
            Log.e("ContactPicker", "Null contactUri received");
        }
    }
}


