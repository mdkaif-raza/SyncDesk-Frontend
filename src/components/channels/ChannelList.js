import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ChannelCard from './ChannelCard';

/**
 * ChannelList
 * Collapsible Accordion Container holding the list of channels
 * - Top accordion header with [#] Channels icon and collapsible toggle ^
 * - List of styled ChannelCards (Active & Default states)
 */
export default function ChannelList({
  title = 'Channels',
  channels = [],
  activeChannelId = 'general',
  onChannelPress,
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <View style={styles.accordionContainer}>
      {/* Accordion Header */}
      <Pressable
        style={({ pressed }) => [
          styles.headerRow,
          pressed && styles.headerPressed,
        ]}
        onPress={() => setIsExpanded(!isExpanded)}
        accessibilityRole="button"
        accessibilityLabel={`${title} section, ${isExpanded ? 'expanded' : 'collapsed'}`}
      >
        <View style={styles.headerLeft}>
          <View style={styles.hashBadge}>
            <Text style={styles.hashSymbol}>#</Text>
          </View>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>

        <Text style={styles.toggleIcon}>{isExpanded ? '⌃' : '⌄'}</Text>
      </Pressable>

      {/* Expanded Channel List */}
      {isExpanded && (
        <View style={styles.listBody}>
          {channels.map((channel) => (
            <ChannelCard
              key={channel.id}
              channel={channel}
              isActive={channel.id === activeChannelId || channel.isActive}
              onPress={onChannelPress}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  accordionContainer: {
    backgroundColor: '#EFEAE0',
    borderRadius: 20,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E6E0D5',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingHorizontal: 4,
    marginBottom: 10,
  },
  headerPressed: {
    opacity: 0.7,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hashBadge: {
    width: 26,
    height: 26,
    borderRadius: 7,
    backgroundColor: '#DCD5C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  hashSymbol: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7775',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7775',
  },
  toggleIcon: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6B7775',
    marginRight: 4,
  },
  listBody: {
    marginTop: 2,
  },
});
