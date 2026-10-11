import React, { useState } from 'react';
import { Alert, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../assets/colors/colors';
import { icons } from '../../assets/icons';
import styles from '../../assets/styles/styles';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';
import ForgotPasswordModal from './ForgotPasswordModal';
import { authApi } from '../../services/authApi';
import { useNavigation } from '../../navigation';

/**
 * LoginForm
 * Form container for the Login screen tab using inline styles.
 *
 * @param {Object} props
 * @param {Function} props.onSubmit - Login submission handler
 * @param {Function} props.onSwitchToRegister - Switch to register tab handler
 * @param {Function} props.onSkip - Skip to home handler
 */
export default function LoginForm({ onSubmit, onSwitchToRegister, onSkip, onScrollToInput }) {
  const navigation = useNavigation();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isForgotPasswordVisible, setIsForgotPasswordVisible] = useState(false);

  const handleSubmit = async () => {
    if (!identifier.trim() || !password) {
      Alert.alert(
        'Validation Error',
        'Please enter your email/ID and password',
      );
      return;
    }
    try {
      setLoading(true);
      const isEmail = identifier.includes('@');
      const payload = {
        identifier: identifier.trim(),
        email: identifier.trim().toLowerCase(),
        username: identifier.trim(),
        unique_id: identifier.trim(),
        unique_Id: identifier.trim(),
        uniqueId: identifier.trim(),
        password,
      };
      const response = await authApi.login(payload);
      console.log(
        'this is response from login:',
        JSON.stringify(response, null, 2),
      );
      setLoading(false);
      if (onSubmit) {
        onSubmit(response);
      }
    } catch (error) {
      setLoading(false);
      const apiErrorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Login failed';
      Alert.alert('Login Failed', apiErrorMessage);
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
        onFocus={() => onScrollToInput?.(50)}
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
        onFocus={() => onScrollToInput?.(120)}
      />

      {/* Remember Me & Forgot Password Row */}
      <View style={[styles.rowBetween, styles.mt2, styles.mb6]}>
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

        {/* Forgot Password Pressable */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            console.log('Opening Forgot Password Modal');
            setIsForgotPasswordVisible(true);
          }}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
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
        </TouchableOpacity>
      </View>

      {/* Log in Button */}
      <AuthButton title="Log in" onPress={handleSubmit} loading={loading} />

      {/* Skip to Home Button */}
      <Pressable
        style={({ pressed }) => [
          styles.center,
          styles.pdv10,
          styles.rounded12,
          {
            backgroundColor: '#F0EBE1',
            opacity: pressed ? 0.7 : 1,
          },
        ]}
        onPress={() => {
          if (typeof onSkip === 'function') {
            onSkip();
          } else if (typeof onSubmit === 'function') {
            onSubmit({});
          }
        }}
      >
        <Text
          style={[
            styles.ts14,
            styles.semiBold,
            { color: colors.bgAccent || '#132B2C' },
          ]}
        >
          Skip to Home →
        </Text>
      </Pressable>

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
      <View style={[styles.rowCenter, styles.mt14]}>
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

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        visible={isForgotPasswordVisible}
        onClose={() => setIsForgotPasswordVisible(false)}
      />
    </View>
  );
}

