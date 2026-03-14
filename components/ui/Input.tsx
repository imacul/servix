import React from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { useAppTheme } from "../../theme/useAppTheme";

type InputProps = TextInputProps & {
  label?: string;
  hint?: string;
};

export const Input = ({ label, hint, style, ...props }: InputProps) => {
  const theme = useAppTheme();

  return (
    <View style={styles.container}>
      {label ? (
        <Text style={[styles.label, theme.text.caption, { color: theme.colors.muted }]}>{label}</Text>
      ) : null}
      <TextInput
        placeholderTextColor={theme.colors.muted}
        style={[
          styles.input,
          theme.text.body,
          {
            color: theme.colors.text,
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
          },
          style,
        ]}
        {...props}
      />
      {hint ? (
        <Text style={[styles.hint, theme.text.caption, { color: theme.colors.muted }]}>{hint}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    letterSpacing: 0.2,
  },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  hint: {
    marginTop: 2,
  },
});
