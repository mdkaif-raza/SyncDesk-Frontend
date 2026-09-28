import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { icons } from '../../assets/icons';
import styles from '../../assets/styles/styles';

/**
 * HomeConversations
 * "Continue conversations" section listing active team channels
 */
export default function HomeConversations({
  conversations = [
    {
      id: '1',
      name: 'General',
      time: '10:24 AM',
      lastMessage: 'Maya: Great progress on the API fix!',
      iconBg: '#1D3F3D',
    },
    {
      id: '2',
      name: 'Backend team',
      time: '9:42 AM',
      lastMessage: 'Jordan: Deployed to staging ✅',
      iconBg: '#5A837E',
    },
    {
      id: '3',
      name: 'Design review',
      time: 'Yesterday',
      lastMessage: 'Riley: Added the latest mockups',
      iconBg: '#B89F7D',
    },
  ],
  onSeeAllPress,
  onChannelPress,
}) {
  return (
    <View style={styles.mb24}>
      {/* Section Header */}
      <View style={[styles.rowBetween, styles.mb12, { alignItems: 'center' }]}>
        <Text
          style={[
            styles.ts18,
            styles.bold,
            {
              color: '#132B2C',
              fontSize: 17,
            },
          ]}
        >
          Continue conversations
        </Text>
        <Pressable
          style={({ pressed }) => [
            styles.pd4,
            {
              opacity: pressed ? 0.7 : 1,
            },
          ]}
          onPress={onSeeAllPress}
        >
          <Text
            style={[
              styles.ts13,
              styles.bold,
              {
                color: '#1E4C49',
              },
            ]}
          >
            See all
          </Text>
        </Pressable>
      </View>

      {/* Conversation Channel Cards */}
      <View style={{ gap: 10 }}>
        {conversations.map((item) => (
          <Pressable
            key={item.id}
            style={({ pressed }) => [
              styles.rowBetween,
              styles.pd12,
              {
                alignItems: 'center',
                backgroundColor: '#ffffff',
                borderRadius: 16,
                opacity: pressed ? 0.88 : 1,
              },
            ]}
            onPress={() => onChannelPress && onChannelPress(item)}
          >
            <View style={[styles.row, styles.flex1, { alignItems: 'center' }]}>
              {/* Channel Hash Badge */}
              <View style={[styles.center, styles.mr12, { backgroundColor: item.iconBg, borderRadius: 18, height: 36, width: 36, }]}>
                <Image source={icons.flowChannelHash} style={{ height: 16, width: 16, }} resizeMode="contain"
                  tintColor="#FFFFFF"
                />
              </View>

              {/* Channel Details */}
              <View style={styles.flex1}>
                <View style={styles.rowBetween}>
                  <Text style={[styles.ts15, styles.bold, { color: '#132B2C', fontSize: 15, }]}>{item.name}</Text>
                  <Text style={[styles.ts11, styles.regular, { color: '#8A9995', fontSize: 11, }]}>{item.time}</Text>
                </View>

                <Text style={[styles.ts13, styles.regular, styles.mt2, { color: '#687E7B', fontSize: 12.5, }]} numberOfLines={1} >
                  {item.lastMessage}
                </Text>
              </View>
            </View>

            {/* Right Chevron */}
            <Text style={[styles.ml10, { color: '#8A9995', fontSize: 18, fontWeight: '500', }]}>›</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
