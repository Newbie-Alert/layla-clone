import { useAuth } from "@/providers/AuthProvider";
import { Redirect } from "expo-router";

export default function Root() {
  const { auth } = useAuth();

  if (!auth.token) return <Redirect href={"/(auth)/login"} />;
  return <Redirect href={"/(tabs)"} />;
}
