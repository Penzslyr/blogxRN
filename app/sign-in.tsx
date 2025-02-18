import { router } from "expo-router";
import { Text, View } from "react-native";

import { useSession } from "../ctx";
import { useEffect, useState } from "react";

export default function SignIn() {
  const { signIn } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("isLoading", isLoading);
  }, [isLoading]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={() => {
          setIsLoading(true);
          setTimeout(() => {
            signIn();
            setIsLoading(false);
            router.replace("/(app)/Index");
          }, 3000);
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
        }}
      >
        {isLoading ? "Loading..." : "Sign In"}
      </Text>
    </View>
  );
}
