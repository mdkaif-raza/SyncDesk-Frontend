import React, { useState } from 'react';
import {
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';
import { colors } from '../../assets/colors/colors';
import { icons } from '../../assets/icons';
import styles from '../../assets/styles/styles';

/**
 * WorkspaceReadyView (Step 3)
 * Confirmation screen showing workspace is ready with invite code.
 *
 * @param {Object} props
 * @param {string} [props.workspaceName='Engineering Team'] - Workspace name
 * @param {string} [props.joinCode='A1B2C3D4'] - Workspace invite code
 * @param {string} [props.role='Admin'] - User role
 * @param {Function} props.onContinue - Continue to workspace home
 */
export default function WorkspaceReadyView({
  workspaceName = 'Engineering Team',
  joinCode = 'A1B2C3D4',
  role = 'Admin',
  onContinue,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
      <View style={[styles.center, styles.mt24]}>
        {/* Large Check Circle Icon */}
        <View
          style={[
            styles.center,
            styles.mb20,
            {
              backgroundColor: colors.bgAccent || '#132B2C',
              borderRadius: 44,
              height: 88,
              width: 88,
            },
          ]}
        >
          <Image
            source={icons.flowCheck}
            style={{
              height: 48,
              width: 48,
            }}
            resizeMode="contain"
            tintColor="#FFFFFF"
          />
        </View>

        {/* Title & Subtitle */}
        <Text
          style={[
            styles.ts28,
            styles.bold,
            styles.mb8,
            {
              color: colors.bgAccent || '#132B2C',
              textAlign: 'center',
            },
          ]}
        >
          Workspace ready
        </Text>
        <Text
          style={[
            styles.ts15,
            styles.regular,
            styles.mb14,
            {
              color: colors.bodyText || '#687E7B',
              textAlign: 'center',
            },
          ]}
        >
          You are now part of{'\n'}
          <Text style={styles.bold}>{workspaceName}</Text>.
        </Text>

        {/* Role Pill Badge */}
        <View
          style={[
            styles.pdv4,
            styles.pdh16,
            styles.rounded20,
            {
              backgroundColor: '#EDE5D5',
              marginTop: 4,
            },
          ]}
        >
          <Text
            style={[
              styles.ts13,
              styles.bold,
              {
                color: colors.bgAccent || '#132B2C',
              },
            ]}
          >
            {role}
          </Text>
        </View>
      </View>

      <View>
        {/* Join Code Box */}
        <View
          style={[
            styles.rowBetween,
            styles.pd16,
            styles.rounded14,
            styles.mb20,
            {
              backgroundColor: '#FAF7F0',
              borderColor: '#E6DFC8',
              borderWidth: 1,
            },
          ]}
        >
          <View>
            <Text
              style={[
                styles.ts12,
                styles.semiBold,
                styles.mb4,
                {
                  color: colors.bodyText || '#687E7B',
                },
              ]}
            >
              Join code
            </Text>
            <Text
              style={[
                styles.ts20,
                styles.bold,
                {
                  color: colors.bgAccent || '#132B2C',
                  letterSpacing: 1.5,
                },
              ]}
            >
              {joinCode}
            </Text>
          </View>

          {/* Copy Button */}
          <Pressable
            style={({ pressed }) => [
              styles.center,
              styles.pd8,
              {
                opacity: pressed ? 0.6 : 1,
              },
            ]}
            onPress={handleCopy}
            accessibilityRole="button"
            accessibilityLabel="Copy join code"
          >
            <Image
              source={icons.flowCopy}
              style={{
                height: 24,
                width: 24,
              }}
              resizeMode="contain"
              tintColor={copied ? '#10B981' : colors.bgAccent || '#132B2C'}
            />
          </Pressable>
        </View>

        {/* Continue Button */}
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
          onPress={onContinue}
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
            Continue
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
