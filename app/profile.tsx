import React from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { Screen } from "../components/ui/Screen";
import { useAppTheme } from "../theme/useAppTheme";
import { Card } from "../components/ui/Card";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Avatar } from "../components/ui/Avatar";
import { Rating } from "../components/ui/Rating";
import { Button } from "../components/ui/Button";
import { artisans } from "../data/mock";
import { useUser } from "../context/user";

export default function ProfileScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const { user } = useUser();
  const favorites = artisans.slice(0, 4);
  const upcoming = artisans.slice(4, 7);

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="chevron-back" size={20} color={theme.colors.text} />
        </Pressable>
        <Text style={[theme.text.h2, { color: theme.colors.text }]}>Profile</Text>
        <Pressable
          style={styles.iconButton}
          onPress={() => Alert.alert("Settings", "Profile settings coming soon.")}
        >
          <Ionicons name="settings-outline" size={18} color={theme.colors.text} />
        </Pressable>
      </View>

      <Card style={styles.hero}>
        <View style={styles.heroRow}>
          <Avatar name={user.name} size={68} />
          <View style={{ flex: 1 }}>
            <Text style={[theme.text.h2, { color: theme.colors.text }]}>{user.name}</Text>
            <Text style={[theme.text.caption, { color: theme.colors.muted }]}>
              {user.location} · {user.bookings} bookings
            </Text>
            <View style={styles.heroActions}>
              <Button
                label="Edit profile"
                variant="secondary"
                onPress={() => Alert.alert("Edit profile", "Profile editor coming soon.")}
              />
              <Button
                label="Verify"
                onPress={() => Alert.alert("Verification", "We sent a verification link to your email.")}
              />
            </View>
          </View>
        </View>
        <View style={styles.statsRow}>
          <Stat label="Spent" value="$1,240" />
          <Stat label="Saved" value="$180" />
          <Stat label="Rating" value="4.9" />
        </View>
      </Card>

      <SectionHeader title="Upcoming bookings" actionLabel="See all" actionHref="/bookings" />
      <View style={styles.list}>
        {upcoming.map((artisan) => (
          <Card key={artisan.id} style={styles.bookingCard}>
            <View style={styles.bookingRow}>
              <Avatar name={artisan.name} size={44} />
              <View style={{ flex: 1 }}>
                <Text style={[theme.text.h3, { color: theme.colors.text }]}>{artisan.name}</Text>
                <Text style={[theme.text.caption, { color: theme.colors.muted }]}>{artisan.role}</Text>
                <View style={styles.metaRow}>
                  <Ionicons name="calendar" size={14} color={theme.colors.primary} />
                  <Text style={[theme.text.caption, { color: theme.colors.muted }]}>Tue · 2:00 PM</Text>
                </View>
              </View>
              <View style={[styles.badge, { backgroundColor: theme.colors.accentSoft }]}>
                <Text style={[theme.text.caption, { color: theme.colors.primary }]}>$120</Text>
              </View>
            </View>
          </Card>
        ))}
      </View>

      <SectionHeader title="Saved pros" actionLabel="View all" actionHref="/bookings" />
      <FlatList
        horizontal
        data={favorites}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.favorites}
        renderItem={({ item }) => (
          <Card style={styles.favoriteCard}>
            <Avatar name={item.name} size={50} />
            <Text style={[theme.text.h3, styles.favoriteName, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={[theme.text.caption, { color: theme.colors.muted }]}>{item.role}</Text>
            <Rating value={item.rating} count={item.reviews} />
            <Link href="/artisan" asChild>
              <Pressable style={[styles.outlineButton, { borderColor: theme.colors.border }]}
              >
                <Text style={[theme.text.caption, { color: theme.colors.primary }]}>View</Text>
              </Pressable>
            </Link>
          </Card>
        )}
      />

      <SectionHeader title="Preferences" actionLabel="Manage" actionHref="/bookings" />
      <Card style={styles.prefCard}>
        {[
          "Notifications enabled",
          "Eco-friendly pros only",
          "Save receipts automatically",
        ].map((item) => (
          <View key={item} style={styles.prefRow}>
            <Ionicons name="checkmark-circle" size={18} color={theme.colors.success} />
            <Text style={[theme.text.body, { color: theme.colors.text }]}>{item}</Text>
          </View>
        ))}
      </Card>
    </Screen>
  );
}

const Stat = ({ label, value }: { label: string; value: string }) => {
  const theme = useAppTheme();
  return (
    <View style={styles.stat}>
      <Text style={[theme.text.h2, { color: theme.colors.text }]}>{value}</Text>
      <Text style={[theme.text.caption, { color: theme.colors.muted }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 30,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  hero: {
    gap: 16,
  },
  heroRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  heroActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stat: {
    alignItems: "center",
  },
  list: {
    gap: 12,
  },
  bookingCard: {
    gap: 10,
  },
  bookingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  favorites: {
    gap: 12,
    paddingVertical: 4,
  },
  favoriteCard: {
    width: 170,
    gap: 8,
    alignItems: "flex-start",
  },
  favoriteName: {
    marginTop: 6,
  },
  outlineButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  prefCard: {
    gap: 12,
  },
  prefRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
