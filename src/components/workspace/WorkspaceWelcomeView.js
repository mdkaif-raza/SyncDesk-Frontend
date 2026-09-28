import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { colors } from '../../assets/colors/colors';
import { icons } from '../../assets/icons';
import styles from '../../assets/styles/styles';

/**
 * WorkspaceWelcomeView (Step 1)
 * Welcome screen prompting user to Create or Join a workspace.
 *
 * @param {Object} props
 * @param {Function} props.onCreatePress - Handler for 'Create a workspace'
 * @param {Function} props.onJoinPress - Handler for 'Join a workspace'
 * @param {Function} [props.onMaybeLater] - Handler for 'Maybe later'
 */
export default function WorkspaceWelcomeView({
  onCreatePress,
  onJoinPress,
  onMaybeLater,
}) {
  return (
    <View
      style={[
        styles.flex1,
        {
          justifyContent: 'space-between',
          paddingVertical: 12,
        },
      ]}
    >
      {/* Top Brand Header */}
      <View style={[styles.rowCenter, styles.pdv14]}>
        <Image
          source={icons.authLogo}
          style={[
            styles.mr8,
            {
              height: 28,
              width: 28,
            },
          ]}
          resizeMode="contain"
        />
        <Text
          style={[
            styles.ts22,
            styles.bold,
            {
              color: colors.bgAccent || '#132B2C',
            },
          ]}
        >
          SyncDesk
        </Text>
      </View>

      {/* Center Welcome Content */}
      <View style={[styles.center, styles.pdh16]}>
        <Text
          style={[
            styles.ts28,
            styles.bold,
            styles.mb10,
            {
              color: colors.bgAccent || '#132B2C',
              textAlign: 'center',
            },
          ]}
        >
          Welcome to{'\n'}SyncDesk
        </Text>
        <Text
          style={[
            styles.ts15,
            styles.regular,
            {
              color: colors.bodyText || '#687E7B',
              lineHeight: 22,
              textAlign: 'center',
            },
          ]}
        >
          Bring your team, channels, and work together in one workspace.
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={{ gap: 14 }}>
        {/* Create a workspace Button */}
        <Pressable
          style={({ pressed }) => [
            styles.center,
            styles.rounded14,
            {
              backgroundColor: colors.bgAccent || '#132B2C',
              height: 52,
              opacity: pressed ? 0.88 : 1,
            },
          ]}
          onPress={onCreatePress}
          accessibilityRole="button"
        >
          <Text
            style={[
              styles.ts16,
              styles.bold,
              {
                color: '#FFFFFF',
              },
            ]}
          >
            Create a workspace
          </Text>
        </Pressable>

        {/* Join a workspace Button */}
        <Pressable
          style={({ pressed }) => [
            styles.center,
            styles.rounded14,
            {
              backgroundColor: '#FAF7F0',
              borderColor: '#E6DFC8',
              borderWidth: 1.5,
              height: 52,
              opacity: pressed ? 0.85 : 1,
            },
          ]}
          onPress={onJoinPress}
          accessibilityRole="button"
        >
          <Text
            style={[
              styles.ts16,
              styles.bold,
              {
                color: colors.bgAccent || '#132B2C',
              },
            ]}
          >
            Join a workspace
          </Text>
        </Pressable>

        {/* Maybe later */}
        <Pressable
          style={({ pressed }) => [
            styles.center,
            styles.pdv8,
            {
              opacity: pressed ? 0.6 : 1,
            },
          ]}
          onPress={onMaybeLater}
          accessibilityRole="button"
        >
          <Text
            style={[
              styles.ts14,
              styles.medium,
              {
                color: colors.bodyText || '#687E7B',
              },
            ]}
          >
            Maybe later
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
