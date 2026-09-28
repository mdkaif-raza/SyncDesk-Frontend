import React from 'react';
import { Image, Text, View } from 'react-native';
import { colors } from '../../assets/colors/colors';
import { icons } from '../../assets/icons';
import styles from '../../assets/styles/styles';

/**
 * OnboardingHeader
 * Renders the centered SyncDesk brand mark and title at the top of onboarding.
 */
export default function OnboardingHeader() {
  return (
    <View
      style={[
        styles.rowCenter,
        styles.pdv12,
      ]}
      accessibilityRole="header"
    >
      <Image
        source={icons.logo}
        style={[
          styles.mr8,
          {
            height: 24,
            width: 24,
          },
        ]}
        resizeMode="contain"
      />
      <Text
        style={[
          styles.ts20,
          styles.bold,
          {
            color: colors.bgAccent || '#132B2C',
          },
        ]}
      >
        SyncDesk
      </Text>
    </View>
  );
}
