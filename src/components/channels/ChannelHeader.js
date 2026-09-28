import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

/**
 * ChannelHeader
 * Header Area:
 * - Bold title "Channels" aligned to the left
 * - Top-right corner includes user circular avatar
 * - Full-width rounded pill-shaped dropdown bar (border-radius: 9999px)
 *   with group icon, "Engineering Team" label, and chevron-down
 */
export default function ChannelHeader({
  title = 'Channels',
  workspaceName = 'Engineering Team',
  userAvatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  onProfilePress,
  onWorkspacePress,
}) {
  return (
    <View style={styles.container}>
      {/* 1. Title Row with Left-Aligned Title and Top-Right Avatar */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>{title}</Text>

        <Pressable
          style={({ pressed }) => [
            styles.avatarButton,
            pressed && styles.avatarPressed,
          ]}
          onPress={onProfilePress}
          accessibilityRole="button"
          accessibilityLabel="User profile"
        >
          <Image
            source={{ uri: userAvatarUrl }}
            style={styles.avatarImage}
            resizeMode="cover"
          />
        </Pressable>
      </View>

      {/* 2. Full-Width Rounded Pill Dropdown Selector */}
      <Pressable
        style={({ pressed }) => [
          styles.workspacePill,
          pressed && styles.workspacePillPressed,
        ]}
        onPress={onWorkspacePress}
        accessibilityRole="button"
        accessibilityLabel={`Selected workspace: ${workspaceName}`}
      >
        <View style={styles.pillLeft}>
          <Text style={styles.groupIcon}>👥</Text>
          <Text style={styles.workspaceName}>{workspaceName}</Text>
        </View>

        <Text style={styles.downChevron}>⌄</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingTop: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#17383A',
    letterSpacing: -0.5,
  },
  avatarButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  avatarPressed: {
    opacity: 0.8,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  workspacePill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EDE8DF',
    borderRadius: 9999,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#E4DDD2',
  },
  workspacePillPressed: {
    backgroundColor: '#E6E0D5',
    opacity: 0.9,
  },
  pillLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  workspaceName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#17383A',
  },
  downChevron: {
    fontSize: 14,
    fontWeight: '800',
    color: '#17383A',
  },
});
