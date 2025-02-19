import { Button, Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { RootDrawerParamList } from "../types"; // Import the type

import { useSession } from "../../../ctx";
import { DrawerNavigationProp } from "@react-navigation/drawer";

export default function Index() {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  const { signOut } = useSession();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}
      >
        Sign Out
      </Text>
      <Pressable
        onPress={() => navigation.openDrawer()} // Open the Drawer
        style={{
          padding: 10,
          backgroundColor: "blue",
          borderRadius: 5,
          marginTop: 10,
        }}
      >
        <Text style={{ color: "white" }}>Open Drawer</Text>
      </Pressable>
    </View>
  );
}
