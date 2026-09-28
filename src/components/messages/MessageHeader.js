import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { icons } from '../../assets/icons';
import styles from '../../assets/styles/styles';

/**
 * MessageHeader
 * Top bar for Messages Screen:
 * - Hamburger menu (left)
 * - Workspace capsule pill switcher (center)
 * - Notification bell & profile avatar (right)
 */
export default function MessageHeader({
  workspaceName = 'Engineering Team',
  onMenuPress,
  onWorkspacePress,
  onNotificationPress,
  onProfilePress,
}) {
  return (
    <View
      style={[
        styles.rowBetween,
        styles.pdv8,
        styles.mb14,
        { alignItems: 'center' },
      ]}
    >
      {/* Hamburger Menu */}
      <Pressable
        style={({ pressed }) => [
          styles.center,
          styles.pd4,
          {
            opacity: pressed ? 0.6 : 1,
          },
        ]}
        onPress={onMenuPress}
        accessibilityRole="button"
        accessibilityLabel="Open menu"
      >
        <View style={{ gap: 4, width: 22 }}>
          <View style={{ backgroundColor: '#132B2C', borderRadius: 2, height: 2.2, width: 20 }} />
          <View style={{ backgroundColor: '#132B2C', borderRadius: 2, height: 2.2, width: 14 }} />
          <View style={{ backgroundColor: '#132B2C', borderRadius: 2, height: 2.2, width: 18 }} />
        </View>
      </Pressable>

      {/* Workspace Pill Switcher */}
      <Pressable
        style={({ pressed }) => [
          styles.rowCenter,
          styles.pdv6,
          styles.pdh12,
          {
            backgroundColor: '#EAE3D4',
            borderRadius: 22,
            opacity: pressed ? 0.8 : 1,
          },
        ]}
        onPress={onWorkspacePress}
        accessibilityRole="button"
        accessibilityLabel={`Workspace: ${workspaceName}`}
      >
        <Image
          source={icons.flowWorkspace}
          style={[
            styles.mr6,
            {
              height: 15,
              width: 15,
            },
          ]}
          resizeMode="contain"
          tintColor="#132B2C"
        />
        <Text
          style={[
            styles.ts13,
            styles.bold,
            styles.mr4,
            {
              color: '#132B2C',
            },
          ]}
        >
          {workspaceName}
        </Text>
        <Text
          style={{
            color: '#132B2C',
            fontSize: 12,
            fontWeight: '700',
          }}
        >
          ⌄
        </Text>
      </Pressable>

      {/* Right: Yellow Bell & Profile Avatar */}
      <View style={[styles.rowCenter, { gap: 12 }]}>
        <Pressable
          style={({ pressed }) => [
            styles.center,
            styles.pd4,
            {
              opacity: pressed ? 0.6 : 1,
            },
          ]}
          onPress={onNotificationPress}
          accessibilityRole="button"
          accessibilityLabel="Notifications"
        >
          <Text style={{ fontSize: 19 }}>🔔</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.center,
            {
              borderColor: '#132B2C',
              borderRadius: 16,
              borderWidth: 1.5,
              height: 30,
              opacity: pressed ? 0.75 : 1,
              overflow: 'hidden',
              width: 30,
            },
          ]}
          onPress={onProfilePress}
          accessibilityRole="button"
          accessibilityLabel="Profile"
        >
          <View
            style={[
              styles.flex1,
              styles.center,
              {
                backgroundColor: '#2E504A',
                height: '100%',
                width: '100%',
              },
            ]}
          >
            <Text style={{ fontSize: 13 }}>🌲</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
