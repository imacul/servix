import React, { useMemo, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Screen } from "../components/ui/Screen";
import { useAppTheme } from "../theme/useAppTheme";
import { Card } from "../components/ui/Card";
import { Chip } from "../components/ui/Chip";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { dates, timeSlots, services, artisans } from "../data/mock";

export default function BookingScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(dates[1]);
  const [selectedTime, setSelectedTime] = useState(timeSlots[2]);
  const [notes, setNotes] = useState("");
  const [tip, setTip] = useState(12);
  const [paymentMethod, setPaymentMethod] = useState("Visa •••• 2241");
  const service = services[0];
  const artisan = artisans[0];

  const base = useMemo(() => Number(service.price.replace(/[^0-9.]/g, "")), [service.price]);
  const protection = 12;
  const total = base + protection + tip;

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="chevron-back" size={20} color={theme.colors.text} />
        </Pressable>
        <Text style={[theme.text.h2, { color: theme.colors.text }]}>Booking</Text>
        <View style={styles.iconButton} />
      </View>

      <Card style={styles.summaryCard}>
        <Text style={[theme.text.h3, { color: theme.colors.text }]}>{artisan.name}</Text>
        <Text style={[theme.text.caption, { color: theme.colors.muted }]}>{service.title} · {service.price}</Text>
        <View style={styles.summaryRow}>
          <Ionicons name="location" size={16} color={theme.colors.primary} />
          <Text style={[theme.text.caption, { color: theme.colors.muted }]}>Brookline, MA</Text>
        </View>
      </Card>

      <View style={styles.section}>
        <Text style={[theme.text.h3, { color: theme.colors.text }]}>Pick a date</Text>
        <View style={styles.chipsRow}>
          {dates.map((date) => (
            <Chip key={date} label={date} active={date === selectedDate} onPress={() => setSelectedDate(date)} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[theme.text.h3, { color: theme.colors.text }]}>Pick a time</Text>
        <View style={styles.chipsRow}>
          {timeSlots.map((slot) => (
            <Chip key={slot} label={slot} active={slot === selectedTime} onPress={() => setSelectedTime(slot)} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[theme.text.h3, { color: theme.colors.text }]}>Notes</Text>
        <Input
          placeholder="Share any details (pets, parking, supplies)..."
          multiline
          numberOfLines={4}
          value={notes}
          onChangeText={setNotes}
          style={{ height: 90, textAlignVertical: "top" }}
        />
      </View>

      <Card style={styles.paymentCard}>
        <View style={styles.paymentRow}>
          <View>
            <Text style={[theme.text.caption, { color: theme.colors.muted }]}>Payment method</Text>
            <Text style={[theme.text.h3, { color: theme.colors.text }]}>{paymentMethod}</Text>
          </View>
          <Pressable onPress={() => setPaymentMethod("Mastercard •••• 1180")}>
            <Text style={[theme.text.caption, { color: theme.colors.primary }]}>Change</Text>
          </Pressable>
        </View>
        <View style={styles.tipRow}>
          <Text style={[theme.text.caption, { color: theme.colors.muted }]}>Add a tip</Text>
          <View style={styles.tipChips}>
            {[0, 8, 12, 18].map((value) => (
              <Chip key={value} label={value === 0 ? "No tip" : `$${value}`} active={tip === value} onPress={() => setTip(value)} />
            ))}
          </View>
        </View>
      </Card>

      <Card style={styles.totalCard}>
        <View style={styles.totalRow}>
          <Text style={[theme.text.body, { color: theme.colors.muted }]}>Service fee</Text>
          <Text style={[theme.text.body, { color: theme.colors.text }]}>${base}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={[theme.text.body, { color: theme.colors.muted }]}>Booking protection</Text>
          <Text style={[theme.text.body, { color: theme.colors.text }]}>${protection}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={[theme.text.body, { color: theme.colors.muted }]}>Tip</Text>
          <Text style={[theme.text.body, { color: theme.colors.text }]}>${tip}</Text>
        </View>
        <View style={[styles.totalDivider, { backgroundColor: theme.colors.border }]} />
        <View style={styles.totalRow}>
          <Text style={[theme.text.h3, { color: theme.colors.text }]}>Total</Text>
          <Text style={[theme.text.h3, { color: theme.colors.text }]}>${total}</Text>
        </View>
      </Card>

      <Button
        label="Confirm booking"
        onPress={() =>
          Alert.alert(
            "Booking confirmed",
            `${artisan.name} is reserved for ${selectedDate} at ${selectedTime}.`
          )
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    paddingTop: 12,
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
  summaryCard: {
    gap: 6,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  section: {
    gap: 10,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  paymentCard: {
    gap: 12,
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tipRow: {
    gap: 8,
  },
  tipChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  totalCard: {
    gap: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalDivider: {
    height: 1,
  },
});
