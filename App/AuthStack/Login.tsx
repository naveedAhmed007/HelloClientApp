import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Button,
  ActivityIndicator,
  Platform,
  NativeModules,
  Keyboard,
  Alert,
  PermissionsAndroid,
} from "react-native";
import {
  addContactPickCancelledListener,
  addContactPickedListener,
  pickContact,
} from "../Utils/ContactPickerModule";

import React, { useEffect, useRef, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import { moderateScale } from "react-native-size-matters";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomHeader from "../CustomHeader/CustomeHeader";
import CustomStatusBar from "../Utils/CustomStatusBar";
import { Colors } from "../Utils/Colors";
import { CountryPicker } from "react-native-country-codes-picker";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setUserLoginNumber } from "../Redux/AuthReducer/authSlice";
import auth from "@react-native-firebase/auth";
import OTPInput from "./OTPInput";
import EditTextPhone from "../Utils/EditTextPhone";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Contacts from "react-native-contacts";
import firestore from "@react-native-firebase/firestore";
import messaging from "@react-native-firebase/messaging";
import moment from "moment";

function Login() {
  let navigation = useNavigation();
  let focus = useIsFocused();
  let dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fCMToken,   setfCMToken] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState(""); // default to US country code
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [fullScreenLoading, setFullScreenLoading] = useState(false);
  const [showPicker1, setShowPicker1] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<number | null>(null);
  const FromOtpScreen = useSelector((state) => state.auth.FromOtpScreen);

  const { GetContact } = NativeModules;

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log("fcmToken>>>>>>>>>>>>>>>>>>", fcmToken);
        setfCMToken(fcmToken)
      }
    }
  }

  useEffect(() => {
    requestUserPermission();
  }, []);

  useEffect(() => {
    if (focus) {
      handleFirstSignOutFromFirestore();
      setFullScreenLoading(true);
      getData();
    }
  }, [focus]);
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [phoneNumber, countryCode]);

  const handleFirstSignOutFromFirestore = async () => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        await auth().signOut();
        console.log("User signed out successfully");
      } else {
        console.log("No user is currently signed in");
      }
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("UserNumber");
      if (value !== null) {
        console.log("Store User Number>>", value);
        dispatch(setUserLoginNumber(value));
        setFullScreenLoading(false);
        dispatch(setLogin(true));
        // alert('i,m calling')
      } else {
        setFullScreenLoading(false);
      }
    } catch (e) {
      setFullScreenLoading(false);
      // error reading value
    }
  };

  const onPressFlag1 = () => {
    setShowPicker1(true);
  };
  const handleSubmit = () => {
    handleTopic();
    addData();
    dispatch(setUserLoginNumber(phoneNumber));
    dispatch(setLogin(true));
  };
  const handleTopic = () => {
    try {
      messaging()
        .subscribeToTopic("all")
        .then(() => console.log("Subscribed to topic!"));
      messaging()
        .subscribeToTopic(removePlusSign(countryCode?.toLowerCase()))
        .then(() =>
          console.log(
            "Subscribed to topic!",
            removePlusSign(countryCode?.toLowerCase())
          )
        );
    } catch (error) {
      console.log(error);
    }
  };
  const removePlusSign = (countryCode: any) => {
    return countryCode.replace("+", "");
  };

  const handleDrawer = () => {
    navigation.openDrawer();
  };

  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState("");

  // Handle login
  async function onAuthStateChanged(user: any) {
    if (user) {
      console.log("All user List", user);
      setConfirm(null);
      setLoading(true);
      // alert(fromOtpScreen);
      handleSubmit();
      setLoading(false);

      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    } else {
      console.log("onAuthStateChanged  else", user);
    }
  }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber: any) {
    setLoading(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      // console.log(
      //   "confirmation >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
      //   confirmation
      // );
      setConfirm(confirmation);
      setLoading(true);
    } catch (error) {
      alert(error);
      // Handle the error as needed, for example, showing an error message to the user
    } finally {
      setLoading(false);
    }
  }

  const addData = async () => {
    try {
      const phoneNumberExists = await checkPhoneNumberExists(phoneNumber);

      if (phoneNumberExists) {
        console.log("Phone number already exists. No need to add data.");
        return;
      }
      const dataToAdd = {
        adminEmail: "admin@test.com",
        countryCode: countryCode,
        credits: "10",
        password: "123456",
        phoneNumber: phoneNumber,
        remainingCredit: 60000,
        role: "client",
        fcmToken:fCMToken,
        date: moment().format("DD/MM/YYYY"),
      };
      const collectionRef = firestore().collection("users");

      // Add data to the collection
      await collectionRef.add(dataToAdd);
      console.log("Data added successfully.");
    } catch (error) {
      console.error("Error adding data: ", error);
      // setShowLoader(false);
    }
  };
  const checkPhoneNumberExists = async (phoneNumber: any) => {
    const collectionRef = firestore().collection("users");
    const querySnapshot = await collectionRef
      .where("phoneNumber", "==", phoneNumber)
      .get();
    return !querySnapshot.empty;
  };

  async function confirmCode(otp: any) {
    // alert(otp);
    // setFromOtpScreen(true);
    try {
      setLoading(true);
      const resp = await confirm.confirm(otp);
      // handleSubmit();
      // console.log(resp);
      setLoading(false);
    } catch (error) {
      alert(error);
      setLoading(false);
      console.log("Invalid code.");
    }
  }

  const phoneRef1: any = useRef(null);
  const handleValidation = () => {
    const isValid1 = phoneRef1.current?.isValidNumber(
      phoneRef1?.current?.getValue()
    );

    setPhoneNumber(phoneRef1?.current?.getValue());
    setCountryCode("+" + phoneRef1?.current?.getCountryCode());
    if (isValid1 == false) {
      alert("first number is invalid");
    } else {
      signInWithPhoneNumber(phoneRef1?.current?.getValue());
    }
  };

  const handleResendOtp = async () => {
    alert("resend the code again");
    signInWithPhoneNumber(phoneNumber);
  };

  const onPress1 = async (called: string) => {
    if (Platform.OS == "android") {
      return new Promise((resolve, reject) => {
        Contacts.requestPermission()
          .then((granted) => {
            if (granted === "authorized") {
              // Access contacts
              GetContact.openContactPicker((h: any) => {
                phoneRef1?.current.setValue(h);
              });
            } else {
              reject(new Error("Permission denied"));
            }
          })
          .catch((permissionError) => {
            reject(permissionError);
          });
      });
    } else if (Platform.OS == "ios") {
      Keyboard.dismiss();
      //  handlePickContact();
    }
  };
  const handlePickContact = async () => {
    try {
      await setInputValue(1);
      await pickContact();
    } catch (error) {
      console.error("Error picking contact:", error);
    }
  };

  const onChangePhoneNumber = async () => {
    const isValid1 = phoneRef1.current?.isValidNumber(
      phoneRef1?.current?.getValue()
    );
    if (isValid1 == false) {
      setValidNumber(false);
    } else {
      setValidNumber(true);
    }
  };
  const [validNumber, setValidNumber] = useState<boolean>(true);

  return fullScreenLoading ? (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ActivityIndicator size={moderateScale(40)} color={Colors.black} />
    </SafeAreaView>
  ) : (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={styles.ScrollStyle}
        keyboardShouldPersistTaps="handled"
      >
        <CustomStatusBar color={Colors.secondaryClr} />

        {!confirm ? (
          // <Button
          //   title="Phone Number Sign In"
          //   onPress={() => signInWithPhoneNumber('+92 321 6437143')}
          // />

          <>
            <Text style={styles.heading}>Login</Text>
            {/* <View style={styles.dialerContainer}>
              <CountryPicker
                show={show}
                style={{
                  // Styles for whole modal [View]
                  modal: {
                    height: moderateScale(450),
                    // backgroundColor: 'red'
                  },
                  // Styles for input [TextInput]
                  textInput: {
                    height: moderateScale(55),
                    borderRadius: 0,
                    color: Colors.black,
                  },
                  dialCode: {
                    color: Colors.primaryClr,
                  },
                  // Country name styles [Text]
                  countryName: {
                    color: Colors.black,
                  },
                }}
                pickerButtonOnPress={item => {
                  setCountryCode(item.dial_code);
                  setShow(false);
                }}
                onBackdropPress={() => setShow(false)}
              />
              <TouchableOpacity
                style={styles.countryCodeButton}
                onPress={() => setShow(true)}>
                <Text style={styles.countryCodeText}>{countryCode}</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.phoneNumberInput}
                placeholder="Enter you phone number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View> */}

            <EditTextPhone
              onPressFlag={onPressFlag1}
              phoneRef={phoneRef1}
              onPress={onPress1}
              first={"ist"}
              onChangePhoneNumber={onChangePhoneNumber}
              validNumber={validNumber}
              from={"Login"}
              HideFlag={true}
            />

            <TouchableOpacity
              onPress={() => handleValidation()}
              style={styles.LoginBtn}
              disabled={loading ? true : false}
            >
              {loading ? (
                <ActivityIndicator
                  size={moderateScale(30)}
                  color={Colors.white}
                />
              ) : (
                <Text style={styles.LoginBtnTxt}>Login</Text>
              )}
            </TouchableOpacity>
          </>
        ) : (
          <>
            <OTPInput length={6} onSubmit={confirmCode} loading={loading} />
          </>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d1d1d1",
    paddingTop: 50,
    // paddingHorizontal: 20,
  },
  ScrollStyle: {
    flexGrow: 1,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: moderateScale(50),
  },
  heading: {
    fontSize: moderateScale(28),
    color: Colors.black,
    fontWeight: "600",
    alignSelf: "center",
    marginVertical: 30,
  },
  LoginBtn: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.primaryClr,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  LoginBtnTxt: {
    fontSize: moderateScale(20),
    fontWeight: "600",
    color: Colors.white,
  },

  dialerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  countryCodeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#156082",
    borderRadius: 5,
  },
  countryCodeText: {
    color: "#fff",
    fontSize: 18,
  },
  phoneNumberInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: moderateScale(18),
  },
  dialPadContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
