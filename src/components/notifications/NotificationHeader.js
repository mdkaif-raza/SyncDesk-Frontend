import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const THEME = {
  darkSlate: '#17383A',
  deepTeal: '#245F60',
  mutedText: '#788383',
};

/**
 * NotificationHeader
 * Header bar with Back Arrow, 'Notifications' title, and 'Mark all read' action.
 */
export function NotificationHeader({
  title = 'Notifications',
  onBackPress,
  onMarkAllRead,
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

      {/* Mark All Read Action */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onMarkAllRead}
        style={styles.markReadButton}
        accessibilityRole="button"
        accessibilityLabel="Mark all as read"
      >
        <Text style={styles.markReadText}>Mark all read</Text>
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
    marginBottom: 12,
  },
  actionButton: {
    width: 36,
    height: 36,
    alignItems: 'flex-start',
    justifyContent: 'center',
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
  markReadButton: {
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  markReadText: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.deepTeal,
  },
});

export default NotificationHeader;
