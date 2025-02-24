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
import colors from "./components/color";

export default function SignIn() {
  const { signIn, session } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // For error feedback

  useEffect(() => {
    console.log("isLoading", isLoading);
    console.log("session", JSON.stringify(session, null, 2));
  }, [isLoading]);

  const handleSignIn = async () => {
    // Validate inputs
    if (!email || !password) {
      setError("Please fill in both email and password");
      return;
    }

    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      const success = await signIn(email, password);
      if (success) {
        router.replace("/"); // Redirect only on success
      } else {
        setError("Sign-in failed. Please check your credentials.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={styles.innerContainer}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.title}>Welcome to blogx</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        {error && (
          <Text style={styles.errorText}>{error}</Text> // Display error
        )}

        <TextInput
          activeUnderlineColor={colors.primary}
          style={[styles.input, { height: 50, marginBottom: 15 }]}
          contentStyle={{ height: 50 }}
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          disabled={isLoading}
        />
        <TextInput
          activeUnderlineColor={colors.primary}
          style={[styles.input, { height: 50, marginBottom: 10 }]}
          contentStyle={{ height: 50 }}
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
  errorText: {
    color: "#ff4444",
    marginBottom: 15,
    textAlign: "center",
  },
});
