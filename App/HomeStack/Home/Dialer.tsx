import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Platform,
  NativeModules,
  Keyboard,
  Button,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import CustomStatusBar from "../../Utils/CustomStatusBar";
import { Colors } from "../../Utils/Colors";
import { CountryPicker } from "react-native-country-codes-picker";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { moderateScale } from "react-native-size-matters";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomHeader from "../../CustomHeader/CustomeHeader";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditTextPhone from "../../Utils/EditTextPhone";
import firestore from "@react-native-firebase/firestore";
import Loader from "../../Utils/Loader";
import NetInfo from "@react-native-community/netinfo";
import { showToast } from "../../Utils/Toast";
import {
  getCountryBlockState,
  getRemainingCredits,
} from "../../FirebaseMethods/FirebaseMethods";
import Contacts from "react-native-contacts";

function Dialer() {
  let navigation = useNavigation();
  let focus = useIsFocused();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("+291"); // default to US country code
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const { GetContact } = NativeModules;
  const userLoginNumber = useSelector((state) => state.auth.userLoginNumber);

  useEffect(() => {
    if (focus) {
      // alert(userLoginNumber)
      deleteUsersWithEmptyOrNaNPhoneNumber()
      storeUserNumber(userLoginNumber);
    }
  }, [userLoginNumber, focus]);

  const deleteUsersWithEmptyOrNaNPhoneNumber = async () => {
    try {
      // Query where phoneNumber is empty
      const emptyPhoneNumberQuerySnapshot = await firestore()
        .collection('users')
        .where('phoneNumber', '==', '')
        .get();
  
      // Query where phoneNumber is NaN
      const nanPhoneNumberQuerySnapshot = await firestore()
        .collection('users')
        .where('phoneNumber', '==', NaN)
        .get();
  
      // Combine the results from both queries
      const documentsToDelete = [
        ...emptyPhoneNumberQuerySnapshot.docs,
        ...nanPhoneNumberQuerySnapshot.docs,
      ];
  
      const deletePromises = documentsToDelete.map((doc) => doc.ref.delete());
  
      // Execute all delete operations
      await Promise.all(deletePromises);
  
      console.log('All users with empty or NaN phoneNumber have been deleted');
    } catch (error) {
      console.error('Error deleting users: ', error);
    }
  };





  const storeUserNumber = async (value) => {
    try {
      await AsyncStorage.setItem("UserNumber", value);
    } catch (e) {
      // saving error
    }
  };

  const [isConnected, setIsConnected] = useState<any>(false);
  const [isInternetWorking, setIsInternetWorking] = useState(false);

  useEffect(() => {
    const checkConnectivity = async () => {
      const netInfoState = await NetInfo.fetch();
      setIsConnected(netInfoState.isConnected);

      if (netInfoState.isConnected) {
        // If connected, check if the internet is working by making a request
        try {
          const response = await fetch("https://www.google.com", {
            method: "HEAD",
          });
          setIsInternetWorking(response.ok);
        } catch (error) {
          setIsInternetWorking(false);
        }
      }
    };

    // Check connectivity when the component mounts
    checkConnectivity();

    // Subscribe to network changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected !== isConnected) {
        checkConnectivity();
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [isConnected]);

  const updateAdminId = async (documentId: string, clientId: string) => {
    try {
      const docRef = firestore().collection("UserDevices").doc(documentId);

      const documentSnapshot = await docRef.get();

      if (documentSnapshot.exists) {
        // The document exists, update its fields
        await docRef.update({ clientId: clientId });
        await docRef.update({ isAdminBusy: true });

        // Data updated successfully
      } else {
        // Document doesn't exist
      }
    } catch (error) {
      // Handle errors
    }
  };

  const getCountryName = (input: string): string => {
    const match = input.match(/^[^()]+/);
    return match ? match[0].trim() : input;
  };
  const handleDial = async () => {
    console.log("Login Number" + userLoginNumber);
    console.log("Dial Number" + phoneNumber);

    setShowLoader(true);

    Keyboard.dismiss();
    // Alert.alert(phoneRef2?.current?.getValue())
    let c = phoneRef1?.current?.getAllCountries();

    if (isConnected && isInternetWorking) {
      const isValid1 = phoneRef1.current?.isValidNumber(
        phoneRef1?.current?.getValue()
      );

      if (isValid1 == false) {
        showToast({ message: "first number is invalid" });
        setShowLoader(false);
      } else {
        const foundCountry = c.find(
          (country: any) =>
            country.dialCode == phoneRef1?.current?.getCountryCode()
        );
        let block = await getCountryBlockState({
          countryName: getCountryName(foundCountry.name),
        });

        if (block == true) {
          showToast({ message: "You cannot make a call to the number." });

          setShowLoader(false);
        } else {
          let remainingCredit = await getRemainingCredits({
            phoneNumber: userLoginNumber,
          });
          if (remainingCredit <= 30000) {
            showToast({ message: "Insufficient credit for the call..." });
            setShowLoader(false);
          } else {
            // setShowLoader(false);

            // checkPendingCall(userLoginNumber);
             fetchData();
          }
        }
      }
    } else {
      showToast({ message: "Internet disconnected" });
      setShowLoader(false);
    }
  };
  const checkPendingCall = async (numberToCheck: any) => {
    try {
      // Query Firestore to check if any document in PendingCalls has number1 matching numberToCheck
      const querySnapshot = await firestore()
        .collection("PendingCalls")
        .where("number2", "==", numberToCheck)
        .get();

      if (!querySnapshot.empty) {
        // If there's a matching document, show an alert
        setShowLoader(false);
        showToast({ message: "Your phone number is already waiting." });
      } else {
        // If no matching document is found, show an alert saying now you can call
        fetchData();
      }
    } catch (error) {
      console.error("Error checking pending calls: ", error);
      setShowLoader(false);
      showToast({ message: "Something went wrong. Please try again later." });
    }
  };

  const handleDrawer = () => {
    navigation.openDrawer();
  };

  const fetchData = async () => {
    try {
      const querySnapshot = await firestore()
        .collection("UserDevices")
        .where("isAdminBusy", "==", false)
        .limit(1)
        .get();
      const querySnapshot1 = await firestore()
        .collection("PendingCalls")
        .limit(1)
        .get();

     

      const date = new Date();
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      const fname = await getCallerName(phoneRef1?.current?.getValue());
      const sname = await getCallerName(userLoginNumber);

      const dataToAdd = {
        number1: phoneRef1?.current?.getValue(),
        number2: userLoginNumber,
        isCallBusy: false,
        email: "admin@test.com",
        isActive: "0",
        callStatus: 0,
        firstCallerName: fname ? fname : "",
        secondCallerName: sname ? sname : "",
        callAddDate: formattedDate,
        callAddTime: formattedTime,
        conferenceTime: "0:00",
        countryCode: "+92",
        callAddTimestamp: firestore.FieldValue.serverTimestamp(),
      };
      if (!querySnapshot.empty && querySnapshot1.empty) {
        const document = querySnapshot.docs[0];
        const documentId = document.id;

        // Log the document ID
        console.log("documentid+++++++++", documentId);

        try {
          const collectionRef = firestore().collection("numbers");

          // Add data to the collection
          const documentRef = await collectionRef.add(dataToAdd);
          const documentId1 = documentRef.id;
          updateAdminId(documentId, documentId1);
          setShowLoader(false);
        } catch (error) {
          console.error("Error adding data: ", error);
          setShowLoader(false);
        }

        showToast({ message: "Call initializing..." });
        setShowLoader(false);
      } else {


        const querySnapshot = await firestore()
        .collection("PendingCalls")
        .where("number2", "==", userLoginNumber)
        .get();

      if (!querySnapshot.empty) {
        // If there's a matching document, show an alert
        setShowLoader(false);
        showToast({ message: "Your phone number is already waiting." });
      }
      else
      {
        try {
          const collectionRef = firestore().collection("PendingCalls");

          
          // Add data to the collection
          await collectionRef.add(dataToAdd);
          showToast({
            message:
              "High call volume. Please hold, your call will connect shortly",
          });

          setShowLoader(false);
        } catch (error) {
          console.error("Error adding data: ", error);
          setShowLoader(false);
        }
      
      

        // showToast({message:'Dialer is busy try again later...'})

        setShowLoader(false);
      }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setShowLoader(false);
    }
  };

  const phoneRef1: any = useRef(null);
  const [validNumber, setValidNumber] = useState<boolean>(true);
  const [showPicker1, setShowPicker1] = useState<boolean>(false);

  const onPressFlag1 = () => {
    setShowPicker1(true);
  };

  const onPress1 = async (called: string) => {
    if (Platform.OS === "android") {
      Contacts.requestPermission().then((granted) => {
        if (granted === "authorized") {
          GetContact.openContactPicker((h: any) => {
            console.log("Original phone number:", h);

            // Check if the number starts with +00
            let adjustedPhoneNumber = h;
            if (h.startsWith("+00")) {
              adjustedPhoneNumber = "+" + h.slice(3);
            } else if (h.startsWith("00")) {
              adjustedPhoneNumber = "+" + h.slice(2);
            }
            console.log("Adjusted phone number:", adjustedPhoneNumber);
            phoneRef1?.current.setValue(adjustedPhoneNumber);
            setPhoneNumber(adjustedPhoneNumber);
            const isValid1 =
              phoneRef1.current?.isValidNumber(adjustedPhoneNumber);
            setPhoneNumber(adjustedPhoneNumber);
            setValidNumber(isValid1);
            console.log("Final phone number:", adjustedPhoneNumber);
            console.log("Is valid number:", isValid1);
          });
        } else {
          reject(new Error("Permission denied"));
        }
      });
    } else if (Platform.OS === "ios") {
      // Handle iOS contact picker here if needed
    }
  };

  const onChangePhoneNumber = async () => {
    const isValid1 = phoneRef1.current?.isValidNumber(
      phoneRef1?.current?.getValue()
    );
    // console.log(phoneRef1?.current?.getValue())
    setPhoneNumber(phoneRef1?.current?.getValue());
    if (isValid1 == false) {
      setValidNumber(false);
    } else {
      setValidNumber(true);
    }
    // console.log(phoneRef1?.current?.getValue());
  };

  const handlePhoneNumberPress = (data: any) => {
    const currentPhoneNumber = phoneRef1.current?.getValue() || "";
    const newPhoneNumber = currentPhoneNumber + data;
    phoneRef1.current?.setValue(newPhoneNumber);
    setPhoneNumber(newPhoneNumber);
    setTimeout(() => {
      const isValid1 = phoneRef1.current?.isValidNumber(newPhoneNumber);
      setValidNumber(isValid1);
      console.log("Valid number:", isValid1);
    }, 0);
  };

  const handleRemoveLastDigit = () => {
    let dataValue = phoneRef1?.current?.getValue();
    const newPhoneNumber = dataValue.slice(0, -1);
    setPhoneNumber(newPhoneNumber);
    phoneRef1.current?.setValue("+" + newPhoneNumber);
    const isValid1 = phoneRef1.current?.isValidNumber("+" + newPhoneNumber);
    setValidNumber(isValid1);
    console.log("+" + newPhoneNumber);
  };

  const getCallerName = (number: string) => {
    setShowLoader(false);
    return new Promise((resolve, reject) => {
      Contacts.requestPermission()
        .then((granted) => {
          if (granted === "authorized") {
            // Access contacts
            Contacts.getContactsByPhoneNumber(number)
              .then((contacts) => {
                const firstName =
                  Platform.OS === "ios"
                    ? contacts[0]?.givenName
                    : contacts[0]?.displayName;
                resolve(firstName);
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            reject(new Error("Permission denied"));
          }
        })
        .catch((permissionError) => {
          reject(permissionError);
        });
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={{ flexGrow: 1, flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <CustomStatusBar color={Colors.secondaryClr} />
        <CustomHeader title={"Dialer"} onPressMenu={handleDrawer} />
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => onPress1()}
            style={styles.wrapperContact}
          >
            <MaterialIcons
              name={"contact-page"}
              color={Colors.primaryClr}
              size={moderateScale(34)}
            />
            <Text style={styles.HeadingContact}>Contacts</Text>
          </TouchableOpacity>
          <View style={styles.contactSection}>
            <EditTextPhone
              onPressFlag={onPressFlag1}
              phoneRef={phoneRef1}
              onPress={onPress1}
              first={"ist"}
              onChangePhoneNumber={onChangePhoneNumber}
              validNumber={validNumber}
              from={"Dialer"}
              HideFlag={true}
            />
          </View>
          {showLoader == true && <Loader />}
          <View style={styles.dialPadContainer}>
            <View style={styles.dialPad}>
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "0", "<"].map(
                (item, index) => (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.dialButton,
                      index === 9 && styles.zeroButton, // Apply styles for zero
                    ]}
                    onPress={() => {
                      if (item === "<") {
                        handleRemoveLastDigit();
                      } else {
                        handlePhoneNumberPress(item);
                      }
                    }}
                  >
                    <Text style={styles.dialButtonText}>{item}</Text>
                  </TouchableOpacity>
                )
              )}
              {/* <TouchableOpacity
                style={[styles.dialButton, styles.removeButton]}
                onPress={handleRemoveLastDigit}
              >
                <Text style={styles.dialButtonText}>{"<"}</Text>
              </TouchableOpacity> */}
            </View>
            <TouchableOpacity onPress={handleDial} style={styles.callBtn}>
              <Feather name="phone-call" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default Dialer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d1d1d1",
    paddingTop: 50,
  },
  contactSection: {
    marginHorizontal: moderateScale(30),
    marginVertical: moderateScale(30),
  },
  callBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    padding: moderateScale(20),
    backgroundColor: "#00b300",
    borderRadius: 50,
  },
  dialPadContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  dialPad: {
    width: "60%",
    aspectRatio: 0.75,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    
  },
  dialButton: {
    width: moderateScale(58),
    height: moderateScale(58),
    margin: moderateScale(5),
    backgroundColor: "#156082",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    
  },
  zeroButton: {
    width: moderateScale(50),
    height: moderateScale(50),
    alignSelf: "center",
  },
  dialButtonText: {
    color: "#fff",
    fontSize: moderateScale(28),
    fontWeight:'700'
  },
  removeButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    backgroundColor: "#ff6347", // Change the color for the remove button if needed
  },
  HeadingContact: {
    fontSize: moderateScale(22),
    fontWeight: "700",
    color: Colors.primaryClr,
  },
  wrapperContact: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(30),
  },
});
