import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

import { moderateScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import images from "../../Utils/images";
import CustomHeader from "../../CustomHeader/CustomeHeader";
import CustomStatusBar from "../../Utils/CustomStatusBar";
import MainStyle from "../../Utils/MainStyle";
import { Colors } from "../../Utils/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getNotifications } from "../../FirebaseMethods/FirebaseMethods";
import { useSelector } from "react-redux";


const ListItem = ({ data }) => {
  const handleUnSaved = (resp) => {
    // console.log('resp>>>>>>>>>>>>>>>>>>>>>>>>>>>', resp);
  };
  // console.log(data);

  return (
    <View style={[styles.container, { flexDirection: "column" }]}>
      <View style={{ flexDirection: "row" }}>
        {/* <View style={styles.userBox}>
          <Feather name={"user"} size={24} color={Colors.white} />
        </View> */}
        <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
        <Text style={[styles.heading,{marginRight:5}]} numberOfLines={1}>
            Title
          </Text>
          <Text style={styles.description}>{data?.title}</Text>
        </View>

        {/* <View style={styles.content}>
          <Text style={styles.heading} numberOfLines={1}>
            {data?.title}
          </Text>
          <Text style={styles.description}>{data?.body}</Text> */}
          {/* <Text style={styles.description}>{data?.id}</Text> */}
        {/* </View> */}
      </View>
    </View>
  );
};

const NotificationDetail = () => {
  let navigation = useNavigation();
  let focus = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [notificationList, setNotificationList] = useState();
  const notificationDetail = useSelector((state) => state.home.notificationDetail);


  useEffect(() => {
    if (focus) {
      handleNotificationData();
    }
  }, [focus]);
  const handleNotificationData = () => {
    setLoading(true);
    getNotifications().then((result) => {
      // console.log(result);
      setNotificationList(result);
      setLoading(false);
    });
  };

  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <CustomStatusBar color={Colors.white} />
        <CustomHeader
          onPressMenu={() => navigation.openDrawer()}
          title={"Notification Detail"}
        />

        <ListItem data={notificationDetail}/>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default NotificationDetail;

const styles = StyleSheet.create({
  SectionContainer: {
    flex: 1,
    paddingHorizontal:
      Platform.OS === "ios" ? moderateScale(20) : moderateScale(20),
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginHorizontal: moderateScale(11),
    marginVertical: moderateScale(5),
    // backgroundColor: Colors.white,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    marginTop:moderateScale(30)
    
  },
  image: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: 50,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  heading: {
    fontSize: moderateScale(22),
    marginBottom: 4,
    color: Colors.black,
    fontWeight:'600'

    // marginTop:moderateScale(10)
  },
  description: {
    fontSize: moderateScale(18),
    color: "#666",
    // lineHeight: moderateScale(22),
  },

  searchContainer: {
    width: "100%",
    paddingHorizontal: moderateScale(10),
    marginTop: moderateScale(20),
  },

  ActionBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: moderateScale(8),
  },
  ActionBtnTxt: {
    fontSize: moderateScale(12),
    color: Colors.white,
    fontWeight: "500",
    marginRight: 5,
  },
  ActionBtnWrapper: {
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(4),
    borderRadius: 20,
    marginRight: 5,
  },
  userBox: {
    borderWidth: 1,
    borderRadius: 100,
    width: moderateScale(38),
    height: moderateScale(38),
    marginRight: 5,
    backgroundColor: Colors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
