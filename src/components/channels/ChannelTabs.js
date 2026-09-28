import React from 'react';
import { Pressable, Text, View } from 'react-native';
import styles from '../../assets/styles/styles';

/**
 * ChannelTabs
 * Segmented pill filter: [ All | Favorites ]
 */
export default function ChannelTabs({
  activeTab = 'All',
  onSelectTab,
}) {
  const tabs = ['All', 'Favorites'];

  return (
    <View
      style={[
        styles.row,
        styles.mb18,
        styles.pd4,
        {
          backgroundColor: '#EAE3D4',
          borderRadius: 22,
        },
      ]}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab;

        return (
          <Pressable
            key={tab}
            style={({ pressed }) => [
              styles.center,
              styles.flex1,
              styles.pdv8,
              {
                backgroundColor: isActive ? '#1B3E3C' : 'transparent',
                borderRadius: 18,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
            onPress={() => onSelectTab && onSelectTab(tab)}
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
              {tab}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
