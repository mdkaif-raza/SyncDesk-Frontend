import React from 'react';
import { Pressable, Text, View } from 'react-native';
import styles from '../../assets/styles/styles';

/**
 * MessageFilter
 * Segmented filter tabs: [ All | Unread | Teammates ]
 */
export default function MessageFilter({
  activeFilter = 'All',
  onSelectFilter,
}) {
  const filters = ['All', 'Unread', 'Teammates'];

  return (
    <View
      style={[
        styles.row,
        styles.mb16,
        styles.pd4,
        {
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
        },
      ]}
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter;

        return (
          <Pressable
            key={filter}
            style={({ pressed }) => [
              styles.center,
              styles.flex1,
              styles.pdv8,
              {
                backgroundColor: isActive ? '#1B3E3C' : 'transparent',
                borderRadius: 16,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
            onPress={() => onSelectFilter && onSelectFilter(filter)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
          >
            <Text
              style={[
                styles.ts13,
                styles.bold,
                {
                  color: isActive ? '#FFFFFF' : '#687E7B',
                },
              ]}
            >
              {filter}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
