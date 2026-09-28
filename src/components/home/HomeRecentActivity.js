import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

/**
 * DEFAULT_ACTIVITIES
 * Realistic default activity items matching the screenshot
 */
const DEFAULT_ACTIVITIES = [
  {
    id: 'act-1',
    userName: 'Jamie Chen',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    action: 'Merged PR #482: Improve API error handling',
    channel: 'backend',
    time: '12m ago',
  },
  {
    id: 'act-2',
    userName: 'Riley Carter',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    action: 'Commented on design mockups',
    channel: 'frontend',
    time: '28m ago',
  },
  {
    id: 'act-3',
    userName: 'Taylor Kim',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    action: 'Created a new issue: Auth token refresh fails',
    channel: 'backend',
    time: '1h ago',
  },
];

/**
 * HomeRecentActivity
 * "Recent activity" section matching the reference mockup:
 * - Section header with "Recent activity" and "View all >" in warm camel tone
 * - Activity cards with user avatar, name, action description, channel hashtag pill, and timestamp
 */
export default function HomeRecentActivity({
  activities = DEFAULT_ACTIVITIES,
  onViewAllPress,
  onActivityPress,
  onChannelTagPress,
}) {
  return (
    <View style={activityStyles.sectionContainer}>
      {/* Section Header */}
      <View style={activityStyles.headerRow}>
        <Text style={activityStyles.sectionTitle}>Recent activity</Text>
        <Pressable
          style={({ pressed }) => [
            activityStyles.viewAllButton,
            pressed && activityStyles.pressed,
          ]}
          onPress={onViewAllPress}
          accessibilityRole="button"
          accessibilityLabel="View all recent activity"
        >
          <Text style={activityStyles.viewAllText}>View all ›</Text>
        </Pressable>
      </View>

      {/* Activity Items List */}
      <View style={activityStyles.listContainer}>
        {activities.map((item) => (
          <Pressable
            key={item.id}
            style={({ pressed }) => [
              activityStyles.activityItem,
              pressed && activityStyles.itemPressed,
            ]}
            onPress={() => onActivityPress && onActivityPress(item)}
            accessibilityRole="button"
            accessibilityLabel={`${item.userName}: ${item.action}`}
          >
            {/* User Avatar */}
            <Image
              source={{ uri: item.avatar }}
              style={activityStyles.avatar}
              defaultSource={{ uri: item.avatar }}
            />

            {/* Main Content */}
            <View style={activityStyles.contentContainer}>
              {/* Name & Time Row */}
              <View style={activityStyles.nameTimeRow}>
                <Text style={activityStyles.userName}>{item.userName}</Text>
                <Text style={activityStyles.timeText}>{item.time}</Text>
              </View>

              {/* Action Description */}
              <Text style={activityStyles.actionText} numberOfLines={2}>
                {item.action}
              </Text>

              {/* Channel Pill Tag */}
              {item.channel ? (
                <Pressable
                  style={({ pressed }) => [
                    activityStyles.channelBadge,
                    pressed && activityStyles.badgePressed,
                  ]}
                  onPress={() =>
                    onChannelTagPress
                      ? onChannelTagPress(item.channel)
                      : onActivityPress && onActivityPress(item)
                  }
                >
                  <Text style={activityStyles.channelBadgeText}>
                    # {item.channel}
                  </Text>
                </Pressable>
              ) : null}
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const activityStyles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#132B2C',
    letterSpacing: -0.2,
  },
  viewAllButton: {
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  viewAllText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#B48248', // Warm camel / amber accent matching mockup
  },
  listContainer: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 2,
  },
  itemPressed: {
    opacity: 0.85,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E6DAC4',
    marginRight: 12,
    marginTop: 2,
  },
  contentContainer: {
    flex: 1,
  },
  nameTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  userName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#132B2C',
  },
  timeText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#8A9995',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#4A5856',
    lineHeight: 18,
    marginBottom: 6,
  },
  channelBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EAE3D5',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  badgePressed: {
    opacity: 0.7,
  },
  channelBadgeText: {
    fontSize: 11.5,
    fontWeight: '500',
    color: '#526A66',
  },
  pressed: {
    opacity: 0.6,
  },
});
