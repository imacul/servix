import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { useAppTheme } from "../../theme/useAppTheme";

type SkeletonProps = {
  height?: number;
  width?: number | string;
  radius?: number;
  style?: ViewStyle | ViewStyle[];
};

export const Skeleton = ({ height = 12, width = "100%", radius = 10, style }: SkeletonProps) => {
  const theme = useAppTheme();
  return (
    <View
      style={[
        styles.base,
        {
          height,
          width,
          borderRadius: radius,
          backgroundColor: theme.isDark ? "#18222E" : "#E8EDF3",
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    overflow: "hidden",
  },
});
