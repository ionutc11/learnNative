import { useContext, useState } from "react";
import { logIn } from "../api/auth";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const [isLoading, setLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  async function handleLogIn({ email, password }) {
    setLoading(true);
    try {
      const token = await logIn(email, password);
      authCtx.authenticate(token);
    } catch (err) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Check credentials!"
      );
      setLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingOverlay message={"Logging in..."} />;
  }
  return <AuthContent isLogin onAuthenticate={handleLogIn} />;
}

export default LoginScreen;
