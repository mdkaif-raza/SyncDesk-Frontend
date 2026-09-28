import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const THEME = {
  darkSlate: '#17383A',
  mutedText: '#788383',
};

/**
 * ProfileHeader
 * Header bar for Profile Screen with Back Arrow, Title, and Three-dot menu.
 */
export function ProfileHeader({
  title = 'Profile',
  onBackPress,
  onMenuPress,
}) {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onBackPress}
        style={styles.actionButton}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      {/* Center Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Right Three-dot Menu */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onMenuPress}
        style={styles.actionButton}
        accessibilityRole="button"
        accessibilityLabel="More options"
      >
        <Text style={styles.menuIcon}>⋮</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginBottom: 16,
  },
  actionButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  backArrow: {
    fontSize: 22,
    color: THEME.darkSlate,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.darkSlate,
    textAlign: 'center',
    letterSpacing: -0.2,
  },
  menuIcon: {
    fontSize: 22,
    color: THEME.darkSlate,
    fontWeight: '700',
  },
});

export default ProfileHeader;
