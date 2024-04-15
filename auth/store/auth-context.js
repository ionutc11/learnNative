import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  token: null,
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthcontextProvider({ children }) {
  const [token, setToken] = useState(null);

  function authenticate(token) {
    setToken(token);
    AsyncStorage.setItem("token", token);
  }

  function logout() {
    setToken(null);
    AsyncStorage.removeItem("token");
  }

  const value = {
    token,
    isAuthenticated: !!token,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthcontextProvider;
