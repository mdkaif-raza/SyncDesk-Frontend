import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import { colors } from '../../assets/colors/colors';
import { icons } from '../../assets/icons';
import styles from '../../assets/styles/styles';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';
import { authApi } from '../../services/authApi';

/**
 * ForgotPasswordModal
 * A clean modal for users to enter their email and receive a password reset link.
 *
 * @param {Object} props
 * @param {boolean} props.visible - Whether modal is visible
 * @param {Function} props.onClose - Callback to close modal
 */
export default function ForgotPasswordModal({ visible, onClose }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [serverMessage, setServerMessage] = useState('');

  const handleClose = () => {
    setEmail('');
    setErrorMessage('');
    setServerMessage('');
    setIsSuccess(false);
    setLoading(false);
    onClose();
  };

  const validateEmail = (val) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(val.trim());
  };

  const handleSendResetLink = async () => {
    setErrorMessage('');
    if (!email.trim()) {
      setErrorMessage('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      const apiFn = authApi.forgotPassword || authApi.forgetPassword;
      const response = await apiFn(email.trim());
      console.log('this is response:', response);
      setLoading(false);
      setServerMessage(
        response?.message ||
        'If this email exists, a reset password link has been sent to your email.'
      );
      setIsSuccess(true);
    } catch (error) {
      setLoading(false);
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Failed to send reset link. Please check your email and try again.';
      setErrorMessage(message);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={[
          styles.flex1,
          styles.center,
          {
            backgroundColor: 'rgba(19, 43, 44, 0.65)',
            padding: 20,
          },
        ]}
      >
        <View
          style={{
            width: '100%',
            maxWidth: 420,
            backgroundColor: colors.warmCamel || '#F8F4EC',
            borderRadius: 20,
            padding: 24,
            borderWidth: 1,
            borderColor: '#E6DFC8',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.15,
            shadowRadius: 16,
            elevation: 10,
          }}
        >
          {isSuccess ? (
            /* Success State */
            <View style={{ alignItems: 'center', paddingVertical: 10 }}>
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: '#E2F3EB',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 16,
                }}
              >
                <Text style={{ fontSize: 28, color: '#1B7340' }}>✓</Text>
              </View>

              <Text
                style={[
                  styles.ts20,
                  styles.bold,
                  styles.mb8,
                  { color: colors.bgAccent || '#132B2C', textAlign: 'center' },
                ]}
              >
                Check Your Email
              </Text>

              <Text
                style={[
                  styles.ts14,
                  styles.regular,
                  styles.mb20,
                  {
                    color: colors.bodyText || '#687E7B',
                    textAlign: 'center',
                    lineHeight: 20,
                  },
                ]}
              >
                {serverMessage}
              </Text>

              <View style={{ width: '100%', marginTop: 8 }}>
                <AuthButton
                  title="Back to Login"
                  onPress={handleClose}
                />
              </View>
            </View>
          ) : (
            /* Email Input State */
            <View>
              {/* Header Title */}
              <View style={{ marginBottom: 18 }}>
                <Text
                  style={[
                    styles.ts22,
                    styles.bold,
                    styles.mb6,
                    { color: colors.bgAccent || '#132B2C' },
                  ]}
                >
                  Forgot Password?
                </Text>
                <Text
                  style={[
                    styles.ts14,
                    styles.regular,
                    { color: colors.bodyText || '#687E7B', lineHeight: 20 },
                  ]}
                >
                  Enter the email address associated with your account and we’ll send you a password reset link.
                </Text>
              </View>

              {/* Error Alert Box */}
              {errorMessage ? (
                <View
                  style={{
                    backgroundColor: '#FDE8E8',
                    borderColor: '#F8B4B4',
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 10,
                    marginBottom: 14,
                  }}
                >
                  <Text style={{ color: '#9B1C1C', fontSize: 13, fontWeight: '500' }}>
                    {errorMessage}
                  </Text>
                </View>
              ) : null}

              {/* Email Input Field */}
              <AuthInput
                iconSource={icons.authEmail}
                placeholder="Enter your email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errorMessage) setErrorMessage('');
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {/* Action Buttons */}
              <View style={{ marginTop: 14, gap: 10 }}>
                <AuthButton
                  title="Send Reset Link"
                  onPress={handleSendResetLink}
                  loading={loading}
                />

                <Pressable
                  style={({ pressed }) => [
                    styles.center,
                    styles.pdv12,
                    styles.rounded12,
                    {
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}
                  onPress={handleClose}
                  disabled={loading}
                >
                  <Text
                    style={[
                      styles.ts14,
                      styles.semiBold,
                      { color: colors.bodyText || '#687E7B' },
                    ]}
                  >
                    Cancel
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
