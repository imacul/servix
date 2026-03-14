import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { Screen } from "../components/ui/Screen";
import { useAppTheme } from "../theme/useAppTheme";
import { Logo } from "../components/ui/Logo";
import { Button } from "../components/ui/Button";

export default function SplashScreen() {
  const theme = useAppTheme();

  return (
    <Screen>
      <View style={styles.container}>
        <Logo size={92} showWordmark={false} />
        <Text style={[theme.text.display, styles.title, { color: theme.colors.text }]}>Servix</Text>
        <Text style={[theme.text.body, styles.subtitle, { color: theme.colors.muted }]}
        >
          Book trusted pros, instantly. Reliable, vetted, and local.
        </Text>
        <View style={styles.actions}>
          <Link href="/" asChild>
            <Button label="Get started" />
          </Link>
          <Text style={[theme.text.caption, { color: theme.colors.muted }]}>No credit card required</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    gap: 16,
  },
  title: {
    letterSpacing: 0.8,
  },
  subtitle: {
    textAlign: "center",
    maxWidth: 300,
  },
  actions: {
    marginTop: 8,
    alignItems: "center",
    gap: 8,
  },
});
