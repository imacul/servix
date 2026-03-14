import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { useAppTheme } from "../../theme/useAppTheme";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: ViewStyle | ViewStyle[];
};

export const Button = ({
  label,
  onPress,
  variant = "primary",
  disabled,
  style,
}: ButtonProps) => {
  const theme = useAppTheme();

  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        isPrimary && {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
        },
        isSecondary && {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
        },
        variant === "ghost" && {
          backgroundColor: "transparent",
          borderColor: "transparent",
        },
        pressed && !disabled && styles.pressed,
        disabled && { opacity: 0.6 },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          theme.text.button,
          { color: isPrimary ? "#FFFFFF" : theme.colors.text },
          variant === "ghost" && { color: theme.colors.primary },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  text: {
    letterSpacing: 0.2,
  },
});
