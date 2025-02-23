import {
  useContext,
  createContext,
  type PropsWithChildren,
  useEffect,
} from "react";
import { useStorageState } from "./useStorageState";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  session?: any | null;
  isLoading: boolean;
}>({
  signIn: () => Promise.resolve(false),
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }
  return value;
}

// In your SessionProvider file (e.g., ctx.tsx)
export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  useEffect(() => {
    console.log("isLoading", isLoading);
  }, [isLoading]);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email: string, password: string): Promise<boolean> => {
          try {
            console.log("Full URL:", `${API_URL}/api/login`);
            console.log("email:", email);
            console.log("password:", password);

            const response = await fetch(`${API_URL}/api/login`, {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(
                `Sign-in failed: ${response.status} - ${errorText}`
              );
            }

            const data = await response.json();
            console.log("data:", JSON.stringify(data, null, 2));

            if (data && data.token) {
              setSession(data);
              console.log("Session saved successfully");
              return true; // Success
            } else {
              console.log("No valid token found in response");
              return false; // No token
            }
          } catch (error: any) {
            console.error("Error signing in:", error.message);
            return false; // Failure
          }
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
