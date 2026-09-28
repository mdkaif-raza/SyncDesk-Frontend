import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { colors } from '../../assets/colors/colors';
import styles from '../../assets/styles/styles';
import OnboardingIllustration from './OnboardingIllustration';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * OnboardingSlide
 * Renders the content for an individual onboarding slide using inline styles.
 *
 * @param {Object} props
 * @param {Object} props.item - Slide data object (title, subtitle, image)
 */
export default function OnboardingSlide({ item }) {
  return (
    <View
      style={[
        styles.pdh24,
        styles.pdt16,
        {
          justifyContent: 'space-between',
          width: SCREEN_WIDTH,
        },
      ]}
    >
      {/* Headings */}
      <View style={styles.mb16}>
        <Text
          style={[
            styles.ts28,
            styles.bold,
            styles.mb10,
            {
              color: colors.bgAccent || '#132B2C',
              lineHeight: 36,
            },
          ]}
        >
          {item.title}
        </Text>
        <Text
          style={[
            styles.ts15,
            styles.regular,
            {
              color: colors.bodyText || '#687E7B',
              lineHeight: 22,
            },
          ]}
        >
          {item.subtitle}
        </Text>
      </View>

      {/* Illustration */}
      <OnboardingIllustration source={item.image} />
    </View>
  );
}
