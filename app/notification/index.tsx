import React, { useState } from 'react';
import { Bell, TrendingUp, AlertCircle, Building2 } from 'lucide-react-native';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useThemeColors } from '@/context/ThemeContext';

type TabType = 'All' | 'NEPSE' | 'Urgent' | 'Company';

interface Notification {
  id: string;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  time: string;
  day: string;
  unread?: boolean;
}

const NotificationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('All');

  const tabs: TabType[] = ['All', 'NEPSE', 'Urgent', 'Company'];
  const  colors  = useThemeColors(); 
  const notifications: Record<TabType, Notification[]> = {
    All: [
      {
        id: '1',
        icon: <TrendingUp className="w-5 h-5 text-green-600" />,
        iconBg: 'bg-green-100',
        title: 'Market Update',
        description: 'NEPSE index increased by 2.4% today closing at 2,145.67 points',
        time: '10:30 AM',
        day: 'Today',
        unread: true,
      },
      {
        id: '2',
        icon: <Building2 className="w-5 h-5 text-blue-600" />,
        iconBg: 'bg-blue-100',
        title: 'Company Announcement',
        description: 'NABIL Bank has announced dividend of 20% for FY 2024/25',
        time: '9:15 AM',
        day: 'Today',
        unread: true,
      },
      {
        id: '3',
        icon: <AlertCircle className="w-5 h-5 text-orange-600" />,
        iconBg: 'bg-orange-100',
        title: 'Price Alert',
        description: 'Your watchlist stock NMB Bank has crossed Rs. 350',
        time: '8:45 AM',
        day: 'Today',
      },
      {
        id: '4',
        icon: <Bell className="w-5 h-5 text-purple-600" />,
        iconBg: 'bg-purple-100',
        title: 'Trading Reminder',
        description: 'Market opens in 30 minutes. Review your portfolio before trading',
        time: '10:30 PM',
        day: 'Yesterday',
      },
    ],
    NEPSE: [
      {
        id: '5',
        icon: <TrendingUp className="w-5 h-5 text-green-600" />,
        iconBg: 'bg-green-100',
        title: 'Market Update',
        description: 'NEPSE index increased by 2.4% today closing at 2,145.67 points',
        time: '10:30 AM',
        day: 'Today',
        unread: true,
      },
      {
        id: '6',
        icon: <TrendingUp className="w-5 h-5 text-red-600" />,
        iconBg: 'bg-red-100',
        title: 'Market Closure',
        description: 'NEPSE ended the week with a decline of 1.8%',
        time: '3:00 PM',
        day: 'Yesterday',
      },
    ],
    Urgent: [
      {
        id: '7',
        icon: <AlertCircle className="w-5 h-5 text-orange-600" />,
        iconBg: 'bg-orange-100',
        title: 'Price Alert',
        description: 'Your watchlist stock NMB Bank has crossed Rs. 350',
        time: '8:45 AM',
        day: 'Today',
        unread: true,
      },
      {
        id: '8',
        icon: <AlertCircle className="w-5 h-5 text-red-600" />,
        iconBg: 'bg-red-100',
        title: 'Circuit Breaker',
        description: 'Trading halted for HIDCL due to circuit breaker activation',
        time: '11:20 AM',
        day: 'Yesterday',
      },
    ],
    Company: [
      {
        id: '9',
        icon: <Building2 className="w-5 h-5 text-blue-600" />,
        iconBg: 'bg-blue-100',
        title: 'Company Announcement',
        description: 'NABIL Bank has announced dividend of 20% for FY 2024/25',
        time: '9:15 AM',
        day: 'Today',
        unread: true,
      },
      {
        id: '10',
        icon: <Building2 className="w-5 h-5 text-indigo-600" />,
        iconBg: 'bg-indigo-100',
        title: 'AGM Notice',
        description: 'Sanima Bank AGM scheduled for 15th November 2024',
        time: '2:30 PM',
        day: 'Yesterday',
      },
    ],
  };

  return (  <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, {  shadowColor: colors.shadow }]}>
        <View style={styles.headerTop}>
          <Text style={[styles.title, { color: colors.text }]}>Notifications</Text>
          <TouchableOpacity>
            <Text style={[styles.markAll, { color: colors.accent }]}>Mark all read</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tab,
                {
                  backgroundColor: activeTab === tab ? colors.accent : colors.card,
                },
              ]}
            >
              <Text
                style={{
                  color: activeTab === tab ? colors.card : colors.text,
                  fontWeight: "500",
                }}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Notifications List */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {notifications[activeTab].length > 0 ? (
          notifications[activeTab].map((notification) => (
            <View
              key={notification.id}
              style={[
                styles.notificationCard,
                {
                  backgroundColor: notification.unread ? colors.accent + "20" : colors.card,
                  borderColor: notification.unread ? colors.accent + "40" : colors.border,
                },
              ]}
            >
              <View style={styles.notificationContent}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: notification.iconBg || colors.primary },
                  ]}
                >
                  {notification.icon}
                </View>

                <View style={{ flex: 1, minWidth: 0 }}>
                  <View style={styles.notificationHeader}>
                    <Text style={[styles.notificationTitle, { color: colors.text }]}>
                      {notification.title}
                      {notification.unread && (
                        <View
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: colors.accent,
                            marginLeft: 4,
                          }}
                        />
                      )}
                    </Text>
                  </View>
                  <Text style={[styles.notificationDescription, { color: colors.secondaryText }]}>
                    {notification.description}
                  </Text>
                  <View style={styles.notificationMeta}>
                    <Text style={{ color: colors.secondaryText, fontSize: 12 }}>{notification.day}</Text>
                    <Text style={{ color: colors.secondaryText, fontSize: 12 }}>•</Text>
                    <Text style={{ color: colors.secondaryText, fontSize: 12 }}>{notification.time}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Bell size={64} color={colors.muted} />
            <Text style={{ color: colors.secondaryText, marginTop: 8 }}>No notifications</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: { fontSize: 20, fontWeight: "bold" },
  markAll: { fontSize: 14 },
  tabsContainer: { flexDirection: "row", gap: 8 },
  tab: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 999, marginRight: 8 },
  listContainer: { padding: 16, gap: 6 },
  notificationCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 6,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  notificationContent: { flexDirection: "row", gap: 12 },
  iconContainer: { width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center" },
  notificationHeader: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  notificationTitle: { fontSize: 14, fontWeight: "600" },
  notificationDescription: { fontSize: 12, lineHeight: 16, marginBottom: 4 },
  notificationMeta: { flexDirection: "row", gap: 4 },
  emptyContainer: { alignItems: "center", marginTop: 48 },
});

export default NotificationPage;