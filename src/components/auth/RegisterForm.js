import React, { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { colors } from '../../assets/colors/colors';
import { icons } from '../../assets/icons';
import styles from '../../assets/styles/styles';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';
import { authApi } from '../../services/authApi';

/**
 * RegisterForm
 * Form container for the Register screen tab using inline styles.
 *
 * @param {Object} props
 * @param {Function} props.onSubmit - Registration submission handler
 * @param {Function} props.onSwitchToLogin - Switch to login tab handler
 */
export default function RegisterForm({ onSubmit, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    uniqueId: '',
    password: '',
  });

  //passward visibility state
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Basic Client-side Validation
    if (!formData.fullName || !formData.email || !formData.password) {
      Alert.alert('Validation Error', 'Please fill all required fields');
      return;
    }
    try {
      setLoading(true);
      const response = await authApi.register(formData);
      setLoading(false);
      console.log(response);
      if (onSubmit) {
        onSubmit(response);
      }
    } catch (error) {
      setLoading(false);
      const apiErrorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'User registration failed';
      console.error('Registration error details:', {
        message: error.message,
        code: error.code,
        response: error.response?.data,
      });
      Alert.alert('Registration Failed', apiErrorMessage);
    }
  };

  return (
    <View style={{ gap: 14 }}>
      {/* Full Name */}
      <AuthInput
        iconSource={icons.authUser}
        placeholder="Full name"
        value={formData.fullName}
        onChangeText={(text) => setFormData({ ...formData, fullName: text })}
        autoCapitalize="words"
      />

      {/* Email */}
      <AuthInput
        iconSource={icons.authEmail}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Unique ID */}
      <AuthInput
        iconSource={icons.authIdCard}
        placeholder="Unique ID"
        value={formData.uniqueId}
        onChangeText={(text) => setFormData({ ...formData, uniqueId: text })}
        autoCapitalize="none"
      />

      {/* Password */}
      <AuthInput
        iconSource={icons.authLock}
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        isPassword={true}
        isPasswordVisible={isPasswordVisible}
        onTogglePassword={() => setIsPasswordVisible(!isPasswordVisible)}
      />

      {/* Create Account Button */}
      <AuthButton title="Create account" onPress={handleSubmit} />

      {/* Terms & Privacy Policy */}
      <Text
        style={[
          styles.ts12,
          styles.regular,
          styles.pdh12,
          styles.mt14,
          {
            color: colors.bodyText || '#687E7B',
            lineHeight: 18,
            textAlign: 'center',
          },
        ]}
      >
        By continuing, you agree to the{' '}
        <Text
          style={[
            styles.bold,
            {
              color: colors.bgAccent || '#132B2C',
            },
          ]}
        >
          Terms
        </Text>{' '}
        and{' '}
        <Text
          style={[
            styles.bold,
            {
              color: colors.bgAccent || '#132B2C',
            },
          ]}
        >
          Privacy Policy
        </Text>
      </Text>

      {/* Footer Switcher */}
      <View
        style={[
          styles.rowCenter,
          styles.mt18,
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
          Already have an account?
        </Text>
        <Pressable
          style={({ pressed }) => [
            styles.ml4,
            {
              opacity: pressed ? 0.7 : 1,
            },
          ]}
          onPress={onSwitchToLogin}
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
            Log in
          </Text>
        </Pressable>
      </View>
    </View>
  );
}


