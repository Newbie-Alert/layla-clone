import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export type Auth = {
  token: string;
  userId: string;
};

export type AuthContextType = {
  auth: Auth;
  setAuth: (token: string, userId: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [auth, setAuth] = useState<Auth>({
    token: "",
    userId: "",
  });

  const handleSetAuth = async (token: string, userId: string) => {
    setAuth({ token, userId });
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("userId", userId);
  };

  useEffect(() => {
    (async () => {
      const storageToken = await AsyncStorage.getItem("token");
      const storageUserId = await AsyncStorage.getItem("userId");
      if (storageToken && storageUserId) {
        setAuth({ token: storageToken, userId: storageUserId });
      }
    })();
  }, []);

  const logout = async () => {
    setAuth({ token: "", userId: "" });
    await AsyncStorage.multiRemove(["token", "userId"]);
  };

  return (
    <AuthContext.Provider value={{ auth, logout, setAuth: handleSetAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw Error("Provider 안에서만 작동합니다");
  return authContext;
};
