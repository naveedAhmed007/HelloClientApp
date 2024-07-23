/**
 * @format
 */
import "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import App, { navigate } from "./App";
import { name as appName } from "./app.json";
import notifee, { AndroidImportance, EventType } from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
import { createNotifications } from "./App/FirebaseMethods/FirebaseMethods";


messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  createNotifications(remoteMessage);
  getNotification(remoteMessage);
  // console.log("Message handled in the background!", remoteMessage);
  // console.log(
  //   "in remoteMessage.data.key in Index",
  //   JSON.stringify(remoteMessage.data.key)
  // );
});
messaging().getInitialNotification(async (remoteMessage) => {
  createNotifications(remoteMessage);
  getNotification(remoteMessage);
  // console.log("Message handled in the kill state", remoteMessage);
  // console.log(
  //   "in remoteMessage.data.key in Index",
  //   JSON.stringify(remoteMessage.data.key)
  // );
});
messaging().onMessage(async (remoteMessage) => {
  createNotifications(remoteMessage);
  getNotification(remoteMessage);
  // console.log("A new FCM message arrived!", JSON.stringify(remoteMessage));
});

const getNotification = async (data) => {
  
  // Request permissions (required for iOS)
  // console.log("innder data image", data?.data?.fcm_options?.image);
  // console.log(
  //   "innder data image Android",
  //   data?.notification?.android?.imageUrl
  // );

  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: "default1",
    name: "Default Channel 1",
    sound: "default",
    importance: AndroidImportance.HIGH,
  });

  // Display a notification
  await notifee.displayNotification({
    title: `${data?.notification?.title?data?.notification?.title:''}`,
    body: `${data?.notification?.body ? data?.notification?.body : ""}`,
    android: {
      channelId,
      importance: AndroidImportance.HIGH,
      largeIcon: `${data?.notification?.android?.imageUrl}`,
      android: {
        sound: "default",
      },
      // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
      // smallIcon: `${data?.notification?.android?.imageUrl}`, // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: "default",
      },
    },

    ios: {
      foregroundPresentationOptions: {
        badge: true,
        sound: true,
        banner: true,
        list: true,
      },
      attachments: [
        {
          // Remote image
          url: `${data?.data?.fcm_options?.image}`,
        },
      ],
    },
  });

  notifee.onForegroundEvent(async ({ type, detail }) => {
    console.log('onForegroundEvent>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    const { notification, pressAction } = detail;
    switch (type) {
      case EventType.DISMISSED:
        console.log("User dismissed notification", detail.notification);
        break;
      case EventType.PRESS:
        console.log("User pressed notification", detail.notification);
        console.log(
          "in remoteMessage.data.key in Index",
          JSON.stringify(data.data.key)
        );
        navigate('Notifications');
        // if(data.data.key === 'ACTIVITY'){
        //   RootNavigation.navigate('ActivityScreen',{
        //     id:data.data.activityId
        //   });
        // }
        break;
    }
    await notifee.cancelNotification(notification.id);
  });

  notifee.onBackgroundEvent(async ({ type, detail }) => {
    console.log('onBackgroundEvent>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    const { notification, pressAction } = detail;
    console.log("type:", type);
    console.log("detail:", detail);

    switch (type) {
      case EventType.DISMISSED:
        console.log(
          "User dismissed notification backGround",
          detail.notification
        );
        break;
      case EventType.PRESS:
        console.log('User pressed notification backGround ', detail.notification);
        console.log('in remoteMessage.data.key in Index', JSON.stringify(data.data.key));
        
        // if(data.data.key === 'ACTIVITY'){
          navigate('Notifications');
        // }
        break;
    }

    // // Check if the user pressed the "Mark as read" action
    // if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
    //   // Update external API
    //   await fetch(`https://my-api.com/chat/${notification.data.chatId}/read`, {
    //     method: 'POST',
    //   });

    // Remove the notification
    await notifee.cancelNotification(notification.id);
    // }
  });
};

AppRegistry.registerComponent(appName, () => App);
