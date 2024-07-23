import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
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
import firestore from "@react-native-firebase/firestore";
import { useSelector } from "react-redux";

function CallLogs() {
  let navigation = useNavigation();
  let focus = useIsFocused();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [show, setShow] = useState(false);
  const [callLogLoading, setCallLogLoading] = useState(false);
  const [callLogsDataList, setCallLogsDataList] = useState();
  const [countryCode, setCountryCode] = useState("+291"); // default to US country code
  const [isPickerVisible, setPickerVisible] = useState(false);
  const userLoginNumber = useSelector((state) => state.auth.userLoginNumber);
  console.log(userLoginNumber);
  const handleDrawer = () => {
    navigation.openDrawer();
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([
    {
      id: "1",
      Status: "50",
      duration: "5:20",
      date: "8/24",
      number: "+1025478961",
      receviced: true,
    },
    {
      id: "2",
      Status: "No Network",
      duration: "5:50",
      date: "8/24",
      number: "+123456789",
      receviced: false,
    },
    {
      id: "3",
      Status: "50",
      duration: "5:40",
      date: "8/24",
      number: "+123456789",
      receviced: true,
    },
    {
      id: "4",
      Status: "1",
      duration: "5:40",
      date: "8/24",
      number: "+123456789",
      receviced: true,
    },
  ]);
  useEffect(() => {
    if (focus) {
      fetchUserByPhoneNumber(userLoginNumber);
    }
  }, [focus, userLoginNumber]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={[styles.itemText, { marginRight: moderateScale(10) }]}>
        {item.number1}
      </Text>
      <Text
        style={[
          styles.itemText,
          {
            color:  item.callStatus ==3  ? Colors.black :item.callStatus ==0? "green" :"red",
            fontSize: !item.receviced ? moderateScale(12) : moderateScale(16),
            // borderWidth:1,
            width:moderateScale(80),
            textAlign:'center'
          },
        ]}
      >
        {handleCallStatus(item.callStatus,item)}
      </Text>

      <View style={{ flexDirection: "row" }}>
      {/* <Text style={[styles.itemText, { marginRight: moderateScale(10) }]}>
          {item.number2}
        </Text> */}
        
        <Text style={[styles.itemText, { marginRight: moderateScale(10) }]}>
          {item.callAddTime}
        </Text>
        <Text style={styles.itemText}>{extractDate(item.callAddDate)}</Text>
      </View>
    </View>
  );

  const extractDate = (fullDate) => {
    // Split the string by '/' and take the first two parts
    const dateParts = fullDate.split('/');
    // Join the first two parts with '/'
    return `${dateParts[0]}/${dateParts[1]}`;
};

  const handleCallStatus = (role,data) => {
    switch (role) {
      case 1:
          return "Missed ist call";
      case 2:
          return "Missed 2nd call";
      case 3:
          return data?.conferenceTime;
      case 4:
            return "No network on ist call";
            case 5:
            return "Busy ist call";
            case 6:
              return "Missed ist call";
              case 7:
                return "No network on 2nd call";
                case 8:
                  return "Busy 2nd call";
                  case 9:
                    return "Missed 2nd call";
                          

          case 0:
        return "on going call";
      
      default:
          return "Role not recognized.";
  }
};
  const handleCallStatusColor = (role) => {
    switch (role) {
        case 1:
            return "You have admin privileges.";
        case 2:
            return "You can edit content.";
        case 3:
            return "You can view content.";
        default:
            return "Role not recognized.";
    }
};

const fetchUserByPhoneNumber = async (userLoginNumber) => {
  setCallLogLoading(true);
  try {
    // Query where userLoginNumber matches number2 and order by callAddTimestamp in descending order
    const callLogs = await firestore()
      .collection("numbers")
      .where("number2", "==", userLoginNumber)
      .orderBy("callAddTimestamp", "desc")
      .get();

    // Map the results to a data array
    const data = callLogs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    console.log("callLogs>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data);

    if (data.length > 0) {
      setCallLogsDataList(data);
    } else {
      console.log("No matching documents.");
    }
  } catch (error) {
    console.error("Error getting user: ", error);
  } finally {
    setCallLogLoading(false);
  }
};

  const filteredData = callLogsDataList?.filter((item) =>
    item?.number1.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  
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
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={{ flexGrow: 1, flex: 1 }}
      >
        <CustomHeader title={"Call logs"} onPressMenu={handleDrawer} />
        <View style={styles.SearchContainerr}>
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
          {callLogLoading?
          
          <ActivityIndicator size={30} color={'black'}/>
          :
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={renderEmpty}
          />}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default CallLogs;

const styles = StyleSheet.create({
  SearchContainerr: {
    flex: 1.2,
    backgroundColor: "#d1d1d1",
    // paddingTop: 50,
    paddingHorizontal: moderateScale(12),
    paddingBottom: moderateScale(30),
    paddingTop: moderateScale(20),
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
    padding: moderateScale(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  itemText: {
    fontSize: moderateScale(15),
    textAlign: "left",
    color: Colors.black,
    fontWeight:'600'
    // width:100,
    // borderWidth: 1,
  },
});
