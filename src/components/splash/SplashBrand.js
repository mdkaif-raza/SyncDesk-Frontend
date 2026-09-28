import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../assets/styles/styles';
import SyncDeskLogo from './SyncDeskLogo';

/**
 * SplashBrand
 * Combines the SyncDesk logo, brand title, and tagline with typography hierarchy using inline styles.
 *
 * @param {Object} props
 * @param {string} [props.brandName='SyncDesk'] - Primary brand text
 * @param {string} [props.tagline='Work together. Stay in sync.'] - Supporting tagline
 * @param {number} [props.logoSize=92] - Dimension of the logo mark
 * @param {string} [props.titleColor='#FFFFFF'] - Primary heading color
 * @param {string} [props.taglineColor='#DCE9E5'] - Tagline text color
 */
export default function SplashBrand({
  brandName = 'SyncDesk',
  tagline = 'Work together. Stay in sync.',
  logoSize = 92,
  titleColor = '#FFFFFF',
  taglineColor = '#DCE9E5',
}) {
  return (
    <View
      style={[
        styles.center,
        styles.pdh24,
      ]}
    >
      {/* SyncDesk Logo Mark */}
      <View
        style={[
          styles.center,
          {
            marginBottom: 26,
          },
        ]}
      >
        <SyncDeskLogo size={logoSize} />
      </View>

      {/* Brand Title */}
      <Text
        style={[
          styles.ts32,
          styles.bold,
          {
            color: titleColor,
            letterSpacing: 0.6,
            textAlign: 'center',
          },
        ]}
        accessibilityRole="header"
      >
        {brandName}
      </Text>

      {/* Brand Tagline */}
      <Text
        style={[
          styles.ts15,
          styles.regular,
          styles.mt8,
          {
            color: taglineColor,
            letterSpacing: 0.25,
            opacity: 0.9,
            textAlign: 'center',
          },
        ]}
      >
        {tagline}
      </Text>
    </View>
  );
}
