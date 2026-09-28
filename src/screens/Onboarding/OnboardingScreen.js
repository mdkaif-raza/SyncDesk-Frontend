import React, { useState, useRef } from 'react';
import {
  View,
  FlatList,
  StatusBar,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import onboardingSlides from './onboardingData';

import {
  OnboardingHeader,
  OnboardingSlide,
  OnboardingPagination,
  OnboardingButton,
} from '../../components/onboarding';
import Colors from '../../assets/colors/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const onboardingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.warmCamel || '#F6F3EB',
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
});

/**
 * OnboardingScreen
 * 3-Screen swipeable carousel matching SyncDesk onboarding reference design.
 *
 * @param {Object} props
 * @param {Function} [props.onComplete] - Callback when onboarding is finished or skipped
 */
export default function OnboardingScreen({ onComplete }) {
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === onboardingSlides.length - 1;
  const currentSlide = onboardingSlides[currentIndex];

  // Scroll to index
  const scrollToIndex = (index) => {
    if (index >= 0 && index < onboardingSlides.length) {
      flatListRef.current?.scrollToIndex({ index, animated: true });
      setCurrentIndex(index);
    }
  };

  // Handle Next / Get Started action
  const handlePrimaryPress = () => {
    if (isLastSlide) {
      if (typeof onComplete === 'function') {
        onComplete();
      }
    } else {
      scrollToIndex(currentIndex + 1);
    }
  };

  // Handle Skip / Back action
  const handleSecondaryPress = () => {
    if (isFirstSlide) {
      // Skip straight to finish / login
      if (typeof onComplete === 'function') {
        onComplete();
      }
    } else {
      // Go back to previous slide
      scrollToIndex(currentIndex - 1);
    }
  };

  // Track swiped index from momentum
  const onMomentumScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    if (index !== currentIndex && index >= 0 && index < onboardingSlides.length) {
      setCurrentIndex(index);
    }
  };

  return (
    <View
      style={[
        onboardingStyles.container,
        {
          paddingTop: Math.max(insets.top, 16),
          paddingBottom: Math.max(insets.bottom, 20),
        },
      ]}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.warmCamel || '#F6F3EB'}
      />

      {/* Top Header */}
      <OnboardingHeader />

      {/* Swipeable Carousel */}
      <FlatList
        ref={flatListRef}
        data={onboardingSlides}
        renderItem={({ item }) => <OnboardingSlide item={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
      />

      {/* Bottom Section: Pagination & Actions */}
      <View style={onboardingStyles.bottomSection}>
        {/* Pagination Dots */}
        <OnboardingPagination
          total={onboardingSlides.length}
          activeIndex={currentIndex}
        />

        {/* Action Buttons Row */}
        <View style={onboardingStyles.actionsRow}>
          {/* Secondary Action: Skip (Slide 1) or Back (Slides 2 & 3) */}
          <OnboardingButton
            title={currentSlide.secondaryButtonText}
            onPress={handleSecondaryPress}
            isPrimary={false}
          />

          {/* Primary Action: Next → or Get started → */}
          <OnboardingButton
            title={currentSlide.primaryButtonText}
            onPress={handlePrimaryPress}
            isPrimary={true}
            showArrow={true}
          />
        </View>
      </View>
    </View>
  );
}
