import { Platform } from "react-native";

export type AppTheme = ReturnType<typeof createTheme>;

const fonts = {
  regular: Platform.select({ ios: "System", android: "sans-serif" }) || "System",
  medium: Platform.select({ ios: "System", android: "sans-serif-medium" }) || "System",
  semibold: Platform.select({ ios: "System", android: "sans-serif-medium" }) || "System",
  bold: Platform.select({ ios: "System", android: "sans-serif" }) || "System",
};

export const createTheme = (scheme: "light" | "dark" | null) => {
  const isDark = scheme === "dark";

  const colors = {
    background: isDark ? "#0B1118" : "#F6F8FB",
    card: isDark ? "#111A24" : "#FFFFFF",
    text: isDark ? "#F3F6FA" : "#0B1B2B",
    muted: isDark ? "#9AA6B2" : "#6B7280",
    border: isDark ? "#1E2A36" : "#E5E9F0",
    primary: isDark ? "#2B6EA7" : "#1E4D7B",
    primaryDeep: isDark ? "#1A4A73" : "#0D2B45",
    accent: "#25B9A5",
    accentSoft: isDark ? "#143A36" : "#E1F6F3",
    success: "#27B27E",
    warning: "#F2B34A",
    danger: "#E45D5D",
    shadow: isDark ? "#000000" : "#0A1A2B",
  };

  const radii = {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 28,
  };

  const spacing = {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
    xxxl: 40,
  };

  const shadows = {
    soft: {
      shadowColor: colors.shadow,
      shadowOpacity: isDark ? 0.2 : 0.08,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 8 },
      elevation: isDark ? 1 : 3,
    },
    lift: {
      shadowColor: colors.shadow,
      shadowOpacity: isDark ? 0.32 : 0.14,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 10 },
      elevation: isDark ? 2 : 5,
    },
  };

  const text = {
    display: {
      fontFamily: fonts.bold,
      fontSize: 30,
      lineHeight: 36,
    },
    h1: {
      fontFamily: fonts.bold,
      fontSize: 24,
      lineHeight: 30,
    },
    h2: {
      fontFamily: fonts.semibold,
      fontSize: 20,
      lineHeight: 26,
    },
    h3: {
      fontFamily: fonts.semibold,
      fontSize: 16,
      lineHeight: 22,
    },
    body: {
      fontFamily: fonts.regular,
      fontSize: 15,
      lineHeight: 22,
    },
    caption: {
      fontFamily: fonts.regular,
      fontSize: 12,
      lineHeight: 16,
    },
    button: {
      fontFamily: fonts.semibold,
      fontSize: 15,
      lineHeight: 20,
    },
  };

  return { colors, radii, spacing, shadows, text, fonts, isDark };
};
