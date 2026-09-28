import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const THEME = {
  darkSlate: '#17383A',
  deepTeal: '#245F60',
  mutedText: '#788383',
};

/**
 * EditProfileHeader
 * Header bar with Back Arrow, 'Edit profile' title, and 'Save' text action button.
 */
export function EditProfileHeader({
  title = 'Edit profile',
  onBackPress,
  onSavePress,
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

      {/* Save Action Button */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onSavePress}
        style={styles.saveButton}
        accessibilityRole="button"
        accessibilityLabel="Save profile changes"
      >
        <Text style={styles.saveText}>Save</Text>
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
  saveButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  saveText: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.deepTeal,
  },
});

export default EditProfileHeader;
