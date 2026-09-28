import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const THEME = {
  darkSlate: '#17383A',
  cardBg: '#FFFDF8',
  mutedText: '#788383',
  border: '#DED9CE',
  divider: '#EFEAE0',
  errorRed: '#C85B59',
  errorBg: '#FBEBEA',
  errorBorder: '#F5D0CE',
};

/**
 * ProfileMenuSection
 * Renders a grouped menu section (e.g. Account, Preferences, or Danger logout row).
 */
export function ProfileMenuSection({
  title,
  items = [],
}) {
  return (
    <View style={styles.sectionContainer}>
      {/* Section Title Header */}
      {!!title && <Text style={styles.sectionTitle}>{title}</Text>}

      {/* Menu Items Container */}
      <View style={styles.menuCard}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isDanger = item.isDanger;

          if (isDanger) {
            return (
              <TouchableOpacity
                key={item.id || index}
                activeOpacity={0.75}
                onPress={item.onPress}
                style={[styles.dangerCard]}
                accessibilityRole="button"
                accessibilityLabel={item.label}
              >
                <View style={styles.itemLeft}>
                  <Text style={styles.dangerIcon}>{item.icon || '🚪'}</Text>
                  <Text style={styles.dangerLabel}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            );
          }

          return (
            <React.Fragment key={item.id || index}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={item.onPress}
                disabled={item.disabled}
                style={[
                  styles.menuItem,
                  item.disabled && styles.disabledMenuItem,
                ]}
                accessibilityRole="button"
                accessibilityLabel={item.label}
              >
                <View style={styles.itemLeft}>
                  <Text style={styles.itemIcon}>{item.icon}</Text>
                  <Text
                    style={[
                      styles.itemLabel,
                      item.disabled && styles.disabledLabel,
                    ]}
                  >
                    {item.label}
                  </Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>

              {!isLast && <View style={styles.divider} />}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.mutedText,
    marginBottom: 8,
    marginLeft: 2,
    textTransform: 'capitalize',
    letterSpacing: 0.2,
  },
  menuCard: {
    backgroundColor: THEME.cardBg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: THEME.border,
    overflow: 'hidden',
    shadowColor: '#17383A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  disabledMenuItem: {
    opacity: 0.7,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    fontSize: 18,
    marginRight: 14,
  },
  itemLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.darkSlate,
  },
  disabledLabel: {
    color: THEME.mutedText,
  },
  chevron: {
    fontSize: 20,
    color: '#9EAAA8',
    fontWeight: '400',
  },
  divider: {
    height: 1,
    backgroundColor: THEME.divider,
    marginHorizontal: 16,
  },
  dangerCard: {
    backgroundColor: THEME.errorBg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: THEME.errorBorder,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dangerIcon: {
    fontSize: 18,
    marginRight: 14,
    color: THEME.errorRed,
  },
  dangerLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.errorRed,
  },
});

export default ProfileMenuSection;
