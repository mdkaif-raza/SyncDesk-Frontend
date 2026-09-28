import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  NotificationHeader,
  NotificationFilter,
  NotificationItem,
} from '../../components/notifications';
import { BottomNavigation } from '../../components/profile/BottomNavigation';
import { useNavigation } from '../../navigation';
import { colors } from '../../assets/colors/colors';

const THEME = {
  bg: colors.screenBg,
  darkSlate: '#17383A',
  searchBg: '#EAE5DB',
  border: '#DED9CE',
  mutedText: '#788383',
  deepTeal: '#245F60',
};

/**
 * NotificationsScreen
 * Notification center with search, filter tabs, grouped today/earlier lists, and mark-all-read.
 */
export default function NotificationsScreen({
  onBack,
  onNavigateTab,
}) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Initial Notifications Data matching Reference Image 3
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      group: 'Today',
      type: 'mention',
      title: 'Sarah Johnson mentioned you in',
      highlight: '#backend',
      preview: 'Can you review the API update?',
      time: '10:24 AM',
      isUnread: true,
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      badgeIcon: '@',
    },
    {
      id: 'notif-2',
      group: 'Today',
      type: 'task',
      title: 'Task assigned to you',
      preview: 'Complete authentication testing',
      badge: 'Due today',
      time: '9:18 AM',
      isUnread: true,
    },
    {
      id: 'notif-3',
      group: 'Today',
      type: 'reply',
      title: 'David Lee replied to your message',
      preview: 'The dashboard is ready for review.',
      time: '8:47 AM',
      isUnread: true,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      badgeIcon: '💬',
    },
    {
      id: 'notif-4',
      group: 'Earlier',
      type: 'join',
      title: 'You joined Engineering Team',
      preview: 'Welcome to the team! 🎉',
      time: 'Yesterday',
      isUnread: false,
    },
    {
      id: 'notif-5',
      group: 'Earlier',
      type: 'channel',
      title: 'New channel created: #design-review',
      preview: 'A new channel has been created for design discussions.',
      time: 'Yesterday',
      isUnread: false,
    },
    {
      id: 'notif-6',
      group: 'Earlier',
      type: 'completed',
      title: 'Maya Patel completed a task',
      preview: 'Updated documentation',
      time: '2 days ago',
      isUnread: false,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      badgeIcon: '✓',
    },
  ]);

  // Handle Mark Single Item as Read
  const handleItemPress = (id) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isUnread: false } : item))
    );
  };

  // Handle Mark All Read
  const handleMarkAllRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, isUnread: false }))
    );
  };

  // Back action
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation?.goBack) {
      navigation.goBack();
    }
  };

  // Handle Tab navigation
  const handleTabChange = (tabName) => {
    if (onNavigateTab) {
      onNavigateTab(tabName);
    } else if (navigation?.setScreen) {
      navigation.setScreen(tabName.toLowerCase());
    }
  };

  // Filter Logic
  const filteredNotifications = notifications.filter((item) => {
    // 1. Text Search Filter
    const matchesSearch =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.preview &&
        item.preview.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.highlight &&
        item.highlight.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    // 2. Category Filter Tab
    if (activeFilter === 'Mentions') return item.type === 'mention';
    if (activeFilter === 'Tasks')
      return item.type === 'task' || item.type === 'completed';
    if (activeFilter === 'Unread') return item.isUnread;

    return true;
  });

  const todayItems = filteredNotifications.filter((n) => n.group === 'Today');
  const earlierItems = filteredNotifications.filter((n) => n.group === 'Earlier');

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        { paddingTop: Math.max(insets.top, 14) },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor={THEME.bg} />

      <View style={styles.contentWrapper}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 1. Header with Back Arrow and Mark All Read */}
          <NotificationHeader
            title="Notifications"
            onBackPress={handleBack}
            onMarkAllRead={handleMarkAllRead}
          />

          {/* 2. Search Input */}
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search notifications"
              placeholderTextColor={THEME.mutedText}
              style={styles.searchInput}
            />
          </View>

          {/* 3. Filter Pills Switcher */}
          <NotificationFilter
            activeFilter={activeFilter}
            onSelectFilter={setActiveFilter}
          />

          {/* 4. Group: Today */}
          {todayItems.length > 0 && (
            <View style={styles.groupSection}>
              <Text style={styles.groupTitle}>Today</Text>
              {todayItems.map((item) => (
                <NotificationItem
                  key={item.id}
                  notification={item}
                  onPress={handleItemPress}
                />
              ))}
            </View>
          )}

          {/* 5. Group: Earlier */}
          {earlierItems.length > 0 && (
            <View style={styles.groupSection}>
              <Text style={styles.groupTitle}>Earlier</Text>
              {earlierItems.map((item) => (
                <NotificationItem
                  key={item.id}
                  notification={item}
                  onPress={handleItemPress}
                />
              ))}
            </View>
          )}

          {/* Empty State */}
          {filteredNotifications.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>🔔</Text>
              <Text style={styles.emptyTitle}>No notifications found</Text>
              <Text style={styles.emptySubtitle}>
                You're all caught up with your workspace alerts!
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Bottom Navigation */}
        <BottomNavigation
          activeTab="Profile"
          onTabChange={handleTabChange}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.bg,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 20,
  },
  searchBar: {
    backgroundColor: THEME.searchBg,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: THEME.border,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
    color: THEME.mutedText,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: THEME.darkSlate,
    padding: 0,
    fontWeight: '500',
  },
  groupSection: {
    marginBottom: 16,
  },
  groupTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.mutedText,
    marginBottom: 10,
    marginLeft: 2,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: THEME.darkSlate,
  },
  emptySubtitle: {
    fontSize: 12,
    color: THEME.mutedText,
    marginTop: 4,
    textAlign: 'center',
  },
});
