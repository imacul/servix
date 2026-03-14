import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "../../theme/useAppTheme";

type RatingProps = {
  value: number;
  count?: number;
};

export const Rating = ({ value, count }: RatingProps) => {
  const theme = useAppTheme();
  const stars = Array.from({ length: 5 }).map((_, index) => {
    const filled = index < Math.round(value);
    return (
      <Ionicons
        key={`star-${index}`}
        name={filled ? "star" : "star-outline"}
        size={14}
        color={filled ? theme.colors.warning : theme.colors.border}
      />
    );
  });

  return (
    <View style={styles.row}>
      <View style={styles.row}>{stars}</View>
      <Text style={[theme.text.caption, { color: theme.colors.muted }]}>
        {value.toFixed(1)}
        {count ? ` (${count})` : ""}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
