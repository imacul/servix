import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "../../theme/useAppTheme";

type LogoProps = {
  size?: number;
  showWordmark?: boolean;
};

export const Logo = ({ size = 64, showWordmark = true }: LogoProps) => {
  const theme = useAppTheme();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.accent]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.mark, { width: size, height: size, borderRadius: size * 0.28 }]}
      >
        <View style={styles.innerRing}>
          <Ionicons name="compass" size={size * 0.4} color="#FFFFFF" />
        </View>
      </LinearGradient>
      {showWordmark ? (
        <View>
          <Text style={[theme.text.h1, styles.wordmark, { color: theme.colors.text }]}>Servix</Text>
          <Text style={[theme.text.caption, { color: theme.colors.muted }]}>Trusted local services</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  mark: {
    alignItems: "center",
    justifyContent: "center",
  },
  innerRing: {
    width: "70%",
    height: "70%",
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  wordmark: {
    letterSpacing: 0.4,
  },
});
