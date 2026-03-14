import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { useAppTheme } from "../../theme/useAppTheme";

type CardProps = {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
};

export const Card = ({ children, style }: CardProps) => {
  const theme = useAppTheme();
  return (
    <View
      style={[
        styles.base,
        theme.shadows.soft,
        { backgroundColor: theme.colors.card, borderColor: theme.colors.border },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
  },
});
