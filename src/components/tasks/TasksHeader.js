import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function TasksHeader({
  title = 'Tasks',
  subtitle = 'Stay on top of your assigned work.',
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#132B2C',
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: '#687E7B',
    marginTop: 3,
  },
});
