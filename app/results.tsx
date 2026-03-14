import React, { useMemo, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Screen } from "../components/ui/Screen";
import { useAppTheme } from "../theme/useAppTheme";
import { Chip } from "../components/ui/Chip";
import { Card } from "../components/ui/Card";
import { Rating } from "../components/ui/Rating";
import { EmptyState } from "../components/ui/EmptyState";
import { ErrorState } from "../components/ui/ErrorState";
import { Skeleton } from "../components/ui/Skeleton";
import { Avatar } from "../components/ui/Avatar";
import { artisans } from "../data/mock";

const filterOptions = ["Nearby", "4.7+", "$", "Available today", "Top rated"] as const;
const advancedOptions = ["Instant booking", "Eco-friendly", "Verified"] as const;

type ScreenState = "ready" | "loading" | "empty" | "error";

type FilterKey = (typeof filterOptions)[number];

type AdvancedKey = (typeof advancedOptions)[number];

const parseMiles = (value: string) => Number(value.replace(" mi", ""));
const parsePrice = (value: string) => Number(value.replace(/[^0-9.]/g, ""));

export default function ResultsScreen() {
  const theme = useAppTheme();
  const [activeFilters, setActiveFilters] = useState<FilterKey[]>(["Nearby"]);
  const [state, setState] = useState<ScreenState>("ready");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedKey[]>(["Instant booking"]);

  const filtered = useMemo(() => {
    return artisans.filter((artisan) => {
      return activeFilters.every((filter) => {
        if (filter === "Nearby") {
          return parseMiles(artisan.distance) <= 3;
        }
        if (filter === "4.7+") {
          return artisan.rating >= 4.7;
        }
        if (filter === "$") {
          return parsePrice(artisan.price) <= 55;
        }
        if (filter === "Available today") {
          return artisan.tags.some((tag) => tag.toLowerCase().includes("same"));
        }
        if (filter === "Top rated") {
          return artisan.rating >= 4.85;
        }
        return true;
      });
    });
  }, [activeFilters]);

  const handleFilterPress = (filter: FilterKey) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((item) => item !== filter) : [...prev, filter]
    );
  };

  const toggleAdvanced = (filter: AdvancedKey) => {
    setAdvancedFilters((prev) =>
      prev.includes(filter) ? prev.filter((item) => item !== filter) : [...prev, filter]
    );
  };

  const headerCount = state === "ready" ? filtered.length : artisans.length;

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={[theme.text.h1, { color: theme.colors.text }]}>Artisans</Text>
          <Text style={[theme.text.caption, { color: theme.colors.muted }]}>
            {headerCount} results near Boston
          </Text>
        </View>
        <Pressable
          style={[styles.filterButton, { borderColor: theme.colors.border }]}
          onPress={() => setShowAdvanced((prev) => !prev)}
        >
          <Ionicons name="options" size={16} color={theme.colors.primary} />
          <Text style={[theme.text.caption, { color: theme.colors.primary }]}>
            {showAdvanced ? "Hide filters" : "Filters"}
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={filterOptions}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
        renderItem={({ item }) => (
          <Chip label={item} active={activeFilters.includes(item)} onPress={() => handleFilterPress(item)} />
        )}
      />

      {showAdvanced ? (
        <Card style={styles.sortCard}>
          <View style={styles.filterGroup}>
            <Text style={[theme.text.caption, { color: theme.colors.muted }]}>Preferences</Text>
            <View style={styles.filterRow}>
              {advancedOptions.map((filter) => (
                <Chip
                  key={filter}
                  label={filter}
                  active={advancedFilters.includes(filter)}
                  onPress={() => toggleAdvanced(filter)}
                />
              ))}
            </View>
          </View>
          <View style={[styles.sortDivider, { backgroundColor: theme.colors.border }]} />
          <View style={styles.sortFooter}>
            <Pressable style={styles.sortItem} onPress={() => setState("ready")}
            >
              <Ionicons name="swap-vertical" size={16} color={theme.colors.primary} />
              <Text style={[theme.text.caption, { color: theme.colors.text }]}>Sort: Highest rated</Text>
            </Pressable>
            <View style={styles.sortActions}>
              <Pressable
                onPress={() => {
                  setState("loading");
                  setTimeout(() => setState("ready"), 700);
                }}
              >
                <Text style={[theme.text.caption, { color: theme.colors.muted }]}>Refresh</Text>
              </Pressable>
              <Pressable onPress={() => Alert.alert("Support", "We have logged your feedback.")}
              >
                <Text style={[theme.text.caption, { color: theme.colors.muted }]}>Support</Text>
              </Pressable>
            </View>
          </View>
        </Card>
      ) : (
        <Card style={styles.sortCard}>
          <Pressable style={styles.sortItem} onPress={() => setState("ready")}
          >
            <Ionicons name="swap-vertical" size={16} color={theme.colors.primary} />
            <Text style={[theme.text.caption, { color: theme.colors.text }]}>Sort: Highest rated</Text>
          </Pressable>
          <View style={styles.sortActions}>
            <Pressable
              onPress={() => {
                setState("loading");
                setTimeout(() => setState("ready"), 700);
              }}
            >
              <Text style={[theme.text.caption, { color: theme.colors.muted }]}>Refresh</Text>
            </Pressable>
            <Pressable onPress={() => Alert.alert("Support", "We have logged your feedback.")}
            >
              <Text style={[theme.text.caption, { color: theme.colors.muted }]}>Support</Text>
            </Pressable>
          </View>
        </Card>
      )}

      {state === "loading" ? (
        <View style={styles.loadingList}>
          {Array.from({ length: 4 }).map((_, index) => (
            <View
              key={`skeleton-${index}`}
              style={[styles.skeletonCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
            >
              <Skeleton height={18} width="60%" />
              <Skeleton height={12} width="40%" />
              <Skeleton height={12} width="80%" />
            </View>
          ))}
        </View>
      ) : null}

      {state === "empty" ? (
        <EmptyState
          title="No artisans found"
          message="Try expanding your distance or removing a filter."
          actionLabel="Clear filters"
          onAction={() => setActiveFilters([])}
        />
      ) : null}

      {state === "error" ? (
        <ErrorState
          title="Something went wrong"
          message="We could not load results right now. Please retry."
          actionLabel="Retry"
          onAction={() => setState("ready")}
        />
      ) : null}

      {state === "ready" ? (
        <View style={styles.list}>
          {filtered.length === 0 ? (
            <EmptyState
              title="No artisans found"
              message="Try expanding your distance or removing a filter."
              actionLabel="Clear filters"
              onAction={() => setActiveFilters([])}
            />
          ) : (
            filtered.map((artisan) => <ArtisanCard key={artisan.id} artisan={artisan} />)
          )}
        </View>
      ) : null}
    </Screen>
  );
}

