import React, { useEffect, useMemo, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Screen } from "../components/ui/Screen";
import { useAppTheme } from "../theme/useAppTheme";
import { Card } from "../components/ui/Card";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Avatar } from "../components/ui/Avatar";
import { Rating } from "../components/ui/Rating";
import { Chip } from "../components/ui/Chip";
import { categories, artisans, locations } from "../data/mock";
import { useUser } from "../context/user";

const quickFilterOptions = ["Instant booking", "Eco friendly", "Available today", "Top pro"] as const;

type QuickFilter = (typeof quickFilterOptions)[number];

type Artisan = typeof artisans[number];

const cloneWithOffset = (items: Artisan[], offset: number) => {
  return items.map((item, index) => ({
    ...item,
    id: `${item.id}-${offset + index}`,
  }));
};

export default function HomeScreen() {
  const theme = useAppTheme();
  const { user } = useUser();
  const [query, setQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [showLocations, setShowLocations] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [quickFilters, setQuickFilters] = useState<QuickFilter[]>(["Instant booking"]);
  const [feed, setFeed] = useState<Artisan[]>([]);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return artisans.filter((artisan) => {
      const matchesQuery =
        q.length === 0 || artisan.name.toLowerCase().includes(q) || artisan.role.toLowerCase().includes(q);
      const matchesCategory = !activeCategory || artisan.role.toLowerCase().includes(activeCategory);
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  useEffect(() => {
    const base = filtered.length ? filtered : artisans;
    setFeed(cloneWithOffset(base.slice(0, 6), 0));
  }, [filtered]);

  const loadMore = () => {
    const base = filtered.length ? filtered : artisans;
    if (feed.length >= 40) return;
    setFeed((prev) => [...prev, ...cloneWithOffset(base, prev.length)]);
  };

  const toggleQuickFilter = (filter: QuickFilter) => {
    setQuickFilters((prev) =>
      prev.includes(filter) ? prev.filter((item) => item !== filter) : [...prev, filter]
    );
  };

  return (
    <Screen>
      <FlatList
        data={feed}
        keyExtractor={(item) => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.6}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <View style={styles.topRow}>
              <View>
                <Text style={[theme.text.caption, { color: theme.colors.muted }]}>{greeting}</Text>
                <Text style={[theme.text.h1, { color: theme.colors.text }]}>Find your artisan</Text>
                <Text style={[theme.text.caption, { color: theme.colors.muted }]}>
                  Welcome back, {user.name}
                </Text>
              </View>
              <Link href="/profile" asChild>
                <Pressable>
                  <Avatar name={user.name} size={40} />
                </Pressable>
              </Link>
            </View>

            <View
              style={[styles.searchWrap, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
            >
              <Ionicons name="search" size={18} color={theme.colors.muted} />
              <TextInput
                placeholder="Search plumbing, cleaning, beauty..."
                placeholderTextColor={theme.colors.muted}
                style={[styles.searchInput, theme.text.body, { color: theme.colors.text }]}
                value={query}
                onChangeText={setQuery}
              />
              <Pressable onPress={() => Alert.alert("Filters", "Advanced filters coming soon.")}
              >
                <Ionicons name="options" size={18} color={theme.colors.primary} />
              </Pressable>
            </View>

            <Card style={styles.locationCard}>
              <View style={styles.locationRow}>
                <View>
                  <Text style={[theme.text.caption, { color: theme.colors.muted }]}>Location</Text>
                  <Text style={[theme.text.h3, { color: theme.colors.text }]}>{selectedLocation}</Text>
                </View>
                <Pressable
                  style={[styles.locationButton, { borderColor: theme.colors.border }]}
                  onPress={() => setShowLocations((prev) => !prev)}
                >
                  <Ionicons name="navigate" size={16} color={theme.colors.primary} />
                  <Text style={[theme.text.caption, { color: theme.colors.primary }]}>Change</Text>
                </Pressable>
              </View>
              {showLocations ? (
                <View style={styles.locationList}>
                  {locations.map((location) => (
                    <Pressable
                      key={location}
                      style={[styles.locationItem, { borderColor: theme.colors.border }]}
                      onPress={() => {
                        setSelectedLocation(location);
                        setShowLocations(false);
                      }}
                    >
                      <Text style={[theme.text.body, { color: theme.colors.text }]}>{location}</Text>
                      {location === selectedLocation ? (
                        <Ionicons name="checkmark" size={16} color={theme.colors.primary} />
                      ) : null}
                    </Pressable>
                  ))}
                </View>
              ) : null}
            </Card>

            <SectionHeader
              title="Categories"
              actionLabel="View all"
              onPress={() => Alert.alert("Categories", "All categories loading...")}
            />
            <FlatList
              horizontal
              data={categories}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryList}
              renderItem={({ item }) => {
                const active = activeCategory === item.label.toLowerCase();
                return (
                  <Pressable
                    style={[
                      styles.categoryChip,
                      theme.shadows.soft,
                      {
                        backgroundColor: active ? theme.colors.primary : theme.colors.card,
                        borderColor: active ? theme.colors.primary : theme.colors.border,
                      },
                    ]}
                    onPress={() => setActiveCategory(active ? null : item.label.toLowerCase())}
                  >
                    <Ionicons
                      name={item.icon as keyof typeof Ionicons.glyphMap}
                      size={20}
                      color={active ? "#FFFFFF" : theme.colors.primary}
                    />
                    <Text style={[theme.text.caption, { color: active ? "#FFFFFF" : theme.colors.text }]}>
                      {item.label}
                    </Text>
                  </Pressable>
                );
              }}
            />

            <View style={styles.quickFilters}>
              {quickFilterOptions.map((filter) => (
                <Chip
                  key={filter}
                  label={filter}
                  active={quickFilters.includes(filter)}
                  onPress={() => toggleQuickFilter(filter)}
                />
              ))}
            </View>

            <SectionHeader
              title="Top rated near you"
              actionLabel="See all"
              onPress={() => Alert.alert("Top rated", "Showing top-rated professionals near you.")}
            />
            <Card style={styles.featuredCard}>
              <View style={styles.featuredHeader}>
                <Avatar name={artisans[0].name} size={52} />
                <View style={{ flex: 1 }}>
                  <Text style={[theme.text.h3, { color: theme.colors.text }]}>{artisans[0].name}</Text>
                  <Text style={[theme.text.caption, { color: theme.colors.muted }]}>{artisans[0].role}</Text>
                  <Rating value={artisans[0].rating} count={artisans[0].reviews} />
                </View>
                <View style={[styles.badge, { backgroundColor: theme.colors.accentSoft }]}
                >
                  <Text style={[theme.text.caption, { color: theme.colors.primary }]}>{artisans[0].price}</Text>
                </View>
              </View>
              <View style={styles.featuredActions}>
                <Link href="/results" asChild>
                  <Pressable style={[styles.outlineButton, { borderColor: theme.colors.border }]}
                  >
                    <Text style={[theme.text.caption, { color: theme.colors.primary }]}>View results</Text>
                  </Pressable>
                </Link>
                <Link href="/artisan" asChild>
                  <Pressable style={[styles.outlineButton, { borderColor: theme.colors.primary }]}
                  >
                    <Text style={[theme.text.caption, { color: theme.colors.primary }]}>Profile</Text>
                  </Pressable>
                </Link>
              </View>
            </Card>

            <SectionHeader
              title="Recommended for you"
              actionLabel="See all"
              onPress={() => Alert.alert("Recommendations", "Personalized matches based on your history.")}
            />
          </View>
        }
        renderItem={({ item }) => (
          <Card style={styles.recommendCard}>
            <View style={styles.recommendHeader}>
              <Avatar name={item.name} size={48} />
              <View style={{ flex: 1 }}>
                <Text style={[theme.text.h3, { color: theme.colors.text }]}>{item.name}</Text>
                <Text style={[theme.text.caption, { color: theme.colors.muted }]}>{item.role}</Text>
                <Rating value={item.rating} count={item.reviews} />
              </View>
            </View>
            <View style={styles.recommendMeta}>
              <View style={[styles.tag, { borderColor: theme.colors.border }]}
              >
                <Text style={[theme.text.caption, { color: theme.colors.muted }]}>{item.distance}</Text>
              </View>
              <View style={[styles.tag, { borderColor: theme.colors.border }]}
              >
                <Text style={[theme.text.caption, { color: theme.colors.muted }]}>{item.location}</Text>
              </View>
              <View style={[styles.tag, { borderColor: theme.colors.border }]}
              >
                <Text style={[theme.text.caption, { color: theme.colors.muted }]}>{item.badge}</Text>
              </View>
            </View>
            <View style={styles.recommendActions}>
              <Link href="/artisan" asChild>
                <Pressable style={[styles.outlineButton, { borderColor: theme.colors.border }]}
                >
                  <Text style={[theme.text.caption, { color: theme.colors.primary }]}>View profile</Text>
                </Pressable>
              </Link>
              <Link href="/chat" asChild>
                <Pressable style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]}
                >
                  <Text style={[theme.text.caption, { color: "#FFFFFF" }]}>Chat</Text>
                </Pressable>
              </Link>
            </View>
          </Card>
        )}
        ListFooterComponent={<View style={styles.listFooter} />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 30,
    gap: 18,
  },
  headerContent: {
    gap: 18,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
  },
  locationCard: {
    padding: 16,
    gap: 12,
  },
  locationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  locationList: {
    gap: 8,
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  categoryList: {
    gap: 12,
    paddingVertical: 6,
  },
  categoryChip: {
    width: 120,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    gap: 8,
  },
  quickFilters: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  featuredCard: {
    gap: 14,
  },
  featuredHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  featuredActions: {
    flexDirection: "row",
    gap: 10,
  },
  recommendCard: {
    gap: 12,
    marginBottom: 14,
  },
  recommendHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  recommendMeta: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  recommendActions: {
    flexDirection: "row",
    gap: 10,
  },
  outlineButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  primaryButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 12,
  },
  listFooter: {
    height: 24,
  },
});
