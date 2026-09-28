import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  StatusBar,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../assets/colors/colors';
import styles from '../../assets/styles/styles';
import SplashBrand from '../../components/splash/SplashBrand';
import SplashLoader from '../../components/splash/SplashLoader';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * SplashScreen
 * Main SyncDesk mobile startup splash screen using inline styling.
 *
 * @param {Object} props
 * @param {Function} [props.onSplashComplete] - Optional callback triggered after splash duration
 * @param {number} [props.durationMs] - Optional auto-dismiss duration in ms
 */
export default function SplashScreen({ onSplashComplete, durationMs }) {
  const insets = useSafeAreaInsets();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;
  const loaderFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Entrance animation: Fade in and subtle zoom-in
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 7,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(loaderFadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // 2. Optional navigation transition callback
    if (typeof onSplashComplete === 'function' && durationMs) {
      const timer = setTimeout(() => {
        onSplashComplete();
      }, durationMs);

      return () => clearTimeout(timer);
    }
  }, [fadeAnim, scaleAnim, loaderFadeAnim, onSplashComplete, durationMs]);

  return (
    <View
      style={[
        styles.flex1,
        styles.itemsCenter,
        {
          backgroundColor: colors.bgPrimary || '#132B2C',
          justifyContent: 'space-between',
          overflow: 'hidden',
          position: 'relative',
        },
      ]}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.bgPrimary || '#132B2C'}
        translucent
      />

      {/* Ambient background atmosphere */}
      <View
        style={{
          backgroundColor: colors.bgAccent || '#1F5B5B',
          borderRadius: (SCREEN_WIDTH * 1.4) / 2,
          height: SCREEN_WIDTH * 1.4,
          left: -SCREEN_WIDTH * 0.2,
          opacity: 0.12,
          position: 'absolute',
          top: -SCREEN_WIDTH * 0.4,
          width: SCREEN_WIDTH * 1.4,
        }}
      />
      <View
        style={{
          backgroundColor: colors.darkSlate || '#17383A',
          borderRadius: (SCREEN_WIDTH * 1.2) / 2,
          bottom: -SCREEN_WIDTH * 0.3,
          height: SCREEN_WIDTH * 1.2,
          opacity: 0.2,
          position: 'absolute',
          right: -SCREEN_WIDTH * 0.3,
          width: SCREEN_WIDTH * 1.2,
        }}
      />

      {/* Main Centered Content */}
      <Animated.View
        style={[
          styles.flex1,
          styles.center,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <SplashBrand
          brandName="SyncDesk"
          tagline="Work together. Stay in sync."
          titleColor={colors.white || '#FFFFFF'}
          taglineColor={colors.mutedLight || '#DCE9E5'}
          logoSize={Math.min(SCREEN_WIDTH * 0.26, 100)}
        />
      </Animated.View>

      {/* Bottom Loading Indicator */}
      <Animated.View
        style={[
          styles.center,
          {
            opacity: loaderFadeAnim,
            paddingBottom: Math.max(insets.bottom, 24) + 16,
          },
        ]}
      >
        <SplashLoader size={28} color={colors.warmCamel || '#E6DAC4'} dotCount={10} />
      </Animated.View>
    </View>
  );
}
