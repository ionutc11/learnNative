import { useContext, useState } from "react";
import { createUser } from "../api/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
  const [isLoading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  async function handleSignup({ email, password }) {
    setLoading(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token)
    } catch (err) {
      Alert.alert("Authentication failed!", "Could not create user.");
      setLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingOverlay message={"Creating user..."} />;
  }

  return <AuthContent onAuthenticate={handleSignup} />;
}

export default SignupScreen;
