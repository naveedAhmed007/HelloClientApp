import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { FC, useState } from "react";
import PhoneInput from "react-native-phone-input";
import { moderateScale } from "react-native-size-matters";
import { Colors } from "./Colors";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface EditTextPhoneProps {
  onPressFlag: () => void;
  onPress: (called: string) => void;
  phoneRef: any;
  first: string;
  onChangePhoneNumber: () => void;
  validNumber: boolean;
  from: string;
  HideFlag?: boolean;
}
const EditTextPhone: FC<EditTextPhoneProps> = ({
  onPressFlag,
  phoneRef,
  onPress,
  first,
  onChangePhoneNumber,
  validNumber,
  from,
  HideFlag = false,
}) => {
  const handleNumber = (e) => {
    return (
      <TextInput
        style={styles.inputTxt}
        keyboardType="phone-pad"
        value={e.value}
        onChangeText={e?.onChangeText}
      />
    );
  };

  return from == "Dialer" ? (
    <View
      style={[
        from == "Dialer"
          ? styles.Dialer
          : from == "Transfer"
          ? styles.Transfer
          : styles.main,
      ]}
    >
      <PhoneInput
        style={{ flex: 1 }}
        initialValue={HideFlag ? "" : "+291"}
        // initialCountry={'ea'}
        autoFormat={true}
        // textComponent={(e) => handleNumber(e)}
        onPressFlag={onPressFlag}
        allowZeroAfterCountryCode={false}
        onChangePhoneNumber={onChangePhoneNumber}
        ref={phoneRef}
        textStyle={{
          fontSize: from == "Dialer" ? moderateScale(28) : moderateScale(14),
          fontWeight: from == "Dialer" ? "700" : "500",
          color: Colors.black,
          height: moderateScale(50),
        }}
        flagStyle={{ display: HideFlag ? "none" : "flex" }}
      />
      {validNumber == false && (
        <MaterialIcons name={"error"} color={"red"} size={moderateScale(24)} />
      )}
    </View>
  ) : from == "Login" ? (
    <View style={styles.main}>
      <PhoneInput
        style={{ flex: 1 }}
        initialValue={HideFlag ? "" : "+291"}
        // initialCountry={'ea'}
        onPressFlag={onPressFlag}
        // textComponent={(e) => handleNumberTransferNumber(e)}
        allowZeroAfterCountryCode={false}
        onChangePhoneNumber={onChangePhoneNumber}
        ref={phoneRef}
        textStyle={{
          color: Colors.black,
          height: moderateScale(55),
          fontSize:moderateScale(28),
          fontWeight:'700',
          borderBottomWidth:1,
          borderBottomColor:'grey',
          width:'110%'
        }}
        flagStyle={{ display: HideFlag ? "none" : "flex" }}
      />
      {validNumber == false && (
        <MaterialIcons name={"error"} color={"red"} size={moderateScale(24)} />
      )}
      <TouchableOpacity
        onPress={() => {
          onPress(first);
        }}
      >
        <MaterialIcons
          name={"contact-page"}
          color={Colors.primaryClr}
          size={moderateScale(34)}
        />
      </TouchableOpacity>
    </View>
  ) : (
    <View
      style={[
        from == "Dialer"
          ? styles.Dialer
          : from == "Transfer"
          ? styles.Transfer
          : styles.main,
      ]}
    >
      <PhoneInput
        style={{ flex: 1 }}
        initialValue={HideFlag ? "" : "+291"}
        // initialCountry={'ea'}
        onPressFlag={onPressFlag}
        // textComponent={(e) => handleNumberTransferNumber(e)}
        allowZeroAfterCountryCode={false}
        onChangePhoneNumber={onChangePhoneNumber}
        ref={phoneRef}
        textStyle={{
          fontSize: from == "Dialer" ? moderateScale(22) : moderateScale(24),
          fontWeight: from == "Dialer" ? "700" : "500",
          color: Colors.black,
          height: moderateScale(100),
        }}
        flagStyle={{ display: HideFlag ? "none" : "flex" }}
      />
      {validNumber == false && (
        <MaterialIcons name={"error"} color={"red"} size={moderateScale(24)} />
      )}
      <TouchableOpacity
        onPress={() => {
          onPress(first);
        }}
      >
        <MaterialIcons
          name={"contact-page"}
          color={Colors.primaryClr}
          size={moderateScale(34)}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    // borderBottomColor: "#DDD",
    // borderBottomWidth: moderateScale(2),
    // paddingBottom: moderateScale(8),
    width: "97%",
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: moderateScale(20),
    color: Colors.black,
    
  },
  Dialer: {
    // flex:1,
    width: "100%",
    // borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",

    marginBottom: moderateScale(10),
    // backgroundColor: "white",
    padding: moderateScale(18),
    // borderRadius: 10,
    // height: moderateScale(65),
    
    color: Colors.black,
  },
  Transfer: {
    // borderBottomColor: "#DDD",
    // borderBottomWidth: moderateScale(2),

    paddingBottom: moderateScale(8),
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: moderateScale(10),
    backgroundColor: "white",
    padding: moderateScale(10),
    borderRadius: 10,
    height: moderateScale(50),
    color: Colors.black,
  },
  inputTxt: {
    fontSize: moderateScale(30),
    fontWeight: "700",
    paddingVertical: 0,
    textAlign: "center",
    // borderWidth: 1,
  },
  inputTxtTransfer: {
    fontSize: moderateScale(22),
    fontWeight: "700",
    paddingVertical: 0,
    // borderWidth: 1,
  },
});
export default EditTextPhone;
