import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "../../theme/useAppTheme";
import { Button } from "./Button";

type EmptyStateProps = {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

export const EmptyState = ({ title, message, actionLabel, onAction }: EmptyStateProps) => {
  const theme = useAppTheme();

  return (
    <View style={[styles.container, { borderColor: theme.colors.border }]}
    >
      <Ionicons name="compass-outline" size={32} color={theme.colors.primary} />
      <Text style={[theme.text.h3, { color: theme.colors.text }]}>{title}</Text>
      <Text style={[theme.text.body, { color: theme.colors.muted, textAlign: "center" }]}>
        {message}
      </Text>
      {actionLabel ? <Button label={actionLabel} onPress={onAction} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    gap: 10,
    alignItems: "center",
  },
});
