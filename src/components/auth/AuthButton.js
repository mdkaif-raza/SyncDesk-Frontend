import React from 'react';
import { Pressable, Text } from 'react-native';
import { colors } from '../../assets/colors/colors';
import styles from '../../assets/styles/styles';

/**
 * AuthButton
 * Primary dark teal action button using inline styling.
 *
 * @param {Object} props
 * @param {string} props.title - Button label ('Log in' | 'Create account')
 * @param {Function} props.onPress - Press handler
 */
export default function AuthButton({ title, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.center,
        styles.mt8,
        styles.rounded14,
        {
          backgroundColor: colors.bgAccent || '#132B2C',
          height: 52,
          opacity: pressed ? 0.9 : 1,
        },
      ]}
      onPress={onPress}
      accessibilityRole="button"
    >
      <Text
        style={[
          styles.ts16,
          styles.bold,
          {
            color: '#FFFFFF',
          },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}
