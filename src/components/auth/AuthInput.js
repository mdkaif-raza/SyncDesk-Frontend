import React from 'react';
import { Image, Pressable, TextInput, View } from 'react-native';
import { colors } from '../../assets/colors/colors';
import { icons } from '../../assets/icons';
import styles from '../../assets/styles/styles';

/**
 * AuthInput
 * Input field with left icon, text input, optional right element, and password toggle.
 *
 * @param {Object} props
 * @param {any} [props.icon] - Left custom icon component
 * @param {any} [props.iconSource] - Left icon image required from assets/icons
 * @param {string} props.placeholder - Input placeholder text
 * @param {string} props.value - Text value
 * @param {Function} props.onChangeText - Text change handler
 * @param {boolean} [props.isPassword=false] - Password input mode
 * @param {boolean} [props.isPasswordVisible=false] - Password visibility state
 * @param {Function} [props.onTogglePassword] - Toggle visibility callback
 * @param {string} [props.keyboardType='default'] - Keyboard type
 * @param {string} [props.autoCapitalize='none'] - Auto capitalization
 * @param {React.ReactNode} [props.rightElement] - Optional custom right-aligned element
 * @param {boolean} [props.editable=true] - Whether input is editable
 * @param {Function} [props.onFocus] - Input focus handler
 * @param {Function} [props.onBlur] - Input blur handler
 */
export default function AuthInput({
  icon,
  iconSource,
  placeholder,
  value,
  onChangeText,
  isPassword = false,
  isPasswordVisible = false,
  onTogglePassword,
  keyboardType = 'default',
  autoCapitalize = 'none',
  rightElement,
  editable = true,
  onFocus,
  onBlur,
  ...rest
}) {
  return (
    <View
      style={[
        styles.row,
        styles.pdh16,
        styles.rounded12,
        {
          backgroundColor: editable ? '#FAF7F0' : '#F2ECE0',
          borderColor: '#E6DFC8',
          borderWidth: 1,
          height: 52,
        },
      ]}
    >
      {/* Left Input Icon */}
      {icon ? (
        <View
          style={[
            styles.mr10,
            {
              width: 20,
              height: 20,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
        >
          {icon}
        </View>
      ) : iconSource ? (
        <Image
          source={iconSource}
          style={[
            styles.mr10,
            {
              height: 20,
              width: 20,
            },
          ]}
          resizeMode="contain"
          tintColor={colors.bgAccent || '#132B2C'}
        />
      ) : null}

      {/* Main Text Input */}
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
        placeholder={placeholder}
        placeholderTextColor="#8E9E9B"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword && !isPasswordVisible}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        editable={editable}
        onFocus={onFocus}
        onBlur={onBlur}
        {...rest}
      />

      {/* Right Custom Element (e.g., Send OTP / Verify button) */}
      {rightElement ? (
        <View style={{ marginLeft: 8, justifyContent: 'center' }}>
          {rightElement}
        </View>
      ) : isPassword ? (
        /* Password Eye Toggle */
        <Pressable
          style={({ pressed }) => [
            styles.pd4,
            {
              opacity: pressed ? 0.6 : 1,
            },
          ]}
          onPress={onTogglePassword}
          accessibilityRole="button"
          accessibilityLabel="Toggle password visibility"
        >
          <Image
            source={icons.authEye}
            style={{
              height: 20,
              opacity: isPasswordVisible ? 0.35 : 1,
              width: 20,
            }}
            resizeMode="contain"
            tintColor="#8A9995"
          />
        </Pressable>
      ) : null}
    </View>
  );
}
