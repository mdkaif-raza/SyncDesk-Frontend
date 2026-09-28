import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import styles from '../../assets/styles/styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * OnboardingIllustration
 * Renders the onboarding PNG image required from assets/images using inline styles.
 *
 * @param {Object} props
 * @param {any} props.source - Image asset required from assets/images
 * @param {Object} [props.style] - Optional styling override
 */
export default function OnboardingIllustration({ source, style }) {
  const imageSize = SCREEN_WIDTH - 64;

  return (
    <View
      style={[
        styles.flex1,
        styles.center,
        styles.pdv16,
      ]}
    >
      <Image
        source={source}
        style={[
          {
            height: imageSize,
            width: imageSize,
          },
          style,
        ]}
        resizeMode="contain"
      />
    </View>
  );
}
