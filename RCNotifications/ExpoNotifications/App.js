import { StatusBar } from "expo-status-bar";
import { Alert, Button, Platform, StyleSheet, Text, View } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  const [pushToken, setPushToken] = useState('');

  useEffect(() => {
    async function setupPushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert(
          "Permission required",
          "Push notifications need the appropiate permissions."
        );
        return;
      }

      const pushTokenData = await Notifications.getExpoPushTokenAsync({
        projectId: "c407aff0-3858-49b2-b478-9c2f7edbf072",
      });
      console.log(pushTokenData);
      setPushToken(pushTokenData.data)

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    }

    setupPushNotifications();
  }, []);

  useEffect(() => {
    const subcscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received");
        console.log(notification);
      }
    );
    const subResponse = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Notification response received");
        console.log(response.notification.request.content.data);
      }
    );

    return () => {
      subcscription.remove();
      subResponse.remove();
    };
  }, []);

  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "HiHiHi title",
        body: "Body notification!",
        data: {
          userName: "Ionut",
        },
      },
      trigger: {
        seconds: 1,
      },
    });
  }

  function setPushNotification(){
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: pushToken,
        title: "TeSStt",
        body: "Test Test Test"
      })
    });
  }

  return (
    <View style={styles.container}>
      <Button
        title="Schedule notification"
        onPress={scheduleNotificationHandler}
      />
      <Button
        title="Schedule P U S H notification"
        onPress={setPushNotification}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
