import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const THEME = {
  deepTeal: '#245F60',
  darkSlate: '#17383A',
  cardBg: '#FFFDF8',
  cardBgUnread: '#EAF5F2',
  mutedText: '#788383',
  border: '#DED9CE',
  borderUnread: '#CCE7E1',
  badgeBg: '#D4EDE8',
  badgeText: '#17383A',
};

/**
 * NotificationItem
 * Renders individual notification card with icon/avatar, title, preview, badge, time, and unread dot.
 */
export function NotificationItem({
  notification,
  onPress,
}) {
  const {
    id,
    type,
    title,
    highlight,
    preview,
    badge,
    time,
    isUnread,
    avatarUrl,
    badgeIcon,
  } = notification;

  // Render left icon / avatar based on notification type
  const renderLeftMedia = () => {
    if (avatarUrl) {
      return (
        <View style={styles.avatarContainer}>
          <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
          {!!badgeIcon && (
            <View style={styles.avatarBadgeOverlay}>
              <Text style={styles.avatarBadgeText}>{badgeIcon}</Text>
            </View>
          )}
        </View>
      );
    }

    if (type === 'task') {
      return (
        <View style={[styles.iconCircle, { backgroundColor: THEME.deepTeal }]}>
          <Text style={styles.iconCheckSymbol}>✓</Text>
        </View>
      );
    }

    if (type === 'join') {
      return (
        <View style={[styles.iconCircle, { backgroundColor: '#E8E2D5' }]}>
          <Text style={styles.iconSymbol}>👥</Text>
        </View>
      );
    }

    if (type === 'channel') {
      return (
        <View style={[styles.iconCircle, { backgroundColor: '#E8E2D5' }]}>
          <Text style={[styles.iconSymbol, { fontSize: 16, fontWeight: '700' }]}>#</Text>
        </View>
      );
    }

    return (
      <View style={[styles.iconCircle, { backgroundColor: '#E8E2D5' }]}>
        <Text style={styles.iconSymbol}>🔔</Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => onPress && onPress(id)}
      style={[
        styles.card,
        isUnread ? styles.unreadCard : styles.readCard,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${preview || ''}`}
    >
      {/* Left Media / Avatar / Icon */}
      {renderLeftMedia()}

      {/* Center Details */}
      <View style={styles.contentContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.titleText} numberOfLines={2}>
            {title}{' '}
            {!!highlight && (
              <Text style={styles.highlightText}>{highlight}</Text>
            )}
          </Text>
          <Text style={styles.timeText}>{time}</Text>
        </View>

        {/* Message Preview */}
        {!!preview && (
          <Text style={styles.previewText} numberOfLines={2}>
            {preview}
          </Text>
        )}

        {/* Optional Tag Badge (e.g. Due today) */}
        {!!badge && (
          <View style={styles.badgeContainer}>
            <View style={styles.tagBadge}>
              <Text style={styles.tagBadgeText}>{badge}</Text>
            </View>
          </View>
        )}
      </View>

      {/* Unread Indicator Dot */}
      {isUnread && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    position: 'relative',
    shadowColor: '#17383A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  unreadCard: {
    backgroundColor: THEME.cardBgUnread,
    borderColor: THEME.borderUnread,
  },
  readCard: {
    backgroundColor: THEME.cardBg,
    borderColor: THEME.border,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatarImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E2E8F0',
  },
  avatarBadgeOverlay: {
    position: 'absolute',
    bottom: -2,
    right: -4,
    backgroundColor: THEME.deepTeal,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  avatarBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconSymbol: {
    fontSize: 16,
    color: THEME.darkSlate,
  },
  iconCheckSymbol: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    paddingRight: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  titleText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: THEME.darkSlate,
    lineHeight: 18,
  },
  highlightText: {
    color: THEME.deepTeal,
    fontWeight: '700',
  },
  timeText: {
    fontSize: 11,
    color: THEME.mutedText,
    marginTop: 1,
  },
  previewText: {
    fontSize: 12,
    fontWeight: '400',
    color: THEME.mutedText,
    marginTop: 3,
    lineHeight: 16,
  },
  badgeContainer: {
    flexDirection: 'row',
    marginTop: 6,
  },
  tagBadge: {
    backgroundColor: THEME.badgeBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.badgeText,
  },
  unreadDot: {
    position: 'absolute',
    right: 14,
    bottom: 14,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: THEME.deepTeal,
  },
});

export default NotificationItem;
