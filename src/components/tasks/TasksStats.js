import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function TasksStats({
  openCount = 3,
  dueTodayCount = 1,
  completedCount = 5,
}) {
  return (
    <View style={styles.row}>
      {/* 1. Open Tasks Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.countText}>{openCount}</Text>
          <View style={[styles.iconBg, { backgroundColor: '#E0F2FE' }]}>
            <Text style={styles.iconSymbol}>📋</Text>
          </View>
        </View>
        <Text style={styles.labelText}>Open</Text>
      </View>

      {/* 2. Due Today Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.countText}>{dueTodayCount}</Text>
          <View style={[styles.iconBg, { backgroundColor: '#FFEDD5' }]}>
            <Text style={styles.iconSymbol}>📅</Text>
          </View>
        </View>
        <Text style={styles.labelText}>Due today</Text>
      </View>

      {/* 3. Completed Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.countText}>{completedCount}</Text>
          <View style={[styles.iconBg, { backgroundColor: '#DCFCE7' }]}>
            <Text style={[styles.iconSymbol, { color: '#16A34A', fontWeight: '700' }]}>✓</Text>
          </View>
        </View>
        <Text style={styles.labelText}>Completed</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#EAE6DF',
    shadowColor: '#132B2C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  countText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#132B2C',
  },
  iconBg: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justify: 'center',
  },
  iconSymbol: {
    fontSize: 12,
  },
  labelText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#687E7B',
  },
});
