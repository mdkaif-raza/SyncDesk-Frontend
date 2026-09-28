import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '../../assets/colors/colors';
import styles from '../../assets/styles/styles';

/**
 * AuthTabs
 * Segmented switcher for Login and Register tabs using inline styles.
 *
 * @param {Object} props
 * @param {string} props.activeTab - 'login' | 'register'
 * @param {Function} props.onSelectTab - Tab change callback
 */
export default function AuthTabs({ activeTab = 'login', onSelectTab }) {
  return (
    <View
      style={[
        styles.row,
        styles.pd4,
        styles.mb20,
        {
          backgroundColor: '#EBE4D6',
          borderRadius: 24,
          padding: 4,
        },
      ]}
    >
      {/* Login Tab */}
      <Pressable
        style={({ pressed }) => [
          styles.flex1,
          styles.center,
          styles.pdv10,
          {
            backgroundColor:
              activeTab === 'login'
                ? colors.bgAccent || '#132B2C'
                : 'transparent',
            borderRadius: 20,
            opacity: pressed ? 0.85 : 1,
          },
        ]}
        onPress={() => onSelectTab('login')}
        accessibilityRole="tab"
        accessibilityState={{ selected: activeTab === 'login' }}
      >
        <Text
          style={[
            styles.ts14,
            styles.semiBold,
            {
              color:
                activeTab === 'login'
                  ? '#FFFFFF'
                  : colors.bodyText || '#687E7B',
            },
          ]}
        >
          Login
        </Text>
      </Pressable>

      {/* Register Tab */}
      <Pressable
        style={({ pressed }) => [
          styles.flex1,
          styles.center,
          styles.pdv10,
          {
            backgroundColor:
              activeTab === 'register'
                ? colors.bgAccent || '#132B2C'
                : 'transparent',
            borderRadius: 20,
            opacity: pressed ? 0.85 : 1,
          },
        ]}
        onPress={() => onSelectTab('register')}
        accessibilityRole="tab"
        accessibilityState={{ selected: activeTab === 'register' }}
      >
        <Text
          style={[
            styles.ts14,
            styles.semiBold,
            {
              color:
                activeTab === 'register'
                  ? '#FFFFFF'
                  : colors.bodyText || '#687E7B',
            },
          ]}
        >
          Register
        </Text>
      </Pressable>
    </View>
  );
}
