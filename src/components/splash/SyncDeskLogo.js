import React from 'react';
import { Image, View } from 'react-native';
import { colors } from '../../assets/colors/colors';
import { icons } from '../../assets/icons';
import styles from '../../assets/styles/styles';

/**
 * SyncDeskLogo
 * Renders the official SyncDesk logo image mark with soft ambient glow using inline styles.
 *
 * @param {Object} props
 * @param {number} [props.size=100] - Logo dimension in pixels
 * @param {any} [props.source] - Optional custom image source override
 */
export default function SyncDeskLogo({
  size = 100,
  source = icons.logo,
}) {
  return (
    <View
      style={[
        styles.center,
        {
          height: size,
          position: 'relative',
          width: size,
        },
      ]}
      accessibilityRole="image"
      accessibilityLabel="SyncDesk Logo"
    >
      {/* Ambient soft glow backdrop */}
      <View
        style={{
          backgroundColor: colors.tealAccent || '#6FA4A1',
          borderRadius: (size * 1.35) / 2,
          height: size * 1.35,
          opacity: 0.22,
          position: 'absolute',
          width: size * 1.35,
        }}
      />

      {/* Official SyncDesk Logo Mark PNG */}
      <Image
        source={source}
        style={{
          height: size,
          position: 'relative',
          width: size,
        }}
        resizeMode="contain"
      />
    </View>
  );
}