type Artisan = typeof artisans[number];

const ArtisanCard = ({ artisan }: { artisan: Artisan }) => {
  const theme = useAppTheme();

  return (
    <Card style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderInfo}>
          <Avatar name={artisan.name} size={46} />
          <View style={styles.cardTextBlock}>
            <Text
              style={[theme.text.h3, { color: theme.colors.text }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {artisan.name}
            </Text>
            <Text
              style={[theme.text.caption, { color: theme.colors.muted }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {artisan.role}
            </Text>
            <View style={styles.metaRow}>
              <Rating value={artisan.rating} count={artisan.reviews} />
              <Text style={[theme.text.caption, { color: theme.colors.muted }]}>{artisan.distance}</Text>
            </View>
          </View>
        </View>
        <View style={styles.badges}>
          <View style={[styles.priceTag, { backgroundColor: theme.colors.accentSoft }]}>
            <Text style={[theme.text.caption, { color: theme.colors.primary }]}>{artisan.price}</Text>
          </View>
          <Text
            style={[theme.text.caption, styles.responseText, { color: theme.colors.muted }]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {artisan.responseTime}
          </Text>
        </View>
      </View>

      <View style={styles.tagRow}>
        {artisan.tags.map((tag) => (
          <View key={tag} style={[styles.tag, { borderColor: theme.colors.border }]}
          >
            <Text style={[theme.text.caption, { color: theme.colors.muted }]}>{tag}</Text>
          </View>
        ))}
        <View style={[styles.tag, { borderColor: theme.colors.border }]}
        >
          <Text style={[theme.text.caption, { color: theme.colors.muted }]}>{artisan.badge}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Link href="/artisan" asChild>
          <Pressable style={[styles.outline, { borderColor: theme.colors.border }]}
          >
            <Text style={[theme.text.caption, { color: theme.colors.primary }]}>View profile</Text>
          </Pressable>
        </Link>
        <Link href="/chat" asChild>
          <Pressable style={[styles.primary, { backgroundColor: theme.colors.primary }]}
          >
            <Text style={[theme.text.caption, { color: "#FFFFFF" }]}>Chat</Text>
          </Pressable>
        </Link>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  chips: {
    gap: 10,
  },
  sortCard: {
    paddingVertical: 12,
    gap: 10,
  },
  filterGroup: {
    gap: 8,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  sortDivider: {
    height: 1,
    opacity: 0.8,
  },
  sortFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  sortItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  sortActions: {
    flexDirection: "row",
    gap: 16,
  },
  loadingList: {
    gap: 16,
  },
  skeletonCard: {
    padding: 16,
    borderRadius: 18,
    gap: 10,
    borderWidth: 1,
  },
  list: {
    gap: 16,
  },
  card: {
    gap: 14,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  cardHeaderInfo: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
  },
  cardTextBlock: {
    flex: 1,
    minWidth: 0,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 30,
  },
  badges: {
    alignItems: "flex-end",
    gap: 6,
    maxWidth: 120,
  },
  responseText: {
    textAlign: "right",
    lineHeight: 16,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 6,
    paddingRight: 6,
  },
  priceTag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  tagRow: {
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
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  outline: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  primary: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 12,
  },
});
