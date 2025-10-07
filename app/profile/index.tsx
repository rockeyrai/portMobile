import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import {
  User,
  Lock,
  Key,
  IdCardLanyard,
  ChevronRight,
} from "lucide-react-native";
import { useThemeColors } from "@/context/ThemeContext";
import Slicecard from "@/components/custom/Slicecard";

interface Section {
  id: string;
  title: string;
  icon: any;
  items: { label: string; value: string }[];
}

export default function ProfilePage() {
  const mobileTheme = useThemeColors();

  const sections: Section[] = [
    {
      id: "basic_info",
      title: "My Information",
      icon: User,
      items: [
        { label: "Work Account", value: "john.work@company.com" },
        { label: "Secondary Email", value: "j.doe@personal.com" },
        { label: "Business Profile", value: "JD Consulting" },
        { label: "Linked Accounts", value: "2 connected" },
      ],
    },
  ];

  return (
    <ScrollView
      style={[styles.root, { backgroundColor: mobileTheme.secondBackground }]}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Header */}
      <View style={[styles.header]}>
        <View style={styles.headerTop}>
          <Text style={[styles.headerTitle, { color: mobileTheme.text }]}>
            Profile
          </Text>
        </View>

        {/* Profile Picture and Name */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <View
              style={[
                styles.avatar,
                { backgroundColor: mobileTheme.secondary },
              ]}
            >
              <User size={48} color={mobileTheme.cardBackground} />
            </View>
          </View>
          <Text style={[styles.name, { color: mobileTheme.text }]}>
            John Doe
          </Text>
          <Text style={[styles.member, { color: mobileTheme.secondaryText }]}>
            Premium Member
          </Text>
        </View>
      </View>

      {/* Sections Container */}
      <View style={{ marginTop: 0, paddingHorizontal: 0 }}>
        {/* Basic Information */}
        <View
          style={[
            // styles.card,
            {
              backgroundColor: mobileTheme.card,
              shadowColor: mobileTheme.shadow,
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: mobileTheme.text }]}>
            Basic Information
          </Text>
          <Slicecard sections={sections} />
          <TouchableOpacity
            style={[
              styles.itemButton,
              { backgroundColor: mobileTheme.cardBackground },
            ]}
          >
            <View
              style={[styles.iconContainer, { backgroundColor: "#6366F1" }]}
            >
              <IdCardLanyard size={24} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.itemTitle, { color: mobileTheme.text }]}>
                My Subscription{" "}
              </Text>
              <Text
                style={[
                  styles.itemDescription,
                  { color: mobileTheme.secondaryText },
                ]}
              >
                Manage your subscription plan{" "}
              </Text>
            </View>
            <ChevronRight size={20} color={mobileTheme.muted} />
          </TouchableOpacity>
        </View>

        {/* Security Settings */}
        <View
          style={[
            // styles.card,
            {
              backgroundColor: mobileTheme.card,
              shadowColor: mobileTheme.shadow,
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: mobileTheme.text }]}>
            Security Settings
          </Text>

          {[
            {
              id: "security",
              title: "Password & Security",
              desc: "Manage your password and 2FA",
              icon: Lock,
              color: "#A855F7",
            },
            {
              id: "sessions",
              title: "Active Sessions",
              desc: "View and manage your devices",
              icon: Key,
              color: "#10B981",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.itemButton,
                  { backgroundColor: mobileTheme.cardBackground },
                ]}
              >
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: item.color },
                  ]}
                >
                  <Icon size={24} color="#fff" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.itemTitle, { color: mobileTheme.text }]}>
                    {item.title}
                  </Text>
                  <Text
                    style={[
                      styles.itemDescription,
                      { color: mobileTheme.secondaryText },
                    ]}
                  >
                    {item.desc}
                  </Text>
                </View>
                <ChevronRight size={20} color={mobileTheme.muted} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerTitle: { fontSize: 22, fontWeight: "bold" },
  profileSection: { alignItems: "center" },
  avatarWrapper: { position: "relative" },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },

  name: { fontSize: 20, fontWeight: "bold", marginTop: 12 },
  member: { fontSize: 13, marginTop: 2 },
  card: {
    borderRadius: 16,
    padding: 16,
    // marginBottom: 16,
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionTitle: { fontSize: 15, fontWeight: "600", marginBottom: 8 },
  itemButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 12,
    marginTop: 6,
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  itemTitle: { fontSize: 14, fontWeight: "600" },
  itemDescription: { fontSize: 12, marginTop: 2 },
  expandHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  expandHeaderLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  iconContainerSmall: {
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 0,
  },
  expandTitle: { fontSize: 15, fontWeight: "600" },
  expandContent: { borderTopWidth: 1, marginTop: 4, paddingTop: 8 },
  expandRow: { paddingVertical: 8 },
  expandRowText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  expandLabel: { fontSize: 13 },
  expandValue: { fontSize: 13, fontWeight: "500" },
  divider: { height: 1, marginTop: 8 },
  logoutBtn: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  logoutText: { fontWeight: "600" },
});
