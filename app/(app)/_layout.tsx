import { Drawer } from "expo-router/drawer";
import { Redirect, Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { Text } from "react-native";

import { useSession } from "../../ctx";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <Drawer
          screenOptions={{
            drawerStyle: {
              backgroundColor: "#fff",
              width: 250,
            },
            headerShown: false,
          }}
        >
          <Drawer.Screen name="(tabs)" options={{ title: "Home" }} />
          <Drawer.Screen name="settings" options={{ title: "Settings" }} />
        </Drawer>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
