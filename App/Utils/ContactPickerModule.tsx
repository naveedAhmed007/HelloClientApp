import { NativeModules,NativeEventEmitter } from "react-native";

const { ContactPicker } = NativeModules;
const contactPickerEventEmitter = new NativeEventEmitter(ContactPicker);

const pickContact = () => {
  return ContactPicker.pickContact();
};

const addContactPickedListener = (callback:any) => {
  return contactPickerEventEmitter.addListener('ContactPicked', callback);
};

const addContactPickCancelledListener = (callback:any) => {
  return contactPickerEventEmitter.addListener('ContactPickCancelled', callback);
};

export { pickContact, addContactPickedListener, addContactPickCancelledListener };