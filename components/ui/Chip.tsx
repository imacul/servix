import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useAppTheme } from "../../theme/useAppTheme";

type ChipProps = {
  label: string;
  active?: boolean;
  onPress?: () => void;
};

export const Chip = ({ label, active, onPress }: ChipProps) => {
  const theme = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: active ? theme.colors.primary : theme.colors.card,
          borderColor: active ? theme.colors.primary : theme.colors.border,
        },
        pressed && styles.pressed,
      ]}
    >
      <Text
        style={[
          theme.text.caption,
          { color: active ? "#FFFFFF" : theme.colors.text, fontSize: 13 },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
  },
});
