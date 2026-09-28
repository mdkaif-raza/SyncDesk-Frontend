import React from 'react';
import { Pressable, Text } from 'react-native';
import { colors } from '../../assets/colors/colors';
import styles from '../../assets/styles/styles';

/**
 * OnboardingButton
 * Reusable action button for primary (pill with arrow) and secondary (text link) actions using inline styles.
 *
 * @param {Object} props
 * @param {string} props.title - Button label
 * @param {Function} props.onPress - Press event handler
 * @param {boolean} [props.isPrimary=true] - Primary or secondary styling
 * @param {boolean} [props.showArrow=false] - Display trailing arrow
 */
export default function OnboardingButton({
  title,
  onPress,
  isPrimary = true,
  showArrow = false,
}) {
  if (!isPrimary) {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.pdv12,
          styles.pdh16,
          {
            opacity: pressed ? 0.7 : 1,
          },
        ]}
        onPress={onPress}
        accessibilityRole="button"
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text
          style={[
            styles.ts15,
            styles.medium,
            {
              color: colors.bgAccent || '#132B2C',
            },
          ]}
        >
          {title}
        </Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      style={({ pressed }) => [
        styles.rowCenter,
        styles.pdv12,
        styles.pdh24,
        styles.rounded24,
        {
          backgroundColor: colors.primaryButton || '#132B2C',
          opacity: pressed ? 0.88 : 1,
        },
      ]}
      onPress={onPress}
      accessibilityRole="button"
    >
      <Text
        style={[
          styles.ts15,
          styles.semiBold,
          styles.mr6,
          {
            color: colors.buttonText || '#FFFFFF',
          },
        ]}
      >
        {title}
      </Text>
      {showArrow && (
        <Text
          style={[
            styles.ts16,
            styles.bold,
            {
              color: colors.buttonText || '#FFFFFF',
            },
          ]}
        >
          →
        </Text>
      )}
    </Pressable>
  );
}
