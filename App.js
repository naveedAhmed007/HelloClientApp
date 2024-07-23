// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomBottomTab from "./App/CustomBottomTab/CustomBottomTab";
import store from "./App/Redux/store";
import { Provider, useSelector } from "react-redux";
import Login from "./App/AuthStack/Login";
import Otp from "./App/AuthStack/Otp";
import { NavigationContainerRef } from '@react-navigation/native';
export const navigationRef = React.createRef();

const Stack = createNativeStackNavigator();
export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

const AuthStack = () => {
  return (
    <Stack.Navigator options={{ headerShown: false }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Otp"
        component={Otp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
function MainApp() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log("isAuthenticated>>>>", isAuthenticated);
  return (
    <NavigationContainer ref={navigationRef}>
      {isAuthenticated ? <CustomBottomTab /> : <AuthStack />}
       {/* <CustomBottomTab />  */}
      
    </NavigationContainer>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};
export default App;
