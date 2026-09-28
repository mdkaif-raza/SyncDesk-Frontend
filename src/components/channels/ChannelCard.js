import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

/**
 * ChannelCard
 * Custom channel list item matching SyncDesk design:
 * - Active dark-teal state for featured/selected channels (e.g. # general) with star
 * - Clean white card state for other channels with custom colored icon squares
 * - Member/unread badge with status dot indicator
 * - Right chevron navigation indicator
 */
export default function ChannelCard({
  channel,
  isActive = false,
  onPress,
}) {
  const {
    id,
    name,
    description,
    count,
    iconBg = '#277D77',
    iconSymbol = '#',
    isLock = false,
    isStarred = false,
  } = channel;

  const active = isActive || channel.isActive;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.cardContainer,
        active ? styles.cardActive : styles.cardDefault,
        pressed && styles.cardPressed,
      ]}
      onPress={() => onPress && onPress(channel)}
      accessibilityRole="button"
      accessibilityLabel={`Channel ${name}`}
    >
      {/* Left Icon Square */}
      <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
        {isLock ? (
          <Text style={styles.lockIcon}>🔒</Text>
        ) : (
          <Text style={styles.hashSymbol}>{iconSymbol}</Text>
        )}
      </View>

      {/* Center Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.titleRow}>
          <Text
            style={[
              styles.channelTitle,
              active ? styles.channelTitleActive : styles.channelTitleDefault,
            ]}
            numberOfLines={1}
          >
            # {name}
          </Text>

          {isStarred && (
            <Text style={styles.starIcon}>★</Text>
          )}
        </View>

        {description ? (
          <Text
            style={[
              styles.description,
              active ? styles.descriptionActive : styles.descriptionDefault,
            ]}
            numberOfLines={2}
          >
            {description}
          </Text>
        ) : null}
      </View>

      {/* Right Indicator (Dot + Count + Chevron) */}
      <View style={styles.rightContainer}>
        {count !== undefined && count !== null ? (
          <View style={styles.countBadge}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: active ? '#4BB3A8' : '#288078' },
              ]}
            />
            <Text
              style={[
                styles.countText,
                active ? styles.countTextActive : styles.countTextDefault,
              ]}
            >
              {count}
            </Text>
          </View>
        ) : null}

        <Text
          style={[
            styles.chevron,
            active ? styles.chevronActive : styles.chevronDefault,
          ]}
        >
          ›
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginBottom: 10,
  },
  cardActive: {
    backgroundColor: '#173E3B',
    shadowColor: '#173E3B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  cardDefault: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.995 }],
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  hashSymbol: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  lockIcon: {
    fontSize: 16,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  channelTitle: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  channelTitleActive: {
    color: '#FFFFFF',
  },
  channelTitleDefault: {
    color: '#17383A',
  },
  starIcon: {
    color: '#F5B942',
    fontSize: 15,
    marginLeft: 6,
  },
  description: {
    fontSize: 12,
    lineHeight: 16,
    marginTop: 2,
  },
  descriptionActive: {
    color: '#A5C7C3',
  },
  descriptionDefault: {
    color: '#7C8885',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  countBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  countText: {
    fontSize: 13,
    fontWeight: '600',
  },
  countTextActive: {
    color: '#FFFFFF',
  },
  countTextDefault: {
    color: '#17383A',
  },
  chevron: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 2,
  },
  chevronActive: {
    color: '#A5C7C3',
  },
  chevronDefault: {
    color: '#9EAAA7',
  },
});
