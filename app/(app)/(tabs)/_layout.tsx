import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { View, Image, Touchable, TouchableOpacity } from "react-native";
import colors from "@/app/components/color";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../types";
import { useNavigation } from "@react-navigation/native";
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
            <Image
              source={{
                uri: "https://photoscissors.com/images/samples/1-before.jpg",
              }} // Replace with your profile picture URL
              style={{
                width: 40,
                height: 40,
                borderRadius: 20, // Makes it circular
              }}
            />
          </TouchableOpacity>
        ),
        headerTitleAlign: "center",
        headerTitle: "BlogX",
        // headerRight: () => (
        //   <View style={{ paddingRight: 15 }}>
        //     <FontAwesome size={28} name="cog" color="#ed" />
        //   </View>
        // ),
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
