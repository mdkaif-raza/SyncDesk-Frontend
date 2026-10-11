import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { colors } from '../../assets/colors/colors';
import { icons } from '../../assets/icons';
import styles from '../../assets/styles/styles';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';
import EmailOtpModal from './EmailOtpModal';
import { authApi } from '../../services/authApi';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    phone: '',
    email: '',
    uniqueId: '',
    password: '',
    profileImage: null,
  });

  // password visibility & state
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // OTP Verification state
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const validateEmail = (val) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(val?.trim() || '');
  };

  const handleSendOtp = async () => {
    if (!formData.email?.trim()) {
      Alert.alert('Email Required', 'Please enter your email address to receive OTP');
      return;
    }
    if (!validateEmail(formData.email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    try {
      setOtpSending(true);
      const sendFn =await authApi.registerSendOtp(formData.email.trim()) || authApi.sendOtp;
      
      setOtpSending(false);
      setIsOtpModalVisible(true);
      const message =
        sendFn?.message ||
        sendFn?.data?.message ||
        'OTP has been sent to your email';
      console.log('OTP send sendFn:', sendFn, "and this is message message", message);
    } catch (error) {
      setOtpSending(false);
      const apiErrorMessage =
        error.sendFn?.data?.message ||
        error.sendFn?.data?.error ||
        error.message ||
        'Failed to send OTP. Please try again.';
      Alert.alert('OTP Error', apiErrorMessage);
    }
  };

  const handleSubmit = async () => {
    // Basic Client-side Validation
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.uniqueId.trim() ||
      !formData.password
    ) {
      Alert.alert(
        'Validation Error',
        'Please fill all required fields: Full Name, Email, Unique ID, and Password',
      );
      return;
    }
    try {
      setLoading(true);
      const payload = {
        username: formData.fullName.trim(),
        phoneNumber: formData.phone?.trim() || undefined,
        email: formData.email.trim().toLowerCase(),
        unique_Id: formData.uniqueId.trim(),
        password: formData.password,
        profilePicture: formData.profileImage || undefined,
      };
      const response = await authApi.register(payload);
      setLoading(false);
      console.log('Registration success:', response);
      if (onSubmit) {
        onSubmit(response);
      }
    } catch (error) {
      setLoading(false);
      const apiErrorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'User registration failed';
      console.error('Registration error details:', {
        message: error.message,
        code: error.code,
        response: error.response?.data,
      });
      Alert.alert('Registration Failed', apiErrorMessage);
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message:
              'SyncDesk needs access to your camera to take a profile photo',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const handlePickImage = () => {
    Alert.alert(
      'Profile Picture',
      'Choose an option to upload your profile photo',
      [
        {
          text: 'Take Photo',
          onPress: async () => {
            const hasPermission = await requestCameraPermission();
            if (!hasPermission) {
              Alert.alert(
                'Permission Denied',
                'Camera permission is required to take photos',
              );
              return;
            }
            launchCamera(
              {
                mediaType: 'photo',
                quality: 0.7,
                maxWidth: 400,
                maxHeight: 400,
                includeBase64: true,
                saveToPhotos: false,
              },
              (response) => {
                if (response.didCancel) return;
                if (response.errorCode) {
                  Alert.alert(
                    'Error',
                    response.errorMessage || 'Failed to capture photo',
                  );
                  return;
                }
                if (response.assets && response.assets.length > 0) {
                  const asset = response.assets[0];
                  const imageUri = asset.base64
                    ? `data:${asset.type || 'image/jpeg'};base64,${asset.base64}`
                    : asset.uri;
                  setFormData((prev) => ({
                    ...prev,
                    profileImage: imageUri,
                  }));
                }
              },
            );
          },
        },
        {
          text: 'Choose from Gallery',
          onPress: () => {
            launchImageLibrary(
              {
                mediaType: 'photo',
                quality: 0.7,
                maxWidth: 400,
                maxHeight: 400,
                includeBase64: true,
              },
              (response) => {
                if (response.didCancel) return;
                if (response.errorCode) {
                  Alert.alert(
                    'Error',
                    response.errorMessage || 'Failed to pick image',
                  );
                  return;
                }
                if (response.assets && response.assets.length > 0) {
                  const asset = response.assets[0];
                  const imageUri = asset.base64
                    ? `data:${asset.type || 'image/jpeg'};base64,${asset.base64}`
                    : asset.uri;
                  setFormData((prev) => ({
                    ...prev,
                    profileImage: imageUri,
                  }));
                }
              },
            );
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <View style={{ gap: 14 }}>
      {/* Profile Picture */}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 4,
        }}
      >
        <Pressable
          onPress={handlePickImage}
          style={{ position: 'relative', width: 88, height: 88 }}
        >
          <Image
            source={
              formData.profileImage
                ? { uri: formData.profileImage }
                : icons.profile
            }
            style={{
              width: 88,
              height: 88,
              borderRadius: 44,
              backgroundColor: '#EAE5DB',
              borderWidth: 2,
              borderColor: '#E6DFC8',
            }}
            resizeMode="cover"
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: colors.bgAccent || '#132B2C',
              borderRadius: 15,
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 2,
              borderColor: '#FFFFFF',
              elevation: 3,
            }}
          >
            <Icon name="camera" size={16} color="#FFFFFF" />
          </View>
        </Pressable>
      </View>

      {/* Full Name */}
      <AuthInput
        iconSource={icons.authUser}
        placeholder="Full name"
        value={formData.fullName}
        onChangeText={(text) => setFormData({ ...formData, fullName: text })}
        autoCapitalize="words"
      />

      {/* Phone Number */}
      <AuthInput
        icon={
          <Icon
            name="phone-outline"
            size={20}
            color={colors.bgAccent || '#132B2C'}
          />
        }
        placeholder="Phone Number"
        value={formData.phone}
        onChangeText={(text) => setFormData({ ...formData, phone: text })}
        keyboardType="phone-pad"
        autoCapitalize="none"
      />

      {/* Email with Send OTP / Verify Button */}
      <AuthInput
        iconSource={icons.authEmail}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => {
          setFormData({ ...formData, email: text });
          if (isEmailVerified) setIsEmailVerified(false);
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        rightElement={
          <TouchableOpacity
            activeOpacity={0.75}
            disabled={otpSending || isEmailVerified}
            onPress={handleSendOtp}
            style={{
              backgroundColor: isEmailVerified
                ? '#E2F3EB'
                : colors.bgAccent || '#132B2C',
              paddingHorizontal: 12,
              paddingVertical: 7,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 70,
            }}
          >
            {otpSending ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text
                style={{
                  color: isEmailVerified ? '#1B7340' : '#FFFFFF',
                  fontSize: 12,
                  fontWeight: '700',
                }}
              >
                {isEmailVerified ? '✓ Verified' : 'Verify'}
              </Text>
            )}
          </TouchableOpacity>
        }
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
      <AuthButton
        title="Create account"
        onPress={handleSubmit}
        loading={loading}
      />

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
      <View style={[styles.rowCenter, styles.mt18]}>
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

      {/* Email OTP Verification Modal */}
      <EmailOtpModal
        visible={isOtpModalVisible}
        email={formData.email.trim()}
        onClose={() => setIsOtpModalVisible(false)}
        onVerified={(verifiedOtp) => {
          setIsEmailVerified(true);
          Alert.alert('Email Verified', 'Your email has been verified successfully!');
        }}
        onResend={handleSendOtp}
      />
    </View>
  );
}
