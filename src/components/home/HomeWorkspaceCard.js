import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { icons } from '../../assets/icons';

/**
 * HomeWorkspaceCard
 * Soft sand/camel card showcasing the active workspace banner matching the mockup:
 * - Left rounded square dark slate badge with team icon
 * - Workspace name and channel count
 * - Right chevron indicator
 * - "Active workspace" badge with green status indicator dot
 */
export default function HomeWorkspaceCard({
  workspaceName = 'Engineering Team',
  channelCount = 4,
  isActive = true,
  onPress,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        cardStyles.container,
        pressed && cardStyles.pressed,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Workspace ${workspaceName}, ${channelCount} channels`}
    >
      {/* Top Main Row */}
      <View style={cardStyles.topRow}>
        {/* Left Icon Square */}
        <View style={cardStyles.iconBadge}>
          {/* Group / Workspace Icon */}
          <Text style={cardStyles.teamIcon}>👥</Text>
        </View>

        {/* Center Info */}
        <View style={cardStyles.infoContainer}>
          <Text style={cardStyles.workspaceTitle} numberOfLines={1}>
            {workspaceName}
          </Text>
          <Text style={cardStyles.channelSubtitle}>
            {channelCount} {channelCount === 1 ? 'channel' : 'channels'}
          </Text>
        </View>

        {/* Right Chevron */}
        <Text style={cardStyles.chevronRight}>›</Text>
      </View>

      {/* Bottom Status Row */}
      <View style={cardStyles.statusRow}>
        <View style={cardStyles.activeDot} />
        <Text style={cardStyles.statusText}>Active workspace</Text>
      </View>
    </Pressable>
  );
}

const cardStyles = StyleSheet.create({
  container: {
    backgroundColor: '#EDE5D8',
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.995 }],
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  iconBadge: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#132B2C',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  teamIcon: {
    fontSize: 22,
    color: '#FFFFFF',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  workspaceTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#132B2C',
    letterSpacing: -0.2,
  },
  channelSubtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: '#687E7B',
    marginTop: 2,
  },
  chevronRight: {
    fontSize: 22,
    fontWeight: '400',
    color: '#687E7B',
    marginLeft: 8,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 2,
  },
  activeDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#22C55E',
    marginRight: 8,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4A605D',
  },
});
