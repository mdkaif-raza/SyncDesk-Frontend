import React from 'react';
import { Text, View } from 'react-native';
import MessageCard from './MessageCard';

/**
 * MessageList
 * Renders list of direct message conversation cards
 */
export default function MessageList({
  conversations = [],
  onConversationPress,
}) {
  if (conversations.length === 0) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 40,
        }}
      >
        <Text style={{ color: '#8A9995', fontSize: 14 }}>
          No conversations found
        </Text>
      </View>
    );
  }

  return (
    <View style={{ marginBottom: 20 }}>
      {conversations.map((item) => (
        <MessageCard
          key={item.id}
          conversation={item}
          onPress={onConversationPress}
        />
      ))}
    </View>
  );
}
