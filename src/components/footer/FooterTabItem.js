import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import styles from '../../assets/styles/styles';

/**
 * FooterTabItem
 * Individual tab item in the bottom navigation bar matching the reference design:
 * - Active state: Warm camel / amber accent (#B48248), bold label
 * - Inactive state: Slate outline icon and muted text (#8A9995)
 */
export default function FooterTabItem({
  name,
  icon,
  isActive,
  onPress,
}) {
  const activeColor = '#B48248'; // Warm camel/amber accent matching mockup
  const inactiveColor = '#8A9995';

  return (
    <Pressable
      style={({ pressed }) => [
        styles.center,
        styles.flex1,
        styles.pdv4,
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={`${name} tab`}
    >
      {/* Icon Container */}
      <View
        style={[
          styles.center,
          {
            height: 24,
            justifyContent: 'center',
            minWidth: 24,
          },
        ]}
      >
        <Image
          source={icon}
          style={{
            height: 22,
            width: 22,
          }}
          resizeMode="contain"
          tintColor={isActive ? activeColor : inactiveColor}
        />
      </View>

      {/* Tab Label */}
      <Text
        style={[
          styles.ts11,
          styles.mt2,
          {
            color: isActive ? activeColor : inactiveColor,
            fontWeight: isActive ? '700' : '400',
            fontSize: 11,
          },
        ]}
      >
        {name}
      </Text>
    </Pressable>
  );
}
