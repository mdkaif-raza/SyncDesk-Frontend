import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import styles from '../../assets/styles/styles';

/**
 * SplashLoader
 * Subtle circular dotted loading indicator with smooth 360-degree rotation using inline styles.
 *
 * @param {Object} props
 * @param {number} [props.size=32] - Diameter of loader ring
 * @param {string} [props.color='#E6DAC4'] - Dot color
 * @param {number} [props.dotCount=8] - Number of circular dots
 */
export default function SplashLoader({
  size = 32,
  color = '#E6DAC4',
  dotCount = 8,
}) {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinLoop = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spinLoop.start();

    return () => spinLoop.stop();
  }, [spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const radius = size / 2 - 3;
  const dotSize = Math.max(3, size / 10);

  const dots = Array.from({ length: dotCount }, (_, index) => {
    const angle = (index * 2 * Math.PI) / dotCount;
    const x = radius + radius * Math.cos(angle);
    const y = radius + radius * Math.sin(angle);
    const opacity = 0.2 + (index / dotCount) * 0.8;

    return (
      <View
        key={`loader-dot-${index}`}
        style={{
          backgroundColor: color,
          borderRadius: dotSize / 2,
          height: dotSize,
          left: x,
          opacity,
          position: 'absolute',
          top: y,
          width: dotSize,
        }}
      />
    );
  });

  return (
    <View
      style={[
        styles.center,
        {
          height: size,
          width: size,
        },
      ]}
      accessibilityRole="progressbar"
      accessibilityLabel="Loading SyncDesk"
    >
      <Animated.View
        style={{
          height: size,
          position: 'relative',
          transform: [{ rotate: spin }],
          width: size,
        }}
      >
        {dots}
      </Animated.View>
    </View>
  );
}
