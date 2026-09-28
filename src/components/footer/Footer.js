import React from 'react';
import { View } from 'react-native';
import { icons } from '../../assets/icons';
import styles from '../../assets/styles/styles';
import { useNavigation } from '../../navigation';
import FooterTabItem from './FooterTabItem';

/**
 * Footer (Bottom Navigation Bar)
 * Matches the reference design with 5 tabs:
 * - Home
 * - Channels
 * - Messages
 * - Tasks
 * - Profile
 *
 * Integrates directly with NavigationContext so tapping any tab traverses screens.
 *
 * @param {Object} props
 * @param {string} [props.activeTab] - Optional override for active tab name ('Home' | 'Channels' | 'Messages' | 'Tasks' | 'Profile')
 * @param {Function} [props.onTabChange] - Optional tab change callback
 */
export default function Footer({
  activeTab,
  onTabChange,
}) {
  const navigation = useNavigation();

  // If activeTab prop is passed, use it; otherwise read from navigation context
  const currentTabName = activeTab || (() => {
    switch (navigation?.currentScreen) {
      case 'home':
        return 'Home';
      case 'channels':
        return 'Channels';
      case 'messages':
        return 'Messages';
      case 'tasks':
        return 'Tasks';
      case 'profile':
        return 'Profile';
      default:
        return 'Home';
    }
  })();

  const tabs = [
    { name: 'Home', screen: 'home', icon: icons.home },
    { name: 'Channels', screen: 'channels', icon: icons.channels },
    { name: 'Messages', screen: 'messages', icon: icons.messages },
    { name: 'Tasks', screen: 'tasks', icon: icons.tasks },
    { name: 'Profile', screen: 'profile', icon: icons.profile },
  ];

  const handlePress = (tab) => {
    if (onTabChange) {
      onTabChange(tab.name);
    }
    if (navigation?.setScreen) {
      navigation.setScreen(tab.screen);
    }
  };

  return (
    <View
      style={[
        styles.rowBetween,
        styles.pdh12,
        {
          backgroundColor: '#FAF7F0',
          borderTopColor: '#E6DFC8',
          borderTopWidth: 1,
          paddingBottom: 6,
          paddingTop: 8,
        },
      ]}
      accessibilityRole="tablist"
    >
      {tabs.map((tab) => (
        <FooterTabItem
          key={tab.name}
          name={tab.name}
          icon={tab.icon}
          isActive={currentTabName === tab.name}
          onPress={() => handlePress(tab)}
        />
      ))}
    </View>
  );
}
