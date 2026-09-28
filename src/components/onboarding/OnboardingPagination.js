import React from 'react';
import { View } from 'react-native';
import { colors } from '../../assets/colors/colors';
import styles from '../../assets/styles/styles';

/**
 * OnboardingPagination
 * Renders the 3-dot indicator showing the active slide using inline styles.
 *
 * @param {Object} props
 * @param {number} props.total - Total number of slides (3)
 * @param {number} props.activeIndex - Current active index (0, 1, or 2)
 */
export default function OnboardingPagination({ total = 3, activeIndex = 0 }) {
  return (
    <View
      style={[
        styles.rowCenter,
        styles.mb28,
      ]}
      accessibilityRole="tablist"
    >
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === activeIndex;
        return (
          <View
            key={`dot-${index}`}
            style={{
              backgroundColor: isActive
                ? colors.dotActive || '#132B2C'
                : colors.dotInactive || '#DCD5C7',
              borderRadius: 4,
              height: 8,
              marginHorizontal: 4,
              width: 8,
            }}
          />
        );
      })}
    </View>
  );
}
