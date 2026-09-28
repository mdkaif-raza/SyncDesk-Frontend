import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../assets/styles/styles';

/**
 * MessageTitle
 * Title & Subtitle for Messages Screen
 */
export default function MessageTitle({
  title = 'Direct Messages',
  subtitle = 'Chat 1:1 and collaborate with teammates',
}) {
  return (
    <View style={styles.mb14}>
      <Text
        style={[
          styles.ts28,
          styles.bold,
          {
            color: '#132B2C',
            fontSize: 27,
            letterSpacing: -0.4,
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.ts13,
          styles.regular,
          styles.mt2,
          {
            color: '#687E7B',
          },
        ]}
      >
        {subtitle}
      </Text>
    </View>
  );
}
