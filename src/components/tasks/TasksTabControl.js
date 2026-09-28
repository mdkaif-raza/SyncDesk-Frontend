import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function TasksTabControl({ activeTab, onTabSelect }) {
  const tabs = [
    { id: 'my_tasks', label: 'My tasks' },
    { id: 'assigned_by_me', label: 'Assigned by me' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            activeOpacity={0.85}
            onPress={() => onTabSelect && onTabSelect(tab.id)}
            style={[styles.tab, isActive && styles.activeTab]}
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
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
    backgroundColor: '#EFECE6',
    borderRadius: 26,
    padding: 3,
    marginBottom: 18,
  },
  tab: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    justify: 'center',
    borderRadius: 22,
  },
  activeTab: {
    backgroundColor: '#1B4D4F',
    shadowColor: '#1B4D4F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
});
