import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Screen } from "../components/ui/Screen";
import { useAppTheme } from "../theme/useAppTheme";
import { Card } from "../components/ui/Card";
import { Avatar } from "../components/ui/Avatar";
import { Rating } from "../components/ui/Rating";
import { artisans } from "../data/mock";

const upcoming = artisans.slice(0, 6);
const past = artisans.slice(6, 10);

export default function BookingsScreen() {
  const theme = useAppTheme();
  const router = useRouter();

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="chevron-back" size={20} color={theme.colors.text} />
        </Pressable>
        <Text style={[theme.text.h2, { color: theme.colors.text }]}>Bookings</Text>
        <View style={styles.iconButton} />
      </View>

      <Text style={[theme.text.h3, { color: theme.colors.text }]}>Upcoming</Text>
      <FlatList
        data={upcoming}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card style={styles.bookingCard}>
            <View style={styles.bookingRow}>
              <Avatar name={item.name} size={44} />
              <View style={{ flex: 1 }}>
                <Text style={[theme.text.h3, { color: theme.colors.text }]}>{item.name}</Text>
                <Text style={[theme.text.caption, { color: theme.colors.muted }]}>{item.role}</Text>
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
        )}
      />

      <Text style={[theme.text.h3, { color: theme.colors.text }]}>Past</Text>
      <FlatList
        data={past}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card style={styles.bookingCard}>
            <View style={styles.bookingRow}>
              <Avatar name={item.name} size={44} />
              <View style={{ flex: 1 }}>
                <Text style={[theme.text.h3, { color: theme.colors.text }]}>{item.name}</Text>
                <Text style={[theme.text.caption, { color: theme.colors.muted }]}>{item.role}</Text>
                <View style={styles.metaRow}>
                  <Rating value={item.rating} count={item.reviews} />
                </View>
              </View>
              <View style={[styles.badge, { backgroundColor: theme.colors.accentSoft }]}>
                <Text style={[theme.text.caption, { color: theme.colors.primary }]}>Completed</Text>
              </View>
            </View>
          </Card>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 30,
    gap: 14,
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
});
