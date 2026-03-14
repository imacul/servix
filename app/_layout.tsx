import React from "react";
import { Stack } from "expo-router";
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import { UserProvider } from "../context/user";

export const unstable_settings = {
  initialRouteName: "splash",
};

export default function RootLayout() {
  const scheme = useColorScheme();
  const navTheme = scheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider value={navTheme}>
      <UserProvider>
        <StatusBar style={scheme === "dark" ? "light" : "dark"} />
        <Stack screenOptions={{ headerShown: false }} />
      </UserProvider>
    </ThemeProvider>
  );
}
