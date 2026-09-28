import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const THEME = {
  bg: '#FAF7F0',
  border: '#E6DFC8',
  deepTeal: '#245F60',
  mutedText: '#788383',
  darkSlate: '#17383A',
};

/**
 * BottomNavigation
 * Custom bottom tab navigation bar for Profile screen with 5 tabs.
 */
export function BottomNavigation({
  activeTab = 'Profile',
  onTabChange,
}) {
  const insets = useSafeAreaInsets();

  const tabs = [
    { id: 'Home', label: 'Home', icon: '🏠' },
    { id: 'Channels', label: 'Channels', icon: '#' },
    { id: 'Messages', label: 'Messages', icon: '💬' },
    { id: 'Tasks', label: 'Tasks', icon: '✓' },
    { id: 'Profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: Math.max(insets.bottom, 8) },
      ]}
      accessibilityRole="tablist"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            activeOpacity={0.7}
            onPress={() => onTabChange && onTabChange(tab.id)}
            style={styles.tabItem}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={tab.label}
          >
            <View style={styles.iconWrapper}>
              <Text
                style={[
                  styles.tabIcon,
                  isActive && styles.activeTabIcon,
                ]}
              >
                {tab.icon}
              </Text>
            </View>
            <Text
              style={[
                styles.tabLabel,
                isActive && styles.activeTabLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: THEME.bg,
    borderTopWidth: 1,
    borderTopColor: THEME.border,
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    minWidth: 52,
  },
  iconWrapper: {
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 16,
    color: THEME.mutedText,
  },
  activeTabIcon: {
    color: THEME.deepTeal,
    fontWeight: '700',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: THEME.mutedText,
    marginTop: 2,
  },
  activeTabLabel: {
    color: THEME.deepTeal,
    fontWeight: '700',
  },
});

export default BottomNavigation;
