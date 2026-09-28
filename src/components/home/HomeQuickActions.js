import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { icons } from '../../assets/icons';
import styles from '../../assets/styles/styles';

/**
 * HomeQuickActions
 * "Quick actions" 3-card horizontal row
 * - New channel (+)
 * - Join workspace (flowWorkspace)
 * - Invite team (members)
 */
export default function HomeQuickActions({
  actions = [
    {
      id: '1',
      title: 'New channel',
      subtitle: 'Start a channel',
      isPlus: true,
    },
    {
      id: '2',
      title: 'Join workspace',
      subtitle: 'Find a team',
      icon: icons.flowWorkspace,
    },
    {
      id: '3',
      title: 'Invite team',
      subtitle: 'Grow together',
      icon: icons.members,
    },
  ],
  onActionPress,
}) {
  return (
    <View>
      <Text
        style={[
          styles.ts18,
          styles.bold,
          styles.mb12,
          {
            color: '#132B2C',
            fontSize: 17,
          },
        ]}
      >
        Quick actions
      </Text>

      {/* 3 Quick Action Cards */}
      <View style={[styles.rowBetween, { gap: 8 }]}>
        {actions.map((action) => (
          <Pressable
            key={action.id}
            style={({ pressed }) => [
              styles.flex1,
              styles.center,
              styles.pd12,
              {
                backgroundColor: '#EBE4D6',
                borderRadius: 16,
                minHeight: 112,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
            onPress={() => onActionPress && onActionPress(action)}
          >
            {/* Action Icon Circle */}
            <View
              style={[
                styles.center,
                styles.mb8,
                {
                  backgroundColor: '#132B2C',
                  borderRadius: 18,
                  height: 36,
                  width: 36,
                },
              ]}
            >
              {action.isPlus ? (
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 20,
                    fontWeight: '600',
                    lineHeight: 22,
                  }}
                >
                  +
                </Text>
              ) : (
                <Image
                  source={action.icon}
                  style={{
                    height: 18,
                    width: 18,
                  }}
                  resizeMode="contain"
                  tintColor="#FFFFFF"
                />
              )}
            </View>

            {/* Title & Subtitle */}
            <Text
              style={[
                styles.ts13,
                styles.bold,
                styles.mb2,
                {
                  color: '#132B2C',
                  fontSize: 12.5,
                  textAlign: 'center',
                },
              ]}
            >
              {action.title}
            </Text>
            <Text
              style={[
                styles.ts11,
                styles.regular,
                {
                  color: '#687E7B',
                  fontSize: 11,
                  textAlign: 'center',
                },
              ]}
            >
              {action.subtitle}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
