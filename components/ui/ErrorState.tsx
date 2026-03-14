import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "../../theme/useAppTheme";
import { Button } from "./Button";

type ErrorStateProps = {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

export const ErrorState = ({ title, message, actionLabel, onAction }: ErrorStateProps) => {
  const theme = useAppTheme();

  return (
    <View style={[styles.container, { borderColor: theme.colors.border }]}
    >
      <Ionicons name="alert-circle-outline" size={32} color={theme.colors.danger} />
      <Text style={[theme.text.h3, { color: theme.colors.text }]}>{title}</Text>
      <Text style={[theme.text.body, { color: theme.colors.muted, textAlign: "center" }]}>
        {message}
      </Text>
      {actionLabel ? (
        <Button label={actionLabel} onPress={onAction} variant="secondary" />
      ) : null}
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
