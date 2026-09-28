import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { colors } from '../../assets/colors/colors';
import { icons } from '../../assets/icons';
import styles from '../../assets/styles/styles';

/**
 * HomeBottomNav
 * 5-tab bottom navigation bar for the Home Screen.
 * Preserves the exact user footer navigation.
 *
 * @param {Object} props
 * @param {string} props.activeTab - 'Home' | 'Channels' | 'Messages' | 'Tasks' | 'Profile'
 * @param {Function} props.onTabChange - Tab change handler
 */
export default function HomeBottomNav({
  activeTab = 'Home',
  onTabChange,
}) {
  const tabs = [
    { name: 'Home', icon: icons.home },
    { name: 'Channels', icon: icons.channels },
    { name: 'Messages', icon: icons.messages },
    { name: 'Tasks', icon: icons.tasks },
    { name: 'Profile', icon: icons.profile },
  ];

  return (
    <View
      style={[
        styles.rowBetween,
        styles.pdh16,
        styles.pdv8,
        {
          backgroundColor: '#FAF7F0',
          borderTopColor: '#E6DFC8',
          borderTopWidth: 1,
        },
      ]}
      accessibilityRole="tablist"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;
        const tintColor = isActive
          ? colors.bgAccent || '#132B2C'
          : '#8A9995';

        return (
          <Pressable
            key={tab.name}
            style={({ pressed }) => [
              styles.center,
              styles.flex1,
              styles.pdv4,
              {
                opacity: pressed ? 0.7 : 1,
              },
            ]}
            onPress={() => onTabChange && onTabChange(tab.name)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
          >
            <Image
              source={tab.icon}
              style={{
                height: 22,
                width: 22,
              }}
              resizeMode="contain"
              tintColor={tintColor}
            />
            <Text
              style={[
                styles.ts11,
                styles.mt4,
                isActive ? styles.bold : styles.regular,
                {
                  color: tintColor,
                },
              ]}
            >
              {tab.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
