import React from 'react';
import { Pressable, Text, View } from 'react-native';
import styles from '../../assets/styles/styles';

/**
 * HomeHeroCard
 * Dark teal hero card featuring:
 * - Concentric decorative curves
 * - 'YOUR WORKSPACE' uppercase label
 * - Workspace Name
 * - Overlapping member avatars stack + '+8' badge
 * - '12 members' label
 * - Circular arrow action button (->)
 */
export default function HomeHeroCard({
  workspaceName = 'Engineering Team',
  memberCount = 12,
  onCardPress,
  onArrowPress,
}) {
  const avatars = [
    { bg: '#C59A6D', label: '👨🏽' },
    { bg: '#708E88', label: '👩🏻' },
    { bg: '#A6926B', label: '👱🏼' },
    { bg: '#8B6F58', label: '👩🏾' },
  ];

  return (
    <Pressable
      style={({ pressed }) => [
        styles.pd16,
        styles.mb24,
        {
          backgroundColor: '#1B3E3C',
          borderRadius: 20,
          opacity: pressed ? 0.95 : 1,
          overflow: 'hidden',
          position: 'relative',
        },
      ]}
      onPress={onCardPress}
    >
      {/* Layered concentric curved graphic rings */}
      <View
        style={{
          borderColor: '#264E4B',
          borderRadius: 130,
          borderWidth: 26,
          bottom: -50,
          height: 260,
          opacity: 0.45,
          position: 'absolute',
          right: -35,
          width: 260,
        }}
      />
      <View
        style={{
          borderColor: '#2F5C59',
          borderRadius: 100,
          borderWidth: 20,
          bottom: -30,
          height: 200,
          opacity: 0.35,
          position: 'absolute',
          right: -20,
          width: 200,
        }}
      />

      {/* Workspace Tag & Title */}
      <Text
        style={[
          styles.ts11,
          styles.bold,
          styles.mb6,
          {
            color: '#9DBBB7',
            letterSpacing: 1.1,
            textTransform: 'uppercase',
          },
        ]}
      >
        YOUR WORKSPACE
      </Text>

      <Text
        style={[
          styles.ts22,
          styles.bold,
          styles.mb14,
          {
            color: '#FFFFFF',
            letterSpacing: -0.3,
          },
        ]}
      >
        {workspaceName}
      </Text>

      {/* Members Avatar Stack & Action Arrow */}
      <View style={[styles.rowBetween, { alignItems: 'flex-end' }]}>
        <View>
          {/* Overlapping Avatars */}
          <View style={[styles.row, styles.mb6]}>
            {avatars.map((avatar, idx) => (
              <View
                key={`avatar-${idx}`}
                style={[
                  styles.center,
                  {
                    backgroundColor: avatar.bg,
                    borderColor: '#1B3E3C',
                    borderRadius: 15,
                    borderWidth: 2,
                    height: 30,
                    marginLeft: idx === 0 ? 0 : -8,
                    width: 30,
                  },
                ]}
              >
                <Text style={{ fontSize: 13 }}>{avatar.label}</Text>
              </View>
            ))}

            {/* +8 Count badge */}
            <View
              style={[
                styles.center,
                {
                  backgroundColor: '#264E4B',
                  borderColor: '#1B3E3C',
                  borderRadius: 15,
                  borderWidth: 2,
                  height: 30,
                  marginLeft: -8,
                  width: 30,
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
                +8
              </Text>
            </View>
          </View>

          <Text
            style={[
              styles.ts12,
              styles.regular,
              {
                color: '#CCDCD9',
              },
            ]}
          >
            {memberCount} members
          </Text>
        </View>

        {/* Circular Arrow Button */}
        <Pressable
          style={({ pressed }) => [
            styles.center,
            {
              backgroundColor: '#2A5452',
              borderRadius: 20,
              height: 40,
              opacity: pressed ? 0.75 : 1,
              width: 40,
            },
          ]}
          onPress={onArrowPress || onCardPress}
          accessibilityRole="button"
          accessibilityLabel="Enter workspace"
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 18,
              fontWeight: '700',
            }}
          >
            →
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
}
