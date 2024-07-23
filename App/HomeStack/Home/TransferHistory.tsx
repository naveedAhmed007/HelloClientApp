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
import firestore from "@react-native-firebase/firestore";
import { moderateScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "../../Utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import CustomHeader from "../../CustomHeader/CustomeHeader";
import CustomStatusBar from "../../Utils/CustomStatusBar";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import moment from "moment";
import { setisTransferKeyBoardOpen } from "../../Redux/HomeReducer/homeSlice";

const TransferHistory = () => {
  let navigation = useNavigation();
  let dispatch = useDispatch();
  let focus = useIsFocused();
  const textInputRef = useRef(null);
  const handleDrawer = () => {
    navigation.openDrawer();
  };
  

  const [isRefreshing, setRefreshing] = useState(false);
  const [transferLoading, setTransferLoading] = useState(false);
  const [trasnferDataList, setTrasnferDataList] = useState();
  const userLoginNumber = useSelector((state) => state.auth.userLoginNumber);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (focus) {
      fetchUserByPhoneNumber(userLoginNumber);
    }
  }, [focus, userLoginNumber]);

  const fetchUserByPhoneNumber = async (userLoginNumber) => {
    setTransferLoading(true);
    try {
      // Query where userLoginNumber matches sender, ordered by timestamp descending
      const senderQuery = await firestore()
        .collection("TransferHistory")
        .where("sender", "==", userLoginNumber)
        .get();

      // Query where userLoginNumber matches receiver, ordered by timestamp descending
      const receiverQuery = await firestore()
        .collection("TransferHistory")
        .where("receiver", "==", userLoginNumber)
        .get();

      // Extract documents and merge results
      const senderDocs = senderQuery.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const receiverDocs = receiverQuery.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Combine, remove duplicates by id, and sort by timestamp in descending order
      const transferData = [
        ...new Map(
          [...senderDocs, ...receiverDocs].map((item) => [item.id, item])
        ).values(),
      ].sort((a, b) => b.timeStamp - a.timeStamp);

      // Update state with sorted and unique transferData
      if (transferData.length > 0) {
        setTrasnferDataList(transferData);
      } else {
        console.log("No matching documents or transferData is empty.");
      }
    } catch (error) {
      console.error("Error getting user: ", error.message);
      // Log Firestore errors for debugging
    } finally {
      setTransferLoading(false);
    }
  };
  const trasnferDataLists = trasnferDataList?.filter(
    (item) =>
      item.memo.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      item.sender.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      item.date.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      item.amount.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a network request or any async task
    setTimeout(() => {
      setRefreshing(false);
      fetchUserByPhoneNumber();
    }, 2000); // 2 seconds delay for demonstration purposes
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={{}}>
          <Text
            style={[
              styles.itemText,
              { color: item.sender == userLoginNumber ? "red" : "black" },
            ]}
          >
            {item.sender == userLoginNumber ? item.receiver : item.receiver}
          </Text>

          <Text
            style={[
              styles.itemText,
              { color: item.sender == userLoginNumber ? "red" : "black" },
            ]}
          >
            {item.memo}
          </Text>
        </View>
        <View style={{}}>
          <Text
            style={[
              styles.itemText,
              { color: item.sender == userLoginNumber ? "red" : "black" },
            ]}
          >
            {item.sender == userLoginNumber ? "-" + item.amount : item.amount}
          </Text>
          <Text
            style={[
              styles.itemText,
              { color: item.sender == userLoginNumber ? "red" : "black" },
            ]}
          >
            {handleTime(item.date)} {handleDateFormate(item.date)}
          </Text>
        </View>
      </View>
    );
  };
  const handleDateFormate = (dateFormate: any) => {
    console.log(dateFormate);
    const format = "DD/MM/YYYY";
    const newDate = moment(dateFormate, format).format("DD/MM");
    return newDate;
  };
  const handleTime = (time: any) => {
    const timeOnly = moment(time, "DD/MM/YYYY HH:mm").format("HH:mm");
    return timeOnly;
  };

  const renderEmpty = () => {
    return (
      <Text
        style={{
          fontSize: moderateScale(22),
          color: "black",
          alignSelf: "center",
          marginTop: moderateScale(50),
        }}
      >
        No found
      </Text>
    );
  };

  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     'keyboardDidShow',
  //     () => {
  //       dispatch(setisTransferKeyBoardOpen(true)); // Keyboard is visible
  //     }
  //   );
  //   const keyboardDidHideListener = Keyboard.addListener(
  //     'keyboardDidHide',
  //     () => {
  //       dispatch(setisTransferKeyBoardOpen(false)); // Keyboard is hidden
  //     }
  //   );

  //   // Cleanup the event listeners when the component unmounts
  //   return () => {
  //     keyboardDidHideListener.remove();
  //     keyboardDidShowListener.remove();
  //   };
  // }, [dispatch]);
  const handleSearch = (txt: any) => {
    setSearchQuery(txt);
  };
 
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        if (textInputRef.current?.isFocused()) {
          dispatch(setisTransferKeyBoardOpen(true)); // Keyboard is visible and input is focused
        }
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        dispatch(setisTransferKeyBoardOpen(false)); // Keyboard is hidden
      }
    );

    // Cleanup the event listeners when the component unmounts
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [dispatch]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomStatusBar color={Colors.secondaryClr} />
      {/* <CustomHeader title={"Transfer History"} onPressMenu={handleDrawer} /> */}
      <ScrollView style={styles.SearchContainerr}>
        {transferLoading ? (
          <View style={styles.center}>
            <ActivityIndicator size={35} color={Colors.black} />
          </View>
        ) : (
          <View>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                ref={textInputRef}
                placeholder="Search"
                placeholderTextColor={"grey"}
                value={searchQuery}
                onChangeText={(text) => handleSearch(text)}
                onFocus={() => dispatch(setisTransferKeyBoardOpen(true))} // Handle focus if needed
                onBlur={() => dispatch(setisTransferKeyBoardOpen(false))}
              />
              <TouchableOpacity style={styles.iconButton}>
                <Icon name="search" size={20} color="grey" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={trasnferDataLists}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              ListEmptyComponent={renderEmpty}
              style={{ paddingBottom: moderateScale(50) }}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransferHistory;

const styles = StyleSheet.create({
  SearchContainerr: {
    flex: 1,
    backgroundColor: "#d1d1d1",
    // paddingTop: 50,
    paddingHorizontal: moderateScale(5),
    paddingBottom: moderateScale(60),
    zIndex: 1000,
    paddingTop: moderateScale(20),
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
});
