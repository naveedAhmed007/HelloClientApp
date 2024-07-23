import { View, Text, Dimensions } from "react-native";
import React, { FC } from "react";
import LottieView from "lottie-react-native";
import { moderateScale } from "react-native-size-matters";
interface props {
  heightDiv?: number;
  widthDiv?: number;
}
export const Loader: FC<props> = ({ heightDiv = 2.9, widthDiv = 2.9 }) => {
  return (
    <View
      style={{
        position: "absolute",
        left: Dimensions.get("window").width / widthDiv,
        top: Dimensions.get("window").height / heightDiv,
        zIndex: 1000,
      }}
    >
      <LottieView
        source={require("../Utils/loader.json")}
        autoPlay
        loop
        style={{ height: moderateScale(120), width: moderateScale(100) }}
      />
    </View>
  );
};

export default Loader;
