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
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";

import { moderateScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
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
import { useDispatch } from "react-redux";
import { setNotificationDetail } from "../../Redux/HomeReducer/homeSlice";

const CategoryModal = ({ visible, onClose, onName }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const renderDescription = (txt) => {
    const isLongText = txt.length > 300;

    if (isLongText) {
      if (isExpanded) {
        return (
          <Text style={styles.DescriptionTxt}>
            {txt}
            <Text style={styles.readMoreText} onPress={handleToggleExpand}>
              {" "}
              Read Less
            </Text>
          </Text>
        );
      } else {
        return (
          <Text style={styles.DescriptionTxt}>
            {txt.substring(0, 300)}...
            <Text style={styles.readMoreText} onPress={handleToggleExpand}>
              {" "}
              Read More
            </Text>
          </Text>
        );
      }
    } else {
      return <Text style={styles.DescriptionTxt}>{txt}</Text>;
    }
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.TitleTxt}>Title</Text>
          <Text style={styles.DescriptionTxt}>{onName.title}</Text>

          <Text style={[styles.TitleTxt, { marginTop: moderateScale(10) }]}>
            Description
          </Text>
          {onName.body ? renderDescription(onName.body) : ""}

          <Pressable style={styles.closeButton} onPress={onClose}>
            <Entypo
              name="cross"
              size={moderateScale(25)}
              color={Colors.primaryClr}
            />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const ListItem = ({ data }) => {
  let navigation = useNavigation();
  let dispatch = useDispatch();
  const [categoryModal, setCategoryModal] = useState(false);

  const handleUnSaved = (resp) => {
    // console.log('resp>>>>>>>>>>>>>>>>>>>>>>>>>>>', resp);
  };
  // console.log(data);
  const handleNavigation = (item) => {
    dispatch(setNotificationDetail(item));
    navigation.navigate("NotificationDetail");
  };

  const handleCategoryModal = () => {
    // setCategoryModal(false);
    return data;
  };

  return (
    <TouchableOpacity
      onPress={() => setCategoryModal(true)}
      style={[styles.container, { flexDirection: "column" }]}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={styles.userBox}>
          <Feather name={"user"} size={24} color={Colors.white} />
        </View>

        <View style={styles.content}>
          <Text style={styles.heading} numberOfLines={1}>
            {data?.title}
          </Text>
          <Text numberOfLines={2} style={styles.description}>
          {data?.body}
          </Text>
          {/* <Text style={styles.description}>{data?.id}</Text> */}
        </View>
      </View>
      <View style={{ paddingHorizontal: moderateScale(5) }}>
        <View style={styles.ActionBtn}>
          {/* <Text
            style={[styles.description, {marginVertical: moderateScale(8),fontSize:moderateScale(10)}]}>
            {date}
          </Text> */}
          {/* <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity
              style={[
                styles.ActionBtnWrapper,
                {backgroundColor: Colors.primaryClr},
              ]}>
              <Text style={styles.ActionBtnTxt}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.ActionBtnWrapper,
                {backgroundColor: '#DFDFDF', marginRight: 0},
              ]}>
              <Text style={[styles.ActionBtnTxt, {color: '#424242'}]}>
                Reject
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
      <CategoryModal
        visible={categoryModal}
        onClose={() => setCategoryModal(false)}
        onName={data}
      />
    </TouchableOpacity>
  );
};

const data = [
  {
    id: 1,
    heading: "Credit recharge",
    description:
      "Successfully recharge your credited now you can enjoy the calls.",
    date: "Mon at 11:26PM",
  },
  {
    id: 2,
    heading: "Happy new year",
    description:
      "This new year you can enjoy our servies so dont miss to install our app.",
    date: "Mon at 11:26PM",
  },
  {
    id: 3,
    heading: "Exciting news for you",
    description:
      "Hurrrah! , now you can download our app from the app store directly.",
    date: "Mon at 11:26PM",
  },
  // Add more data items as needed
];

const Notifications = () => {
  let navigation = useNavigation();
  let focus = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [notificationList, setNotificationList] = useState();

  useEffect(() => {
    if (focus) {
      handleNotificationData();
    }
  }, [focus]);
  const handleNotificationData = () => {
    setLoading(true);
    getNotifications().then((result) => {
      console.log("result", result);
      setNotificationList(result);
      setLoading(false);
    });
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
          title={"Notifications"}
        />

        {/* <View style={styles.searchContainer}>
            <View style={[MainStyle.withIconInputContainer, {}]}>
              <AntDesign name={'search1'} size={22} color="grey" />
              <TextInput
                placeholder="Search notifications"
                placeholderTextColor={Colors.placeHolderClr}
                style={[
                  MainStyle.withIconInput,
                  {paddingLeft: 5, color: Colors.black},
                ]}
              />
            </View>
          </View> */}
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size={35} color={Colors.black} />
          </View>
        ) : (
          <FlatList
            data={notificationList}
            keyExtractor={(item) => item.id.toString()}
            style={{ marginTop: moderateScale(20) }}
            renderItem={({ item }) => <ListItem data={item} />}
            ListEmptyComponent={renderEmpty}
          />
        )}
        {/* </View> */}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Notifications;

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
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    fontSize: moderateScale(14),
    marginBottom: 4,
    color: Colors.black,

    // marginTop:moderateScale(10)
  },
  description: {
    fontSize: moderateScale(12),
    color: "#666",
    lineHeight: moderateScale(18),
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
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: moderateScale(20),
    borderRadius: moderateScale(20),
    marginHorizontal: moderateScale(10),
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // paddingVertical: moderateScale(10),
  },
  optionContainerName: {
    // borderWidth: 1,
    paddingHorizontal: moderateScale(25),
    borderRadius: 10,
    backgroundColor: "#E6E0EF",
  },
  leftIcon: {
    marginRight: moderateScale(10),
  },
  rightIcon: {
    marginLeft: moderateScale(10),
  },
  optionText: {
    fontSize: moderateScale(25),
    flex: 1,
    color: Colors.primaryClr,
    // marginLeft: moderateScale(8),
  },
  optionTextName: {
    fontSize: moderateScale(14),
    color: Colors.primaryClr,
  },
  closeButton: {
    // marginTop: moderateScale(20),
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: moderateScale(100),
    position: "absolute",
    top: moderateScale(-45),
    right: moderateScale(10),
    paddingHorizontal: moderateScale(3),
    paddingVertical: moderateScale(3),
  },
  closeButtonText: {
    color: "white",
    fontSize: moderateScale(20),
    color: Colors.primaryClr,
    fontWeight: "bold",
  },
  IconModel: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: moderateScale(45),
    height: moderateScale(45),
    marginRight: 5,
  },
  TitleTxt: {
    fontSize: moderateScale(18),
    color: Colors.primaryClr,
    fontWeight: "bold",
  },
  DescriptionTxt: {
    fontSize: moderateScale(16),
    color: Colors.black,
    textAlign: "left",
  },
  readMoreText: {
    color: Colors.primaryClr,
    fontWeight: "bold",
  },
});
