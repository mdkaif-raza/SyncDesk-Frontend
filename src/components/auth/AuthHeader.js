import React from 'react';
import { Image, Text, View } from 'react-native';
import { colors } from '../../assets/colors/colors';
import { icons } from '../../assets/icons';
import styles from '../../assets/styles/styles';

/**
 * AuthHeader
 * Top brand header with desk logo mark and SyncDesk brand title.
 */
export default function AuthHeader() {
  return (
    <View style={[styles.rowCenter, styles.pdv14]} accessibilityRole="header">
      <Image
        source={icons.authLogo}
        style={[
          styles.mr8,
          {
            height: 28,
            width: 28,
          },
        ]}
        resizeMode="contain"
      />
      <Text
        style={[
          styles.ts22,
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
