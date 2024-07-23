import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Colors } from "../../Utils/Colors";
import CustomHeader from "../../CustomHeader/CustomeHeader";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import { useSelector } from "react-redux";
import moment from "moment";
import { showToast } from "../../Utils/Toast";
import CustomStatusBar from "../../Utils/CustomStatusBar";

const Profile = () => {
  let navigation = useNavigation();
  let focus = useIsFocused();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const userLoginNumber = useSelector((state) => state.auth.userLoginNumber);

  useEffect(() => {
    if (focus) {
      fetchUserByPhoneNumber(userLoginNumber);
    }
  }, [userLoginNumber, focus, firestore]);
  const fetchUserByPhoneNumber = async (phoneNumber) => {
    try {
      const userQuery = await firestore()
        .collection("users")
        .where("phoneNumber", "==", phoneNumber)
        .get();

      if (!userQuery.empty) {
        const userData = userQuery.docs.map((doc) => doc.data());
        // console.log("userData>>>>>>>>>>>>>>>>>>>>>>>>>", userData);

        setUsers(userData);
      } else {
        console.log("No matching documents.");
        setUsers([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error getting user: ", error);
      setLoading(false);
    }
  };

  const handleDrawer = () => {
    navigation.openDrawer();
  };
  const handleRemainingCredit = (number: any) => {
    console.log(number);
    if (number) {
      let data = parseFloat(number) / 60000;
      return data;
    } else {
      return 0;
    }
  };

  const compareDate = (data) => {
    const userDate = moment(data, "DD/MM/YYYY");
    const currentDate = moment();

    // Format dates for display purposes
    const userFormatedDate = userDate.format("DD - MM");
    const oneDayLater = userDate.add(1, "month");
    const oneDayLaterFormatted = oneDayLater.format("DD - MM");
    const currentFormattedDate = currentDate.format("DD - MM");

    // Check if current date is the same as or after one day later
    if (currentDate.isSameOrAfter(oneDayLater, "day")) {
      handleProceedRemoveCredit();
      console.log("handleProceedRemoveCredit");
      console.log("userDate", userFormatedDate);
      console.log("oneDayLater", oneDayLaterFormatted);
      console.log("currentDate", currentFormattedDate);
    } else {
      console.log("userDate", userFormatedDate);
      console.log("oneDayLater", oneDayLaterFormatted);
      console.log("currentDate", currentFormattedDate);
    }

    return oneDayLaterFormatted;
  };

  const handleProceedRemoveCredit = async () => {
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
        RemoveRemainingCredit(userData);
      } else {
        showToast({ message: "No number found" });
      }
    } catch (error) {
      console.error("Error getting user: ", error);
    }
  };

  const RemoveRemainingCredit = async (userInfo) => {
    try {
      await firestore().collection("users").doc(userInfo[0].id).update({
        remainingCredit: 0,
      });
      fetchUserByPhoneNumber(userLoginNumber);
      // showToast({ message: "Transfer updated successfully" });
      // AmountDetactFromLoginUser();
    } catch (error) {
      console.error("Error updating transfer: ", error);
    }
  };

  return loading ? (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ActivityIndicator size={moderateScale(50)} color={Colors.black} />
    </SafeAreaView>
  ) : (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader title={"Profile"} onPressMenu={handleDrawer} />
      <CustomStatusBar color={"white"} />

      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <View
            style={{
              borderWidth: 2,
              borderRadius: 70,
              padding: 20,
              borderColor: Colors.secondaryClr,
            }}
          >
            <AntDesign
              name="user"
              size={moderateScale(100)}
              color={Colors.white}
            />
          </View>
        </View>
        <View style={styles.center}>
          <View style={styles.centerInner}>
            <Text
              style={[
                styles.heading,
                {
                  marginRight: moderateScale(10),
                  color: handleRemainingCredit(users[0]?.remainingCredit == 0)
                    ? "red"
                    : Colors.primaryClr,
                },
              ]}
            >
              Credit
            </Text>
            <Text style={[styles.heading, { color: Colors.black }]}>
              {handleRemainingCredit(users[0]?.remainingCredit)} min
            </Text>
          </View>

          <View style={[styles.centerInner, { marginTop: moderateScale(17) }]}>
            <Text
              style={[
                styles.description,
                {
                  marginRight: moderateScale(15),
                  color:
                    users[0]?.remainingCredit == 0 ? "red" : Colors.primaryClr,
                  textAlign: "left",
                },
              ]}
            >
              Recharge{"\n"}before
            </Text>
            <Text
              style={[
                styles.description,
                {
                  color: Colors.black,
                  textAlign: "left",
                  width: moderateScale(155),
                },
              ]}
            >
              {users[0]?.remainingCredit == 0
                ? "0"
                : compareDate(users[0]?.date)}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // justifyContent: "center",
    // alignItems: "center",
    // padding: 20,
  },
  center: {
    flex: 1,
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(40),
    backgroundColor: "white",
    borderRadius: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: moderateScale(-20),
    paddingTop: moderateScale(45),
  },
  centerInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: moderateScale(35),
    fontWeight: "bold",
    // marginBottom: 20,
    color: "#156082",
  },
  iconContainer: {
    marginBottom: moderateScale(0),
    padding: moderateScale(50),
    backgroundColor: Colors.primaryClr,
    justifyContent: "center",
    alignItems: "center",
    // borderBottomLeftRadius: 25,
    // borderBottomRightRadius: 25,
    // height:moderateScale(300)
  },
  description: {
    fontSize: moderateScale(22),
    textAlign: "left",
    color: Colors.black,
    fontWeight: "500",
  },
  remainingMinutes: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#156082",
  },
});
