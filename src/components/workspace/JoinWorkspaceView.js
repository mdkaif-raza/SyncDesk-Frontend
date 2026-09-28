import React, { useState } from 'react';
import {
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors } from '../../assets/colors/colors';
import { icons } from '../../assets/icons';
import styles from '../../assets/styles/styles';

/**
 * JoinWorkspaceView (Step 2B)
 * Join workspace using an invite code form.
 *
 * @param {Object} props
 * @param {Function} props.onBack - Go back to Welcome
 * @param {Function} props.onSubmit - Join workspace submit handler
 * @param {Function} props.onSwitchToCreate - Switch to create workspace view
 */
export default function JoinWorkspaceView({
  onBack,
  onSubmit,
  onSwitchToCreate,
}) {
  const [joinCode, setJoinCode] = useState('A1B2C3D4');

  const handleSubmit = () => {
    if (typeof onSubmit === 'function') {
      onSubmit({ joinCode });
    }
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
      <View>
        {/* Top Navigation Row: Back Arrow */}
        <Pressable
          style={({ pressed }) => [
            styles.pdv8,
            {
              alignSelf: 'flex-start',
              opacity: pressed ? 0.6 : 1,
            },
          ]}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Image
            source={icons.backArrow}
            style={{
              height: 22,
              width: 22,
            }}
            resizeMode="contain"
            tintColor={colors.bgAccent || '#132B2C'}
          />
        </Pressable>

        {/* Title Section */}
        <View style={[styles.mt18, styles.mb24]}>
          <Text
            style={[
              styles.ts28,
              styles.bold,
              styles.mb8,
              {
                color: colors.bgAccent || '#132B2C',
              },
            ]}
          >
            Join a workspace
          </Text>
          <Text
            style={[
              styles.ts15,
              styles.regular,
              {
                color: colors.bodyText || '#687E7B',
              },
            ]}
          >
            Enter the invite code shared by your admin.
          </Text>
        </View>

        {/* Join Code Field */}
        <View>
          <Text
            style={[
              styles.ts13,
              styles.semiBold,
              styles.mb6,
              {
                color: colors.bodyText || '#687E7B',
              },
            ]}
          >
            Join code
          </Text>
          <View
            style={[
              styles.row,
              styles.pdh16,
              styles.rounded12,
              {
                backgroundColor: '#FAF7F0',
                borderColor: '#E6DFC8',
                borderWidth: 1,
                height: 52,
              },
            ]}
          >
            <TextInput
              style={[
                styles.flex1,
                styles.ts16,
                styles.bold,
                {
                  color: colors.bgAccent || '#132B2C',
                  letterSpacing: 2,
                  paddingVertical: 0,
                },
              ]}
              placeholder="e.g. A1B2C3D4"
              placeholderTextColor="#8E9E9B"
              value={joinCode}
              onChangeText={(text) => setJoinCode(text.toUpperCase())}
              autoCapitalize="characters"
              autoCorrect={false}
            />
          </View>
        </View>
      </View>

      {/* Actions */}
      <View style={{ gap: 14 }}>
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
          onPress={handleSubmit}
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
            Join workspace
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.center,
            styles.pdv8,
            {
              opacity: pressed ? 0.7 : 1,
            },
          ]}
          onPress={onSwitchToCreate}
        >
          <Text
            style={[
              styles.ts14,
              styles.semiBold,
              {
                color: colors.bgAccent || '#132B2C',
              },
            ]}
          >
            Create a workspace instead
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
