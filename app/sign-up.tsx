import { router } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { TextInput } from "react-native-paper";

import { useSession } from "../ctx";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "./components/color"; // Import primary color

export default function SignIn() {
  const { signIn } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  interface Iuser {
    username: string;
    email: string;
    password: string;
    displayName: string;
  }

  const [user, setUser] = useState<Iuser>({
    username: "",
    email: "",
    password: "",
    displayName: "",
  });

  useEffect(() => {
    console.log("isLoading", isLoading);
  }, [isLoading]);

  const handleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      signIn();
      setIsLoading(false);
      router.replace("/");
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={styles.innerContainer}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.title}>Welcome to blogx</Text>
          <Text style={styles.subtitle}>Sign up to continue</Text>
        </View>
        <TextInput
          activeUnderlineColor={colors.primary}
          style={[styles.input, { height: 50, marginBottom: 15 }]}
          contentStyle={{ height: 50 }} // Adjust the internal content height
          label="Username"
          value={user.username}
          onChangeText={(text) => setUser({ ...user, username: text })}
          disabled={isLoading}
        />
        <TextInput
          activeUnderlineColor={colors.primary}
          style={[styles.input, { height: 50, marginBottom: 15 }]}
          contentStyle={{ height: 50 }} // Adjust the internal content height
          label="Email"
          value={user.email}
          onChangeText={(text) => setUser({ ...user, email: text })}
          disabled={isLoading}
        />
        <TextInput
          activeUnderlineColor={colors.primary}
          style={[styles.input, { height: 50, marginBottom: 10 }]}
          contentStyle={{ height: 50 }} // Adjust the internal content height
          label="Password"
          value={user.password}
          onChangeText={(text) => setUser({ ...user, password: text })}
          disabled={isLoading}
          secureTextEntry={secureTextEntry}
          right={
            <TextInput.Icon
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              icon={secureTextEntry ? "eye" : "eye-off"}
            />
          }
        />
        <TextInput
          activeUnderlineColor={colors.primary}
          style={[styles.input, { height: 50, marginBottom: 15 }]}
          contentStyle={{ height: 50 }} // Adjust the internal content height
          label="Display Name"
          value={user.displayName}
          onChangeText={(text) => setUser({ ...user, displayName: text })}
          disabled={isLoading}
        />

        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Text
            onPress={() => router.replace("/sign-in")}
            style={{ color: "#fff", marginBottom: 15 }}
          >
            Sign in
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSignIn}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "80%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 32,
    fontFamily: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: colors.primary,
    fontFamily: "bold",
  },
});
