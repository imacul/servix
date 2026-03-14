import React, { useMemo, useState } from "react";
import { Alert, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { Screen } from "../components/ui/Screen";
import { useAppTheme } from "../theme/useAppTheme";
import { Card } from "../components/ui/Card";
import { Rating } from "../components/ui/Rating";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Button } from "../components/ui/Button";
import { faqs, gallery, reviews, rules, services, artisans } from "../data/mock";

type Review = typeof reviews[number];

const cloneReviews = (items: Review[], offset: number) => {
  return items.map((item, index) => ({
    ...item,
    id: `${item.id}-${offset + index}`,
  }));
};

export default function ArtisanProfile() {
  const theme = useAppTheme();
  const router = useRouter();
  const artisan = artisans[0];
  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id);
  const [reviewFeed, setReviewFeed] = useState<Review[]>(cloneReviews(reviews, 0));

  const initials = useMemo(() => {
    return artisan.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [artisan.name]);

  const loadMoreReviews = () => {
    if (reviewFeed.length >= 40) return;
    setReviewFeed((prev) => [...prev, ...cloneReviews(reviews, prev.length)]);
  };

  return (
    <Screen>
      <FlatList
        data={reviewFeed}
        keyExtractor={(item) => item.id}
        onEndReached={loadMoreReviews}
        onEndReachedThreshold={0.6}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <View style={styles.header}>
              <Pressable onPress={() => router.back()} style={styles.iconButton}>
                <Ionicons name="chevron-back" size={20} color={theme.colors.text} />
              </Pressable>
              <Text style={[theme.text.h2, { color: theme.colors.text }]}>Profile</Text>
              <Pressable
                style={styles.iconButton}
                onPress={() => Alert.alert("Share", "Profile link copied to clipboard.")}
              >
                <Ionicons name="share-outline" size={18} color={theme.colors.text} />
              </Pressable>
            </View>

            <Card style={styles.hero}>
              <View style={styles.heroHeader}>
                <View style={[styles.avatar, { backgroundColor: theme.colors.accentSoft }]}>
                  <Text style={[theme.text.h1, { color: theme.colors.primary }]}>{initials}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[theme.text.h2, { color: theme.colors.text }]}>{artisan.name}</Text>
                  <Text style={[theme.text.caption, { color: theme.colors.muted }]}>{artisan.role}</Text>
                  <Rating value={artisan.rating} count={artisan.reviews} />
                </View>
                <View style={[styles.priceTag, { backgroundColor: theme.colors.accentSoft }]}
                >
                  <Text style={[theme.text.caption, { color: theme.colors.primary }]}>{artisan.price}</Text>
                </View>
              </View>
              <View style={styles.heroMeta}>
                <MetaItem icon="location" label={artisan.location} />
                <MetaItem icon="shield-checkmark" label={artisan.badge} />
                <MetaItem icon="time" label="Same-day" />
              </View>
              <Text style={[theme.text.body, { color: theme.colors.muted }]}>
                Trusted organizer specializing in premium home resets, deep cleans, and weekly upkeep.
              </Text>
              <View style={styles.heroTags}>
                {artisan.tags.map((tag) => (
                  <View key={tag} style={[styles.tag, { borderColor: theme.colors.border }]}
                  >
                    <Text style={[theme.text.caption, { color: theme.colors.muted }]}>{tag}</Text>
                  </View>
                ))}
              </View>
            </Card>

            <SectionHeader
              title="Services"
              actionLabel="See pricing"
              onPress={() => Alert.alert("Services", "Full pricing list opened.")}
            />
            <View style={styles.serviceList}>
              {services.map((service) => {
                const selected = selectedServiceId === service.id;
                return (
                  <Pressable key={service.id} onPress={() => setSelectedServiceId(service.id)}>
                    <Card
                      style={[
                        styles.serviceCard,
                        selected && {
                          borderColor: theme.colors.primary,
                          backgroundColor: theme.colors.accentSoft,
                        },
                      ]}
                    >
                      <View style={styles.serviceInfo}>
                        <View style={styles.serviceRow}>
                          <Text
                            style={[theme.text.h3, styles.serviceTitle, { color: theme.colors.text }]}
                            numberOfLines={2}
                          >
                            {service.title}
                          </Text>
                          <Text style={[theme.text.h3, styles.servicePrice, { color: theme.colors.primary }]}
                          >
                            {service.price}
                          </Text>
                        </View>
                        <Text
                          style={[theme.text.caption, styles.serviceNote, { color: theme.colors.muted }]}
                          numberOfLines={2}
                        >
                          {service.duration} · {service.note}
                        </Text>
                      </View>
                    </Card>
                  </Pressable>
                );
              })}
            </View>

            <SectionHeader title="House rules" />
            <Card style={styles.rulesCard}>
              {rules.map((rule) => (
                <View key={rule} style={styles.ruleRow}>
                  <Ionicons name="checkmark-circle" size={18} color={theme.colors.success} />
                  <Text style={[theme.text.body, { color: theme.colors.text }]}>{rule}</Text>
                </View>
              ))}
            </Card>

            <SectionHeader
              title="Gallery"
              actionLabel="View all"
              onPress={() => Alert.alert("Gallery", "Opening gallery...")}
            />
            <FlatList
              horizontal
              data={gallery}
              keyExtractor={(item) => item}
              contentContainerStyle={styles.gallery}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={[styles.galleryItem, { borderColor: theme.colors.border }]}
                >
                  <Image source={{ uri: item }} style={styles.galleryImage} />
                </View>
              )}
            />

            <SectionHeader
              title="Reviews"
              actionLabel="See all"
              onPress={() => Alert.alert("Reviews", "Showing all reviews.")}
            />
          </View>
        }
        renderItem={({ item }) => (
          <Card style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={[theme.text.h3, { color: theme.colors.text }]}>{item.name}</Text>
              <Text style={[theme.text.caption, { color: theme.colors.muted }]}>{item.date}</Text>
            </View>
            <Rating value={item.rating} />
            <Text style={[theme.text.body, { color: theme.colors.muted }]}>{item.message}</Text>
          </Card>
        )}
        ListFooterComponent={
          <View style={styles.footerContent}>
            <SectionHeader title="FAQ" />
            <View style={styles.faqList}>
              {faqs.map((faq) => (
                <Card key={faq.id} style={styles.faqCard}>
                  <Text style={[theme.text.h3, { color: theme.colors.text }]}>{faq.q}</Text>
                  <Text style={[theme.text.body, { color: theme.colors.muted }]}>{faq.a}</Text>
                </Card>
              ))}
            </View>

            <View style={styles.bottomActions}>
              <Link href="/chat" asChild>
                <Button label="Chat" variant="secondary" />
              </Link>
              <Link href="/booking" asChild>
                <Button label="Book" />
              </Link>
            </View>
          </View>
        }
      />
    </Screen>
  );
}

const MetaItem = ({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) => {
  const theme = useAppTheme();
  return (
    <View style={[styles.metaItem, { borderColor: theme.colors.border }]}
    >
      <Ionicons name={icon} size={16} color={theme.colors.primary} />
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
  headerContent: {
    gap: 16,
  },
  footerContent: {
    gap: 16,
    marginTop: 12,
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
    gap: 12,
  },
  heroHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  priceTag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  heroMeta: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  heroTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  serviceList: {
    gap: 12,
  },
  serviceCard: {
    paddingVertical: 16,
  },
  serviceInfo: {
    gap: 8,
  },
  serviceRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  serviceTitle: {
    flex: 1,
  },
  servicePrice: {
    textAlign: "right",
  },
  serviceNote: {
    lineHeight: 18,
  },
  rulesCard: {
    gap: 12,
  },
  ruleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  gallery: {
    gap: 12,
  },
  galleryItem: {
    width: 160,
    height: 110,
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  galleryImage: {
    width: "100%",
    height: "100%",
  },
  reviewCard: {
    gap: 8,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  faqList: {
    gap: 12,
  },
  faqCard: {
    gap: 8,
  },
  bottomActions: {
    flexDirection: "row",
    gap: 12,
  },
});
