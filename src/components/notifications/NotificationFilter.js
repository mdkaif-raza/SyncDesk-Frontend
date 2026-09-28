import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const THEME = {
  deepTeal: '#245F60',
  tabTrack: '#EFECE6',
  darkSlate: '#17383A',
  mutedText: '#788383',
};

/**
 * NotificationFilter
 * Segmented/pill filter selector: All, Mentions, Tasks, Unread
 */
export function NotificationFilter({
  activeFilter = 'All',
  onSelectFilter,
}) {
  const filters = ['All', 'Mentions', 'Tasks', 'Unread'];

  return (
    <View style={styles.container}>
      {filters.map((filter) => {
        const isActive = activeFilter === filter;
        return (
          <TouchableOpacity
            key={filter}
            activeOpacity={0.8}
            onPress={() => onSelectFilter && onSelectFilter(filter)}
            style={[
              styles.filterPill,
              isActive ? styles.activeFilterPill : styles.inactiveFilterPill,
            ]}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={`Filter: ${filter}`}
          >
            <Text
              style={[
                styles.filterText,
                isActive ? styles.activeFilterText : styles.inactiveFilterText,
              ]}
            >
              {filter}
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
    gap: 8,
    marginBottom: 18,
  },
  filterPill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeFilterPill: {
    backgroundColor: THEME.deepTeal,
  },
  inactiveFilterPill: {
    backgroundColor: THEME.tabTrack,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  inactiveFilterText: {
    color: THEME.darkSlate,
  },
});

export default NotificationFilter;
