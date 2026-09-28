import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

/**
 * WorkspaceListItem
 * Single workspace row inside the "Your workspaces" switcher modal:
 * - Checkmark indicator if active
 * - Team icon circle
 * - Workspace name
 * - Role badge (Admin / Member)
 */
export default function WorkspaceListItem({
  workspace,
  isActive = false,
  onPress,
}) {
  const { name, role = 'Member' } = workspace;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        isActive ? styles.containerActive : styles.containerDefault,
        pressed && styles.containerPressed,
      ]}
      onPress={() => onPress && onPress(workspace)}
      accessibilityRole="button"
      accessibilityLabel={`Workspace ${name}, ${role}, ${isActive ? 'selected' : 'not selected'}`}
    >
      <View style={styles.leftSection}>
        {/* Active Checkmark Icon */}
        {isActive && (
          <View style={styles.checkCircle}>
            <Text style={styles.checkIcon}>✓</Text>
          </View>
        )}

        {/* Team / Group Icon Circle */}
        <View
          style={[
            styles.teamIconCircle,
            isActive ? styles.teamIconCircleActive : styles.teamIconCircleDefault,
          ]}
        >
          <Text style={styles.teamEmoji}>👥</Text>
        </View>

        {/* Workspace Name */}
        <Text
          style={[
            styles.workspaceName,
            isActive ? styles.workspaceNameActive : styles.workspaceNameDefault,
          ]}
          numberOfLines={1}
        >
          {name}
        </Text>
      </View>

      {/* Role Pill Badge */}
      {role ? (
        <View
          style={[
            styles.roleBadge,
            isActive ? styles.roleBadgeActive : styles.roleBadgeDefault,
          ]}
        >
          <Text
            style={[
              styles.roleText,
              isActive ? styles.roleTextActive : styles.roleTextDefault,
            ]}
          >
            {role}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
  },
  containerActive: {
    backgroundColor: '#EFE8DE',
    borderColor: '#DFD7CA',
  },
  containerDefault: {
    backgroundColor: '#FAF6ED',
    borderColor: '#ECE5D8',
  },
  containerPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.995 }],
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#1E4E4C',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkIcon: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  teamIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  teamIconCircleActive: {
    backgroundColor: '#17383A',
  },
  teamIconCircleDefault: {
    backgroundColor: '#DDD6C9',
  },
  teamEmoji: {
    fontSize: 18,
  },
  workspaceName: {
    fontSize: 15,
    flex: 1,
  },
  workspaceNameActive: {
    fontWeight: '700',
    color: '#17383A',
  },
  workspaceNameDefault: {
    fontWeight: '600',
    color: '#17383A',
  },
  roleBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  roleBadgeActive: {
    backgroundColor: '#E2DBD0',
  },
  roleBadgeDefault: {
    backgroundColor: '#EAE4D8',
  },
  roleText: {
    fontSize: 12,
    fontWeight: '600',
  },
  roleTextActive: {
    color: '#4B5856',
  },
  roleTextDefault: {
    color: '#6F7B79',
  },
});
