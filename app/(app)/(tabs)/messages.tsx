import colors from "@/app/components/color";
import { View, Text, StyleSheet } from "react-native";

export default function Messages() {
  return (
    <View style={styles.container}>
      <Text>Tab Messages</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
