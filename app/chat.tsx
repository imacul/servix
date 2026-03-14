import React, { useMemo, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Screen } from "../components/ui/Screen";
import { useAppTheme } from "../theme/useAppTheme";
import { chatMessages } from "../data/mock";

const ANDROID_KEYBOARD_OFFSET = 24;

export default function ChatScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const [messages, setMessages] = useState(chatMessages);
  const [text, setText] = useState("");
  const listRef = useRef<FlatList>(null);

  const initials = useMemo(() => "ML", []);

  const handleSend = () => {
    if (!text.trim()) {
      return;
    }
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    setMessages((prev) => [
      ...prev,
      { id: `m-${prev.length + 1}`, text: text.trim(), fromMe: true, time },
    ]);
    setText("");
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : ANDROID_KEYBOARD_OFFSET}
      >
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.iconButton}>
            <Ionicons name="chevron-back" size={20} color={theme.colors.text} />
          </Pressable>
          <View style={styles.headerInfo}>
            <View style={[styles.avatar, { backgroundColor: theme.colors.accentSoft }]}>
              <Text style={[theme.text.h3, { color: theme.colors.primary }]}>{initials}</Text>
            </View>
            <View>
              <Text style={[theme.text.h3, { color: theme.colors.text }]}>Marina Lopez</Text>
              <Text style={[theme.text.caption, { color: theme.colors.muted }]}>Online now</Text>
            </View>
          </View>
          <Pressable style={styles.iconButton} onPress={() => Alert.alert("Call", "Calling Marina...")}
          >
            <Ionicons name="call" size={18} color={theme.colors.primary} />
          </Pressable>
        </View>

        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => <Bubble message={item} />}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
          keyboardDismissMode="on-drag"
        />

        <View style={[styles.inputBar, { borderColor: theme.colors.border, backgroundColor: theme.colors.card }]}
        >
          <Pressable
            style={styles.attachButton}
            onPress={() => Alert.alert("Attachment", "Choose a file or photo")}
          >
            <Ionicons name="attach" size={18} color={theme.colors.primary} />
          </Pressable>
          <TextInput
            placeholder="Write a message..."
            placeholderTextColor={theme.colors.muted}
            style={[styles.input, theme.text.body, { color: theme.colors.text }]}
            value={text}
            onChangeText={setText}
            onFocus={() => setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50)}
          />
          <Pressable style={[styles.sendButton, { backgroundColor: theme.colors.primary }]} onPress={handleSend}
          >
            <Ionicons name="send" size={16} color="#FFFFFF" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

type Message = typeof chatMessages[number];

const Bubble = ({ message }: { message: Message }) => {
  const theme = useAppTheme();
  const fromMe = message.fromMe;

  return (
    <View style={[styles.bubbleRow, { justifyContent: fromMe ? "flex-end" : "flex-start" }]}
    >
      <View
        style={[
          styles.bubble,
          {
            backgroundColor: fromMe ? theme.colors.primary : theme.colors.card,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <Text style={[theme.text.body, { color: fromMe ? "#FFFFFF" : theme.colors.text }]}>
          {message.text}
        </Text>
        <Text
          style={[
            theme.text.caption,
            { color: fromMe ? "#E6F2FF" : theme.colors.muted, marginTop: 6 },
          ]}
        >
          {message.time}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    paddingVertical: 10,
    gap: 12,
  },
  bubbleRow: {
    flexDirection: "row",
  },
  bubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    marginBottom: 16,
  },
  attachButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
