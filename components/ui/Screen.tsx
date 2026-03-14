import React from "react";
import { ScrollView, StyleSheet, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "../../theme/useAppTheme";

type ScreenProps = {
  children: React.ReactNode;
  scroll?: boolean;
  style?: ViewStyle | ViewStyle[];
  contentContainerStyle?: ViewStyle | ViewStyle[];
};

export const Screen = ({
  children,
  scroll = false,
  style,
  contentContainerStyle,
}: ScreenProps) => {
  const theme = useAppTheme();
  return (
    <LinearGradient
      colors={[theme.colors.background, theme.colors.accentSoft]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={[styles.safe, style]} edges={["top", "left", "right", "bottom"]}>
        <View style={[styles.glow, { backgroundColor: theme.colors.accent }]} />
        <View style={[styles.glowTwo, { backgroundColor: theme.colors.primary }]} />
        {scroll ? (
          <ScrollView
            style={styles.container}
            contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          <View style={styles.container}>{children}</View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  glow: {
    position: "absolute",
    right: -80,
    top: -60,
    width: 180,
    height: 180,
    borderRadius: 90,
    opacity: 0.1,
  },
  glowTwo: {
    position: "absolute",
    left: -60,
    bottom: 160,
    width: 140,
    height: 140,
    borderRadius: 70,
    opacity: 0.08,
  },
});
