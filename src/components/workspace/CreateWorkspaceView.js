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
 * CreateWorkspaceView (Step 2A)
 * Create new workspace details form.
 *
 * @param {Object} props
 * @param {Function} props.onBack - Go back to Welcome
 * @param {Function} props.onSubmit - Create workspace submit handler
 */
export default function CreateWorkspaceView({ onBack, onSubmit }) {
  const [workspaceName, setWorkspaceName] = useState('Engineering Team');
  const [description, setDescription] = useState(
    'Backend, frontend, and product collaboration.'
  );

  const handleSubmit = () => {
    if (typeof onSubmit === 'function') {
      onSubmit({ workspaceName, description });
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
            Create your workspace
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
            Your team will use this space to collaborate.
          </Text>
        </View>

        {/* Form Fields */}
        <View style={{ gap: 18 }}>
          {/* Workspace Name */}
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
              Workspace name
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
                  styles.ts15,
                  styles.regular,
                  {
                    color: colors.bgAccent || '#132B2C',
                    paddingVertical: 0,
                  },
                ]}
                placeholder="e.g. Engineering Team"
                placeholderTextColor="#8E9E9B"
                value={workspaceName}
                onChangeText={setWorkspaceName}
              />
            </View>
          </View>

          {/* Description */}
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
              Description
            </Text>
            <View
              style={[
                styles.pd14,
                styles.rounded12,
                {
                  backgroundColor: '#FAF7F0',
                  borderColor: '#E6DFC8',
                  borderWidth: 1,
                  minHeight: 100,
                },
              ]}
            >
              <TextInput
                style={[
                  styles.ts15,
                  styles.regular,
                  {
                    color: colors.bgAccent || '#132B2C',
                    textAlignVertical: 'top',
                  },
                ]}
                placeholder="What is this workspace for?"
                placeholderTextColor="#8E9E9B"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Create workspace Button */}
      <Pressable
        style={({ pressed }) => [
          styles.center,
          styles.mt24,
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
          Create workspace
        </Text>
      </Pressable>
    </View>
  );
}
