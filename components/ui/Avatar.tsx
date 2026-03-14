import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "../../theme/useAppTheme";

type AvatarProps = {
  name: string;
  uri?: string;
  size?: number;
};

export const Avatar = ({ name, uri, size = 44 }: AvatarProps) => {
  const theme = useAppTheme();
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (uri) {
    return <Image source={{ uri }} style={[styles.image, { width: size, height: size }]} />;
  }

  return (
    <View
      style={[
        styles.placeholder,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: theme.colors.accentSoft,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <Text style={[theme.text.h3, { color: theme.colors.primary }]}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 999,
  },
  placeholder: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
});
