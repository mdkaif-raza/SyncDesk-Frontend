import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

/**
 * DEFAULT_CHANNELS
 * Default channels list matching the mockup screenshot
 */
const DEFAULT_CHANNELS = [
  {
    id: 'ch-1',
    name: 'general',
    description: 'Team updates and casual chat',
    iconBg: '#D5BA98', // Warm camel / tan background
    hashColor: '#132B2C', // Dark slate teal hash
  },
  {
    id: 'ch-2',
    name: 'backend',
    description: 'APIs, services and infrastructure',
    iconBg: '#132B2C', // Dark slate teal background
    hashColor: '#FFFFFF', // White hash
  },
  {
    id: 'ch-3',
    name: 'frontend',
    description: 'UI, components and web app',
    iconBg: '#D5BA98', // Warm camel / tan background
    hashColor: '#132B2C', // Dark slate teal hash
  },
];

/**
 * HomeChannelsSection
 * "Channels" list section matching the reference mockup:
 * - Section header with "Channels" and "View all >"
 * - Channel rows with customized hash icon badge, channel title, description, and chevron right
 */
export default function HomeChannelsSection({
  channels = DEFAULT_CHANNELS,
  onViewAllPress,
  onChannelPress,
}) {
  return (
    <View style={channelStyles.sectionContainer}>
      {/* Section Header */}
      <View style={channelStyles.headerRow}>
        <Text style={channelStyles.sectionTitle}>Channels</Text>
        <Pressable
          style={({ pressed }) => [
            channelStyles.viewAllButton,
            pressed && channelStyles.pressed,
          ]}
          onPress={onViewAllPress}
          accessibilityRole="button"
          accessibilityLabel="View all channels"
        >
          <Text style={channelStyles.viewAllText}>View all ›</Text>
        </Pressable>
      </View>

      {/* Channels List */}
      <View style={channelStyles.listContainer}>
        {channels.map((channel) => (
          <Pressable
            key={channel.id}
            style={({ pressed }) => [
              channelStyles.channelRow,
              pressed && channelStyles.rowPressed,
            ]}
            onPress={() => onChannelPress && onChannelPress(channel)}
            accessibilityRole="button"
            accessibilityLabel={`Channel ${channel.name}: ${channel.description}`}
          >
            {/* Hash Icon Badge */}
            <View
              style={[
                channelStyles.iconBadge,
                { backgroundColor: channel.iconBg || '#D5BA98' },
              ]}
            >
              <Text
                style={[
                  channelStyles.hashText,
                  { color: channel.hashColor || '#132B2C' },
                ]}
              >
                #
              </Text>
            </View>

            {/* Title & Description */}
            <View style={channelStyles.infoContainer}>
              <Text style={channelStyles.channelName}>{channel.name}</Text>
              <Text style={channelStyles.channelDescription} numberOfLines={1}>
                {channel.description}
              </Text>
            </View>

            {/* Right Chevron */}
            <Text style={channelStyles.chevron}>›</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const channelStyles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 28,
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
    gap: 14,
  },
  channelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  rowPressed: {
    opacity: 0.75,
  },
  iconBadge: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  hashText: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 22,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  channelName: {
    fontSize: 15.5,
    fontWeight: '700',
    color: '#132B2C',
    letterSpacing: -0.2,
  },
  channelDescription: {
    fontSize: 12.5,
    fontWeight: '400',
    color: '#7C8885',
    marginTop: 2,
  },
  chevron: {
    fontSize: 20,
    fontWeight: '400',
    color: '#9EAAA7',
    marginLeft: 8,
  },
  pressed: {
    opacity: 0.6,
  },
});
