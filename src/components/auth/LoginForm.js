import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '../../assets/colors/colors';
import { icons } from '../../assets/icons';
import styles from '../../assets/styles/styles';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';

/**
 * LoginForm
 * Form container for the Login screen tab using inline styles.
 *
 * @param {Object} props
 * @param {Function} props.onSubmit - Login submission handler
 * @param {Function} props.onSwitchToRegister - Switch to register tab handler
 */
export default function LoginForm({ onSubmit, onSwitchToRegister }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = () => {
    if (typeof onSubmit === 'function') {
      onSubmit({ identifier, password, rememberMe });
    }
  };

  return (
    <View style={{ gap: 14 }}>
      {/* Email or Unique ID */}
      <AuthInput
        iconSource={icons.authEmail}
        placeholder="Email or unique ID"
        value={identifier}
        onChangeText={setIdentifier}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password */}
      <AuthInput
        iconSource={icons.authLock}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        isPassword={true}
        isPasswordVisible={isPasswordVisible}
        onTogglePassword={() => setIsPasswordVisible(!isPasswordVisible)}
      />

      {/* Remember Me & Forgot Password Row */}
      <View
        style={[
          styles.rowBetween,
          styles.mt2,
          styles.mb6,
        ]}
      >
        <Pressable
          style={({ pressed }) => [
            styles.row,
            {
              opacity: pressed ? 0.75 : 1,
            },
          ]}
          onPress={() => setRememberMe(!rememberMe)}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: rememberMe }}
        >
          <View
            style={[
              styles.center,
              styles.mr8,
              styles.rounded4,
              {
                backgroundColor: rememberMe
                  ? colors.bgAccent || '#132B2C'
                  : 'transparent',
                borderColor: colors.bgAccent || '#132B2C',
                borderWidth: 1.5,
                height: 18,
                width: 18,
              },
            ]}
          >
            {rememberMe && (
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 11,
                  fontWeight: '800',
                }}
              >
                ✓
              </Text>
            )}
          </View>
          <Text
            style={[
              styles.ts14,
              styles.medium,
              {
                color: colors.bgAccent || '#132B2C',
              },
            ]}
          >
            Remember me
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.7 : 1,
            },
          ]}
          onPress={() => {}}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
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
            Forgot password?
          </Text>
        </Pressable>
      </View>

      {/* Log in Button */}
      <AuthButton title="Log in" onPress={handleSubmit} />

      {/* Divider */}
      <View
        style={[
          styles.rowCenter,
          styles.pdv8,
          {
            marginVertical: 12,
          },
        ]}
      >
        <View
          style={[
            styles.flex1,
            {
              backgroundColor: '#E6DFC8',
              height: 1,
            },
          ]}
        />
        <Text
          style={[
            styles.ts13,
            styles.regular,
            styles.pdh12,
            {
              color: '#8A9995',
            },
          ]}
        >
          or
        </Text>
        <View
          style={[
            styles.flex1,
            {
              backgroundColor: '#E6DFC8',
              height: 1,
            },
          ]}
        />
      </View>

      {/* Footer Switcher */}
      <View
        style={[
          styles.rowCenter,
          styles.mt14,
        ]}
      >
        <Text
          style={[
            styles.ts14,
            styles.regular,
            {
              color: colors.bodyText || '#687E7B',
            },
          ]}
        >
          New to SyncDesk?
        </Text>
        <Pressable
          style={({ pressed }) => [
            styles.ml4,
            {
              opacity: pressed ? 0.7 : 1,
            },
          ]}
          onPress={onSwitchToRegister}
        >
          <Text
            style={[
              styles.ts14,
              styles.bold,
              {
                color: colors.bgAccent || '#132B2C',
              },
            ]}
          >
            Create account
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
