import React from 'react';
import { Pressable, Text, View } from 'react-native';
import styles from '../../assets/styles/styles';

/**
 * MessageCard
 * Spacious, beautifully aligned direct message row card
 */
export default function MessageCard({
  conversation,
  onPress,
}) {
  const {
    name,
    role,
    lastMessage,
    time,
    unread = 0,
    isOnline = true,
    avatarBg = '#D4A373',
    avatarEmoji = '👩🏻',
  } = conversation;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.rowBetween,
        styles.pd14,
        styles.mb12,
        {
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: 18,
          opacity: pressed ? 0.88 : 1,
        },
      ]}
      onPress={() => onPress && onPress(conversation)}
    >
      {/* 1. Left Avatar with Online Indicator */}
      <View style={{ position: 'relative', marginRight: 14 }}>
        <View
          style={[
            styles.center,
            {
              backgroundColor: avatarBg,
              borderRadius: 24,
              height: 48,
              width: 48,
            },
          ]}
        >
          <Text style={{ fontSize: 22 }}>{avatarEmoji}</Text>
        </View>

        {isOnline && (
          <View
            style={{
              backgroundColor: '#2E7D32',
              borderColor: '#EBE4D6',
              borderRadius: 7,
              borderWidth: 2,
              bottom: 0,
              height: 14,
              position: 'absolute',
              right: 0,
              width: 14,
            }}
          />
        )}
      </View>

      {/* 2. Center Message Details */}
      <View style={[styles.flex1, { justifyContent: 'center' }]}>
        {/* Top Line: Name & Time */}
        <View style={[styles.rowBetween, { alignItems: 'center', marginBottom: 2 }]}>
          <Text
            style={[
              styles.ts15,
              styles.bold,
              {
                color: '#132B2C',
                fontSize: 15.5,
              },
            ]}
          >
            {name}
          </Text>

          <Text
            style={[
              styles.ts11,
              styles.regular,
              {
                color: '#8A9995',
                fontSize: 11.5,
              },
            ]}
          >
            {time}
          </Text>
        </View>

        {/* Middle Line: Role Badge */}
        {role && (
          <View
            style={[
              styles.pdh8,
              styles.pdv2,
              {
                alignSelf: 'flex-start',
                backgroundColor: '#DDD5C4',
                borderRadius: 8,
                marginBottom: 4,
                marginTop: 2,
              },
            ]}
          >
            <Text
              style={{
                color: '#687E7B',
                fontSize: 10,
                fontWeight: '700',
              }}
            >
              {role}
            </Text>
          </View>
        )}

        {/* Bottom Line: Last Message Snippet */}
        <Text
          style={[
            styles.ts13,
            styles.regular,
            {
              color: unread > 0 ? '#132B2C' : '#687E7B',
              fontSize: 13,
              fontWeight: unread > 0 ? '600' : '400',
              lineHeight: 17,
            },
          ]}
          numberOfLines={1}
        >
          {lastMessage}
        </Text>
      </View>

      {/* 3. Right Status & Chevron */}
      <View style={[styles.rowCenter, { marginLeft: 10 }]}>
        {unread > 0 && (
          <View
            style={[
              styles.center,
              styles.mr6,
              {
                backgroundColor: '#1B3E3C',
                borderRadius: 11,
                height: 22,
                minWidth: 22,
                paddingHorizontal: 5,
              },
            ]}
          >
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 11,
                fontWeight: '700',
              }}
            >
              {unread}
            </Text>
          </View>
        )}

        <Text
          style={{
            color: '#8A9995',
            fontSize: 19,
            fontWeight: '500',
          }}
        >
          ›
        </Text>
      </View>
    </Pressable>
  );
}
