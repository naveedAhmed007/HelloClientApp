import { useNavigation } from "@react-navigation/native";
import firestore, { Timestamp } from "@react-native-firebase/firestore";
import { showToast } from "../Utils/Toast";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const usersCollection = firestore().collection("users");

export const getRemainingCredits = async ({ phoneNumber }: any) => {
  // Move this line inside the function

  try {
    const querySnapshot = await usersCollection
      .where("phoneNumber", "==", phoneNumber)
      .get();

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data().remainingCredit;
      return userData;
    } else {
      console.error("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error checking user credentials:", error);
    return null;
  }
};

export const getUserData = async ({ email }: any) => {
  // Move this line inside the function

  try {
    const querySnapshot = await usersCollection
      .where("email", "==", email)
      .get();

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      return userData;
    } else {
      console.error("User not found");

      return null;
    }
  } catch (error) {
    console.error("Error checking user credentials:", error);
    return null;
  }
};
function dispatch(arg0: { payload: string; type: "counter/setDocumentId" }) {
  throw new Error("Function not implemented.");
}

export const getCountryBlockState = async ({ countryName }: any) => {
  const collection = firestore().collection("setPrices");

  try {
    const querySnapshot = await collection
      .where("countryName", "==", countryName)
      .get();

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data().block;
      return userData;
    } else {
      console.error("Country not found");
      return null;
    }
  } catch (error) {
    console.error("Error checking user credentials:", error);
    return null;
  }
};

export const createNotifications = async (notificationData: any) => {
  // console.log("notificationData>>>>>>>>>>>>>>>>>>", notificationData);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("UserNumber");
      if (value !== null) {
        console.log("Store User Number>>", value);
        return value;
      } else {
        return null;
      }
    } catch (e) {
      console.log("e>>>>>>>>>>>>>>>>>>>>>>>>>>>", e);
      return null;
    }
  };

  try {
    const userNumber = await getData();

    const dataToAdd = {
      body: notificationData?.notification?.body,
      title: notificationData?.notification?.title,
      userNumber: userNumber, // Add the user number if needed
      timeStamp: firestore.Timestamp.now(),
    };

    const collectionRef = firestore().collection("Notifications");

    // Add data to the collection
    await collectionRef.add(dataToAdd);
  } catch (error) {
    showToast({ message: "Error adding data: " });
    console.error("Error adding data in notification: ", error);
  }
};

export const getNotifications = async () => {
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("UserNumber");
      if (value !== null) {
        console.log("Stored User Number>>", value);
        return value;
      } else {
        return null;
      }
    } catch (e) {
      console.log("Error retrieving User Number from AsyncStorage>>", e);
      return null;
    }
  };

  try {
    const userNumber = await getData();
    if (!userNumber) {
      console.log("User number not found in AsyncStorage");
      return [];
    }

    // Query where userNumber matches and order by timeStamp
    const notificationsQuery = await firestore()
      .collection("Notifications")
      .where("userNumber", "==", userNumber)
      .orderBy("timeStamp", "desc")
      .get();

    // Extract data from query results
    const data = notificationsQuery.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (data.length > 0) {
      return data;
    } else {
      console.log("No matching documents.");
      return [];
    }
  } catch (error) {
    console.error("Error getting notifications: ", error);
    return [];
  }
};
