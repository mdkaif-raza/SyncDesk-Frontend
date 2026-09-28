import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const THEME = {
  deepTeal: '#245F60',
  darkSlate: '#17383A',
  border: '#DED9CE',
  avatarBg: '#EAE5DB',
};

/**
 * ProfilePhotoEditor
 * Circular avatar with camera overlay button and 'Change photo' text action.
 */
export function ProfilePhotoEditor({
  photoUri = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
  onChangePhoto,
}) {
  return (
    <View style={styles.container}>
      {/* Avatar with Camera Icon Overlay */}
      <View style={styles.avatarWrapper}>
        <Image
          source={{ uri: photoUri }}
          style={styles.avatarImage}
        />

        {/* Camera Overlay Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onChangePhoto}
          style={styles.cameraButton}
          accessibilityRole="button"
          accessibilityLabel="Change profile photo"
        >
          <Text style={styles.cameraIcon}>📷</Text>
        </TouchableOpacity>
      </View>

      {/* Change Photo Text Action */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onChangePhoto}
        style={styles.changeTextButton}
      >
        <Text style={styles.changePhotoText}>Change photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  avatarWrapper: {
    position: 'relative',
    width: 96,
    height: 96,
  },
  avatarImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: THEME.avatarBg,
    borderWidth: 1.5,
    borderColor: THEME.border,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: THEME.deepTeal,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#17383A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cameraIcon: {
    fontSize: 13,
  },
  changeTextButton: {
    marginTop: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  changePhotoText: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.deepTeal,
  },
});

export default ProfilePhotoEditor;
