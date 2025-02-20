import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { View, Image, Touchable, TouchableOpacity } from "react-native";
import colors from "@/app/components/color";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../types";
import { useNavigation } from "@react-navigation/native";
import { Avatar, IconButton } from "react-native-paper";
export default function TabsNav() {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarShowLabel: false,

        headerTitleStyle: {
          fontWeight: "semibold",
        },
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
        },
        headerLeft: () => (
          <TouchableOpacity
            style={{ paddingLeft: 15 }}
            onPress={() => navigation.openDrawer()}
          >
            <Avatar.Image
              size={32}
              source={{ uri: "https://picsum.photos/200" }}
            />
          </TouchableOpacity>
        ),
        headerTitleAlign: "center",
        headerTitle: "BlogX",
        headerRight: () => (
          <IconButton
            icon="star-four-points-outline"
            size={24}
            onPress={() => {}}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="envelope" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
