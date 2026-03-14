import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { useAppTheme } from "../../theme/useAppTheme";

type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onPress?: () => void;
  actionHref?: string;
};

export const SectionHeader = ({ title, actionLabel, onPress, actionHref }: SectionHeaderProps) => {
  const theme = useAppTheme();

  const action = (
    <Pressable onPress={onPress} style={styles.action} hitSlop={8}>
      <Text style={[theme.text.caption, { color: theme.colors.primary }]}>{actionLabel}</Text>
    </Pressable>
  );

  return (
    <View style={styles.row}>
      <Text style={[theme.text.h2, { color: theme.colors.text }]}>{title}</Text>
      {actionLabel ? (actionHref ? <Link href={actionHref} asChild>{action}</Link> : action) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  action: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
});
