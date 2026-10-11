import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../assets/colors/colors';
import styles from '../../assets/styles/styles';
import AuthButton from './AuthButton';
import { authApi } from '../../services/authApi';

/**
 * EmailOtpModal
 * Modal popup to enter and verify OTP sent to email.
 *
 * @param {Object} props
 * @param {boolean} props.visible - Modal visibility
 * @param {string} props.email - Target email address
 * @param {Function} props.onClose - Close modal handler
 * @param {Function} props.onVerified - Callback when OTP is verified
 * @param {Function} [props.onResend] - Optional resend OTP handler
 */
export default function EmailOtpModal({
  visible,
  email,
  onClose,
  onVerified,
  onResend,
}) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    let interval = null;
    if (visible) {
      setOtp('');
      setErrorMessage('');
      setResendTimer(30);
      interval = setInterval(() => {
        setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [visible]);

  const handleVerifyOtp = async () => {
    setErrorMessage('');
    if (!otp.trim()) {
      setErrorMessage('Please enter the OTP code');
      return;
    }

    try {
      setLoading(true);
      const verifyFn =
        authApi.verifyRegisterOtp || authApi.verifyOtp;
      if (typeof verifyFn === 'function') {
        await verifyFn({ email: email.trim(), otp: otp.trim() });
      }
      setLoading(false);
      if (onVerified) {
        onVerified(otp.trim());
      }
      onClose();
    } catch (error) {
      setLoading(false);
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Invalid OTP. Please check the code and try again.';
      setErrorMessage(message);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0 || resending) return;
    try {
      setResending(true);
      setErrorMessage('');
      if (onResend) {
        await onResend();
      } else {
        const sendFn = authApi.registerSendOtp || authApi.sendOtp;
        if (typeof sendFn === 'function') {
          await sendFn(email.trim());
        }
      }
      setResending(false);
      setResendTimer(30);
    } catch (error) {
      setResending(false);
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Failed to resend OTP';
      setErrorMessage(message);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
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
            maxWidth: 400,
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
          {/* Header Title */}
          <View style={{ marginBottom: 16 }}>
            <Text
              style={[
                styles.ts22,
                styles.bold,
                styles.mb6,
                { color: colors.bgAccent || '#132B2C' },
              ]}
            >
              Verify Email OTP
            </Text>
            <Text
              style={[
                styles.ts14,
                styles.regular,
                { color: colors.bodyText || '#687E7B', lineHeight: 20 },
              ]}
            >
              We have sent a verification code to{' '}
              <Text style={{ fontWeight: '700', color: colors.bgAccent || '#132B2C' }}>
                {email}
              </Text>
            </Text>
          </View>

          {/* Error Message Box */}
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

          {/* OTP Input Field */}
          <View
            style={[
              styles.rowCenter,
              styles.pdh16,
              styles.rounded12,
              {
                backgroundColor: '#FAF7F0',
                borderColor: '#E6DFC8',
                borderWidth: 1.5,
                height: 56,
                marginBottom: 14,
              },
            ]}
          >
            <TextInput
              style={{
                flex: 1,
                fontSize: 20,
                fontWeight: '700',
                letterSpacing: 8,
                textAlign: 'center',
                color: colors.bgAccent || '#132B2C',
                paddingVertical: 0,
              }}
              placeholder="••••••"
              placeholderTextColor="#B0BEBC"
              value={otp}
              onChangeText={(text) => {
                setOtp(text);
                if (errorMessage) setErrorMessage('');
              }}
              keyboardType="number-pad"
              maxLength={6}
              autoFocus
            />
          </View>

          {/* Resend OTP Row */}
          <View
            style={[
              styles.rowBetween,
              styles.mb14,
              { paddingHorizontal: 4 },
            ]}
          >
            <Text
              style={[
                styles.ts13,
                styles.regular,
                { color: colors.bodyText || '#687E7B' },
              ]}
            >
              Didn't receive code?
            </Text>
            <TouchableOpacity
              onPress={handleResendOtp}
              disabled={resendTimer > 0 || resending}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.ts13,
                  styles.bold,
                  {
                    color:
                      resendTimer > 0
                        ? '#A0ABA9'
                        : colors.bgAccent || '#132B2C',
                  },
                ]}
              >
                {resending
                  ? 'Sending...'
                  : resendTimer > 0
                  ? `Resend in ${resendTimer}s`
                  : 'Resend OTP'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View style={{ gap: 10, marginTop: 6 }}>
            <AuthButton
              title="Verify & Confirm"
              onPress={handleVerifyOtp}
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
              onPress={onClose}
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
      </KeyboardAvoidingView>
    </Modal>
  );
}
