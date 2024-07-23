import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Platform,
  NativeModules,
  ActivityIndicator,
  Keyboard,
  RefreshControl,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CustomStatusBar from "../../Utils/CustomStatusBar";
import { Colors } from "../../Utils/Colors";
import { CountryPicker } from "react-native-country-codes-picker";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import { moderateScale } from "react-native-size-matters";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomHeader from "../../CustomHeader/CustomeHeader";
import EditTextPhone from "../../Utils/EditTextPhone";
import firestore from "@react-native-firebase/firestore";
import { showToast } from "../../Utils/Toast";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Contacts from "react-native-contacts";
import TransferHistory from "./TransferHistory";
import { setisTransferKeyBoardOpen } from "../../Redux/HomeReducer/homeSlice";

function Transfer() {
  let navigation = useNavigation();
  let dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("+291"); // default to US country code
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transferLoading, setTransferLoading] = useState(false);
  const [userLoginObject, setUserLoginObject] = useState();
  const [trasnferDataList, setTrasnferDataList] = useState();
  const [isRefreshing, setRefreshing] = useState(false);
  const userLoginNumber = useSelector((state) => state.auth.userLoginNumber);
  const isTransferKeyBoardOpen = useSelector(
    (state) => state.home.isTransferKeyBoardOpen
  );

  const handleDrawer = () => {
    navigation.openDrawer();
  };

  const { GetContact, AccessToken } = NativeModules;

  //add these functions
  const getAccessToken = async () => {
    try {
      //add loader here

      const token = await AccessToken.getAccessToken();
      return token;
    } catch (error) {
      console.error("Error getting access token: ", error);
      return null;
    }
  };
  const sendFCMMessage = async (
    token: string,
    title: string,
    body: string,
    accessToken: string
  ) => {
    const message = {
      message: {
        token: token, // Device token
        notification: {
          title: title,
          body: body,
        },
        data: {
          // Additional data
        },
      },
    };

    try {
      const response = await fetch(
        "https://fcm.googleapis.com/v1/projects/hello-90a68/messages:send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(message),
        }
      );

      const responseData = await response.json();
      if (response.ok) {
        console.log("Message sent successfully:", responseData);
      } else {
        console.error("Failed to send message:", responseData);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const phoneRef1: any = useRef(null);
  const [validNumber, setValidNumber] = useState<boolean>(true);
  const [showPicker1, setShowPicker1] = useState<boolean>(false);

  const onPressFlag1 = () => {
    setShowPicker1(true);
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

  // useEffect(()=>{
  //   // phoneRef1?.current?.setValue('12')
  // },[])
  const onChangePhoneNumber = async () => {
    const isValid1 = phoneRef1.current?.isValidNumber(
      phoneRef1?.current?.getValue()
    );
    setPhoneNumber(phoneRef1?.current?.getValue());
    if (isValid1 == false) {
      setValidNumber(false);
    } else {
      setValidNumber(true);
    }
    // console.log(phoneRef1?.current?.getValue());
  };

  const handleTransfer = async () => {
    const isValid1 = phoneRef1.current?.isValidNumber(
      phoneRef1?.current?.getValue()
    );
    setPhoneNumber(phoneRef1?.current?.getValue());
    setCountryCode("+" + phoneRef1?.current?.getCountryCode());
    if (isValid1 == false) {
      showToast({ message: "Please enter valid number" });
    } else {
      if (amount == "") {
        showToast({ message: "Please amount" });
      } else {
        handleAmount();
      }
    }
  };

  const handleRemainingCredit = (number: any) => {
    let data = parseFloat(number) / 60000;
    return data;
  };
  const handleAmount = async () => {
    setLoading(true);
    try {
      const userQuery = await firestore()
        .collection("users")
        .where("phoneNumber", "==", userLoginNumber)
        .get();

      if (!userQuery.empty) {
        const userData = userQuery.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserLoginObject(userData);
        // Check if the user has remainingCredit and display it
        const remainingCredit = userData[0].remainingCredit;
        if (remainingCredit) {
          const actuallCredit = handleRemainingCredit(remainingCredit);
          if (parseFloat(actuallCredit) < parseFloat(amount)) {
            showToast({ message: `insuficant balance` });
            setLoading(false);
          } else {
            if (parseFloat(amount) < 15) {
              setLoading(false);
              showToast({ message: `Minimum credit transfer -15 min` });
            } else {
              handleProceedTransfer();
              AmountDetactFromLoginUser(userData);
            }
            // showToast({ message: `proceed to transfer balance`});
          }
          // showToast({ message: `Remaining Credit: ${handleRemainingCredit(remainingCredit)}` });
          // setLoading(false)
        } else {
          showToast({ message: `insuficant balance` });
          setLoading(false);
        }
      } else {
        showToast({ message: "new message" });
        setLoading(false);
      }
    } catch (error) {
      showToast({ message: error });
      setLoading(false);
    }
  };

  const handleProceedTransfer = async () => {
    setLoading(true);
    try {
      const userQuery = await firestore()
        .collection("users")
        .where("phoneNumber", "==", phoneRef1?.current?.getValue())
        .get();

      if (!userQuery.empty) {
        const userData = userQuery.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log("userData>>>>>>>>>>>>>>>>>>>>>>>>>", userData);

        // Call ProceedFinalTransfer if user exists
        ProceedFinalTransfer(userData);
      } else {
        showToast({ message: "No account found - Check phone number" });
        setPaymentSuccess(false);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error getting user: ", error);
      setLoading(false);
    }
  };

  const ProceedFinalTransfer = async (userInfo) => {
    try {
      await firestore()
        .collection("users")
        .doc(userInfo[0].id)
        .update({
          remainingCredit:
            userInfo[0].remainingCredit + parseFloat(amount) * 60000,
          date: moment().format("DD/MM/YYYY HH:mm:ss"),
        });
      const token = await getAccessToken();

      sendFCMMessage(userInfo[0]?.fcmToken, 'Account update.', "You have received  "+amount+" credit from "+userLoginNumber+'',token);
      setLoading(false);
      setPaymentSuccess(true);

      showToast({ message: "Transfer updated successfully" });
      // AmountDetactFromLoginUser();
    } catch (error) {
      setPaymentSuccess(false);
      console.error("Error updating transfer: ", error);
    }
  };

  const AmountDetactFromLoginUser = async (senderData) => {
    if (paymentSuccess == true) {
      try {
        await firestore()
          .collection("users")
          .doc(senderData[0]?.id)
          .update({
            remainingCredit:
              senderData[0]?.remainingCredit - parseFloat(amount) * 60000,
          });
        setAmount("");
        setMemo("");
        phoneRef1?.current?.setValue(null);
        AddTransferHistory();
        // showToast({ message: "Amount is detacted from the user" });
      } catch (error) {
        console.error("Error updating transfer: ", error);
      }
    }
  };

  const AddTransferHistory = async () => {
    try {
      const dataToAdd = {
        sender: userLoginNumber,
        receiver: phoneRef1?.current?.getValue(),
        memo: memo,
        amount: amount,
        date: moment().format("DD/MM/YYYY HH:mm"),
        timeStamp: firestore.Timestamp.now(),
      };
      const collectionRef = firestore().collection("TransferHistory");
      // Add data to the collection
      await collectionRef.add(dataToAdd);
    } catch (error) {
      console.error("Error adding data: ", error);
      // setShowLoader(false);
    }
  };

  useEffect(() => {
    if (paymentSuccess) {
      AmountDetactFromLoginUser(userLoginObject);
    }
  }, [paymentSuccess]);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;

  const handleChange = (text: any) => {
    // Remove any non-numeric characters from the input
    const numericText = text.replace(/[^0-9]/g, "");
    setAmount(numericText);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          flex: 1,
          // height: moderateScale(150),
          // zIndex: 1000,
        }}
      >
        <CustomStatusBar color={Colors.secondaryClr} />
        <CustomHeader title={"Transfer"} onPressMenu={handleDrawer} />
        <ScrollView style={[styles.container, { flex: 1 }]}>
          <View style={styles.contactSection}>
            <Text style={styles.Heading}>Mobile</Text>
            <View
              style={[
                styles.dialerContainer,
                {
                  marginTop: moderateScale(20),
                  backgroundColor: "transparent",
                },
              ]}
            >
              <EditTextPhone
                onPressFlag={onPressFlag1}
                phoneRef={phoneRef1}
                onPress={onPress1}
                first={"ist"}
                onChangePhoneNumber={onChangePhoneNumber}
                validNumber={validNumber}
                from={"Transfer"}
                HideFlag={true}
              />
            </View>
          </View>
          <View style={styles.contactSection}>
            <Text style={styles.Heading}>Amount</Text>
            <View style={styles.dialerContainer}>
              <TextInput
                style={styles.phoneNumberInput}
                placeholder=""
                keyboardType="number-pad"
                value={amount}
                onChangeText={(e) => handleChange(e)}
              />
            </View>
          </View>
          <View style={styles.contactSection}>
            <Text style={styles.Heading}>Note</Text>
            <View style={styles.dialerContainer}>
              <TextInput
                style={styles.phoneNumberInput}
                placeholder=""
                // keyboardType="phone-pad"
                value={memo}
                onChangeText={setMemo}
              />
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => handleTransfer()}
              disabled={loading ? true : false}
              style={styles.contactButton}
            >
              {loading ? (
                <ActivityIndicator
                  size={moderateScale(30)}
                  color={Colors.white}
                />
              ) : (
                <>
                  <MaterialCommunityIcons
                    name="transfer"
                    size={30}
                    color="#fff"
                  />
                  <Text style={styles.contactButtonText}>Transfer</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* Search Section */}
        {/* <Text>Keyboard is {isTransferKeyBoardOpen ? 'Visible' : 'Hidden'}</Text> */}
        <View
          style={{
            flex: isTransferKeyBoardOpen ? 200 : 1,
            marginTop: isTransferKeyBoardOpen
              ? moderateScale(-35)
              : moderateScale(0),
          }}
        >
          <TransferHistory />
        </View>

        {/* <ScrollView style={styles.SearchContainerr}>
          {transferLoading ? (
            <View style={styles.center}>
              <ActivityIndicator size={35} color={Colors.black} />
            </View>
          ) : (
            <View>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search..."
                  value={searchQuery}
                  onChangeText={(text) => setSearchQuery(text)}
                />
                <TouchableOpacity style={styles.iconButton}>
                  <Icon name="search" size={20} color="grey" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={trasnferDataLists}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
              />
            </View>
          )}
        </ScrollView> */}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default Transfer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d1d1d1",
    paddingTop: 50,
    // paddingHorizontal: 20,
  },
  SearchContainerr: {
    flex: 1,
    backgroundColor: "#d1d1d1",
    // paddingTop: 50,
    paddingHorizontal: moderateScale(12),
    paddingBottom: moderateScale(10),
    zIndex: 1000,
  },
  Heading: {
    fontSize: moderateScale(18),
    fontWeight: "600",
    color: Colors.black,
    // marginTop:moderateScale(10)
  },
  contactSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderWidth:1,
    marginBottom: 10,
    paddingHorizontal: moderateScale(12),
  },
  dialerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    height: moderateScale(52),
    width: moderateScale(260),
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: moderateScale(190),
    alignSelf: "center",
    padding: moderateScale(10),
    backgroundColor: Colors.primaryClr,
    borderRadius: 15,
    marginVertical: moderateScale(30),
  },
  contactButtonText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: moderateScale(22),
    fontWeight: "500",
  },
  countryCodeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#156082",
    borderRadius: 5,
    marginLeft: 5,
  },
  countryCodeText: {
    color: "#fff",
    fontSize: moderateScale(18),
  },
  phoneNumberInput: {
    // flex: 1,
    marginLeft: 10,
    fontSize: moderateScale(25),
    width: moderateScale(200),
    color: Colors.black,
    height: moderateScale(100),
  },
  dialPadContainer: {
    // flex: 1,
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
    width: moderateScale(55),
    height: moderateScale(55),
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
    fontSize: 24,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: Colors.white,
    height: moderateScale(50),
    color: Colors.black,
    paddingLeft: moderateScale(40),
    fontSize: moderateScale(16),
  },
  iconButton: {
    marginLeft: 8,
    padding: 8,
    position: "absolute",
  },
  itemContainer: {
    padding: moderateScale(5),
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  itemText: {
    fontSize: moderateScale(14),
    textAlign: "center",
    color: Colors.black,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
