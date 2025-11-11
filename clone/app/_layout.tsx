import AuthProvider from "@/providers/AuthProvider";
import LocationProvider from "@/providers/LocationProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LocationProvider>
          <SafeAreaProvider>
            <GestureHandlerRootView
              style={{ flex: 1, backgroundColor: "gray" }}>
              <SafeAreaView style={{ flex: 1 }}>
                <Stack
                  screenOptions={{
                    headerShown: false,
                  }}
                />
              </SafeAreaView>
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </LocationProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
