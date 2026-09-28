import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  EditProfileHeader,
  ProfilePhotoEditor,
  ProfileInput,
} from '../../components/edit-profile';
import { useNavigation } from '../../navigation';
import { colors } from '../../assets/colors/colors';

const THEME = {
  bg: colors.screenBg,
  deepTeal: '#245F60',
  darkSlate: '#17383A',
  mutedText: '#788383',
  successGreen: '#2FA875',
  border: '#DED9CE',
};

/**
 * EditProfileScreen
 * Screen for editing personal user details with form validation, read-only email, and change photo action.
 */
export default function EditProfileScreen({
  initialProfile = {
    fullName: 'Alex Morgan',
    username: '@alexmorgan',
    phoneNumber: '+1 212 555 0184',
    location: 'New York',
    email: 'alex.morgan@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
  },
  onSave,
  onCancel,
  onBack,
}) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // Form State
  const [fullName, setFullName] = useState(initialProfile.fullName || 'Alex Morgan');
  const [username, setUsername] = useState(initialProfile.username || '@alexmorgan');
  const [phoneNumber, setPhoneNumber] = useState(
    initialProfile.phoneNumber || '+1 212 555 0184'
  );
  const [location, setLocation] = useState(initialProfile.location || 'New York');
  const [avatarUrl, setAvatarUrl] = useState(
    initialProfile.avatarUrl ||
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300'
  );

  // Status & Validation State
  const [errors, setErrors] = useState({});
  const [showSavedStatus, setShowSavedStatus] = useState(false);

  // Handle Photo Change
  const handleChangePhoto = () => {
    // Alternate sample photos or trigger image picker
    const sampleAvatars = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
    ];
    const nextPhoto =
      sampleAvatars.find((url) => url !== avatarUrl) || sampleAvatars[0];
    setAvatarUrl(nextPhoto);
  };

  // Validate form
  const validate = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!location.trim()) newErrors.location = 'Location is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save changes
  const handleSave = () => {
    if (!validate()) {
      return;
    }

    const updatedData = {
      ...initialProfile,
      fullName: fullName.trim(),
      username: username.trim().startsWith('@')
        ? username.trim()
        : `@${username.trim()}`,
      phoneNumber: phoneNumber.trim(),
      location: location.trim(),
      avatarUrl,
    };

    setShowSavedStatus(true);

    if (onSave) {
      onSave(updatedData);
    } else if (navigation?.navigate) {
      navigation.navigate('profile', { updatedProfile: updatedData });
    }
  };

  // Cancel action
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else if (onBack) {
      onBack();
    } else if (navigation?.goBack) {
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        { paddingTop: Math.max(insets.top, 14) },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor={THEME.bg} />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 24) + 16 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Header with Save Button */}
        <EditProfileHeader
          title="Edit profile"
          onBackPress={handleCancel}
          onSavePress={handleSave}
        />

        {/* 2. Profile Photo Editor */}
        <ProfilePhotoEditor
          photoUri={avatarUrl}
          onChangePhoto={handleChangePhoto}
        />

        {/* 3. Form Input Fields */}
        <ProfileInput
          icon="👤"
          label="Full name"
          value={fullName}
          onChangeText={(text) => {
            setFullName(text);
            if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: null }));
          }}
          placeholder="e.g. Alex Morgan"
          autoCapitalize="words"
          errorMessage={errors.fullName}
        />

        <ProfileInput
          icon="@"
          label="Username"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            if (errors.username) setErrors((prev) => ({ ...prev, username: null }));
          }}
          placeholder="e.g. @alexmorgan"
          errorMessage={errors.username}
        />

        <ProfileInput
          icon="📞"
          label="Phone number"
          value={phoneNumber}
          onChangeText={(text) => {
            setPhoneNumber(text);
            if (errors.phoneNumber)
              setErrors((prev) => ({ ...prev, phoneNumber: null }));
          }}
          placeholder="e.g. +1 212 555 0184"
          keyboardType="phone-pad"
          errorMessage={errors.phoneNumber}
        />

        <ProfileInput
          icon="📍"
          label="Location"
          value={location}
          onChangeText={(text) => {
            setLocation(text);
            if (errors.location) setErrors((prev) => ({ ...prev, location: null }));
          }}
          placeholder="e.g. New York"
          autoCapitalize="words"
          errorMessage={errors.location}
        />

        {/* 4. Read-Only Email Field */}
        <ProfileInput
          icon="✉"
          label="Email address"
          value={initialProfile.email || 'alex.morgan@example.com'}
          readOnly={true}
          helperText="Email cannot be changed here"
        />

        {/* 5. Changes Saved Locally Status Indicator */}
        <View style={styles.statusRow}>
          <View style={styles.checkCircle}>
            <Text style={styles.checkIcon}>✓</Text>
          </View>
          <Text style={styles.statusText}>Changes saved locally</Text>
        </View>

        {/* 6. Primary & Secondary Actions */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleSave}
          style={styles.saveChangesButton}
          accessibilityRole="button"
          accessibilityLabel="Save changes"
        >
          <Text style={styles.saveChangesText}>Save changes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleCancel}
          style={styles.cancelButton}
          accessibilityRole="button"
          accessibilityLabel="Cancel editing"
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.bg,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
    marginLeft: 2,
  },
  checkCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: THEME.deepTeal,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkIcon: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.darkSlate,
  },
  saveChangesButton: {
    backgroundColor: THEME.deepTeal,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#17383A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 12,
  },
  saveChangesText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.darkSlate,
  },
});
