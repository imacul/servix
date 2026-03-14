import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Screen } from "../components/ui/Screen";
import { useAppTheme } from "../theme/useAppTheme";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Logo } from "../components/ui/Logo";
import { useUser } from "../context/user";

export default function LoginScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const { setUser } = useUser();
  const [role, setRole] = useState<"client" | "artisan">("client");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleContinue = () => {
    const finalName = name.trim() || email.split("@")[0] || "Guest";
    setUser({ name: finalName, location: "Boston, MA", bookings: 4 });
    router.replace("/home");
  };

  const handleGuest = () => {
    setUser({ name: "Guest", location: "Boston, MA", bookings: 0 });
    router.replace("/home");
  };

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Logo size={56} />
      </View>

      <View style={styles.roles}>
        <RoleCard
          icon="people"
          title="Client"
          subtitle="Book, chat, and review"
          active={role === "client"}
          onPress={() => setRole("client")}
        />
        <RoleCard
          icon="briefcase"
          title="Artisan"
          subtitle="Grow your local business"
          active={role === "artisan"}
          onPress={() => setRole("artisan")}
        />
      </View>

      <Card style={styles.formCard}>
        <Text style={[theme.text.h2, { color: theme.colors.text }]}>Sign in</Text>
        <Input label="Full name" placeholder="Your name" value={name} onChangeText={setName} />
        <Input
          label="Email"
          placeholder="you@email.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          label="Password"
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.actions}>
          <Button label={role === "artisan" ? "Continue as Artisan" : "Continue"} onPress={handleContinue} />
          <Pressable onPress={() => Alert.alert("Password reset", "We sent a secure link to your email.")}
          >
            <Text style={[theme.text.caption, { color: theme.colors.primary }]}>Forgot password?</Text>
          </Pressable>
        </View>
      </Card>

      <View style={styles.footer}>
        <Text style={[theme.text.caption, { color: theme.colors.muted }]}>New here?</Text>
        <Button label="Browse as Guest" variant="ghost" onPress={handleGuest} />
      </View>
    </Screen>
  );
}

type RoleCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  active?: boolean;
  onPress?: () => void;
};

const RoleCard = ({ icon, title, subtitle, active, onPress }: RoleCardProps) => {
  const theme = useAppTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.roleCard,
        theme.shadows.soft,
        {
          backgroundColor: active ? theme.colors.primary : theme.colors.card,
          borderColor: active ? theme.colors.primary : theme.colors.border,
        },
      ]}
    >
      <Ionicons name={icon} size={20} color={active ? "#FFFFFF" : theme.colors.primary} />
      <View>
        <Text style={[theme.text.h3, { color: active ? "#FFFFFF" : theme.colors.text }]}>{title}</Text>
        <Text style={[theme.text.caption, { color: active ? "#EAF2FA" : theme.colors.muted }]}>{subtitle}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 20,
  },
  header: {
    alignItems: "flex-start",
  },
  roles: {
    flexDirection: "row",
    gap: 12,
  },
  roleCard: {
    flex: 1,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    gap: 6,
  },
  formCard: {
    gap: 14,
  },
  actions: {
    gap: 10,
  },
  footer: {
    alignItems: "center",
    gap: 6,
  },
});
