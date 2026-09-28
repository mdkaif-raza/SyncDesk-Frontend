import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const THEME = {
  deepTeal: '#245F60',
  darkSlate: '#17383A',
  cardBg: '#FFFDF8',
  mutedText: '#788383',
  border: '#DED9CE',
  badgeBg: '#D6EAE6',
};

/**
 * WorkspaceCard
 * Displays the current active workspace, member role badge, and right navigation chevron.
 */
export function WorkspaceCard({
  workspaceName = 'Engineering Team',
  role = 'Admin',
  onPress,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.card}
      accessibilityRole="button"
      accessibilityLabel={`Current workspace: ${workspaceName}`}
    >
      <View style={styles.leftContent}>
        {/* Workspace Icon Container */}
        <View style={styles.iconContainer}>
          <Text style={styles.iconSymbol}>👥</Text>
        </View>

        {/* Workspace Information */}
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Current workspace</Text>
          <Text style={styles.workspaceName}>{workspaceName}</Text>
          <View style={styles.badgeContainer}>
            <View style={styles.roleBadge}>
              <Text style={styles.roleBadgeText}>{role}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Right Chevron */}
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: THEME.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    shadowColor: '#17383A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: THEME.deepTeal,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconSymbol: {
    fontSize: 20,
  },
  infoContainer: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    color: THEME.mutedText,
    letterSpacing: 0.2,
  },
  workspaceName: {
    fontSize: 15,
    fontWeight: '700',
    color: THEME.darkSlate,
    marginTop: 2,
    marginBottom: 4,
  },
  badgeContainer: {
    flexDirection: 'row',
  },
  roleBadge: {
    backgroundColor: THEME.badgeBg,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  roleBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.darkSlate,
  },
  chevron: {
    fontSize: 22,
    color: THEME.mutedText,
    marginLeft: 8,
    fontWeight: '400',
  },
});

export default WorkspaceCard;
