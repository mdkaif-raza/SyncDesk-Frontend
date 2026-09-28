import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../assets/colors/colors';
import styles from '../../assets/styles/styles';

/**
 * HomeHeader
 * Top bar matching the reference mockup:
 * - Left: Circular User Profile Avatar + Workspace Name pill with dropdown chevron ⌄
 * - Right: Notification Bell icon (with alert dot) + Search magnifying glass icon
 */
export default function HomeHeader({
  workspaceName = 'Engineering Team',
  userAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  onAvatarPress,
  onWorkspacePress,
  onNotificationPress,
  onSearchPress,
}) {
  return (
    <View style={headerStyles.container}>
      {/* Left: User Avatar + Workspace Switcher */}
      <View style={headerStyles.leftSection}>
        <Pressable
          style={({ pressed }) => [
            headerStyles.avatarButton,
            pressed && headerStyles.pressed,
          ]}
          onPress={onAvatarPress || onWorkspacePress}
          accessibilityRole="button"
          accessibilityLabel="User Profile"
        >
          <Image
            source={{
              uri:
                userAvatar ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            }}
            style={headerStyles.avatarImage}
            defaultSource={{
              uri:
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            }}
          />
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            headerStyles.workspaceDropdown,
            pressed && headerStyles.pressed,
          ]}
          onPress={onWorkspacePress}
          accessibilityRole="button"
          accessibilityLabel={`Active Workspace: ${workspaceName}`}
        >
          <Text style={headerStyles.workspaceTitle} numberOfLines={1}>
            {workspaceName}
          </Text>
          <Text style={headerStyles.chevronDown}>⌄</Text>
        </Pressable>
      </View>

      {/* Right: Notification Bell + Search */}
      <View style={headerStyles.rightSection}>
        {/* Notification Bell */}
        <Pressable
          style={({ pressed }) => [
            headerStyles.iconButton,
            pressed && headerStyles.pressed,
          ]}
          onPress={onNotificationPress}
          accessibilityRole="button"
          accessibilityLabel="Notifications"
        >
          <View style={headerStyles.bellWrapper}>
            {/* Bell Icon */}
            <Text style={headerStyles.bellText}>🔔</Text>
            {/* Notification Badge Dot */}
            <View style={headerStyles.badgeDot} />
          </View>
        </Pressable>

        {/* Search Icon */}
        <Pressable
          style={({ pressed }) => [
            headerStyles.iconButton,
            pressed && headerStyles.pressed,
          ]}
          onPress={onSearchPress}
          accessibilityRole="button"
          accessibilityLabel="Search"
        >
          <Text style={headerStyles.searchText}>🔍</Text>
        </Pressable>
      </View>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginBottom: 16,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  avatarButton: {
    marginRight: 10,
  },
  avatarImage: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E6DAC4',
  },
  workspaceDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  workspaceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#132B2C',
    letterSpacing: -0.2,
  },
  chevronDown: {
    fontSize: 14,
    fontWeight: '700',
    color: '#132B2C',
    marginLeft: 4,
    marginTop: -2,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  bellWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellText: {
    fontSize: 19,
    color: '#132B2C',
  },
  badgeDot: {
    position: 'absolute',
    top: 0,
    right: -1,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#C59A6D',
    borderWidth: 1.2,
    borderColor: colors.screenBg || '#FAF8F5',
  },
  searchText: {
    fontSize: 18,
    color: '#132B2C',
  },
  pressed: {
    opacity: 0.65,
  },
});
