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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <Text style={styles.title}>Welcome to SINGUPPPPPPPPPPPPPPPP</Text>
        <View>
          <Text style={styles.subtitle}>Sign up to continue</Text>
          <TextInput
            activeUnderlineColor={colors.primary}
            style={[styles.input, { marginBottom: 15 }]}
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            disabled={isLoading}
          />
          <TextInput
            activeUnderlineColor={colors.primary}
            style={[styles.input, { marginBottom: 10 }]}
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            disabled={isLoading}
            secureTextEntry={secureTextEntry}
            right={
              <TextInput.Icon
                onPress={() => setSecureTextEntry(!secureTextEntry)}
                icon={secureTextEntry ? "eye" : "eye-off"}
              />
            }
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: "#fff", marginBottom: 15 }}>
            Forgot password?
          </Text>
          <Text
            onPress={() => router.replace("/sign-up")}
            style={{ color: "#fff", marginBottom: 15 }}
          >
            Sign up
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
            <Text style={styles.buttonText}>Sign In</Text>
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
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingBottom: 5,
    fontSize: 16,
    height: 50,
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
