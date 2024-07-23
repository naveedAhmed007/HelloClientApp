import { FC } from "react";
import Toast from 'react-native-simple-toast';
export const showToast = ({message}: any) => {
  Toast.show(message, Toast.LONG);
  };