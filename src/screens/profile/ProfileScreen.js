import React, { useState } from 'react';
import {
  Alert,
  Image,
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
  ProfileHeader,
  WorkspaceCard,
  ProfileMenuSection,
  BottomNavigation,
} from '../../components/profile';
import EditProfileScreen from '../EditProfile/EditProfileScreen';
import NotificationsScreen from '../Notifications/NotificationsScreen';
import { useNavigation } from '../../navigation';
import { colors } from '../../assets/colors/colors';

const THEME = {
  bg: colors.screenBg,
  deepTeal: '#245F60',
  darkSlate: '#17383A',
  mutedText: '#788383',
  border: '#DED9CE',
  successGreen: '#2FA875',
};

/**
 * ProfileScreen
 * Main profile screen for SyncDesk user identity, account settings, preferences, and navigation.
 */
export default function ProfileScreen({
  workspaceName = 'Engineering Team',
  role = 'Admin',
  onNavigateTab,
  onLogout,
  onWorkspacePress,
}) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // Active Sub-Screen View ('profile' | 'edit_profile' | 'notifications')
  const [currentView, setCurrentView] = useState('profile');

  // User Profile State
  const [userProfile, setUserProfile] = useState({
    fullName: 'Alex Morgan',
    username: '@alexmorgan',
    phoneNumber: '+1 212 555 0184',
    location: 'New York',
    email: 'alex.morgan@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    role: role,
    workspace: workspaceName,
  });

  // Handle Photo Picker Action
  const handlePhotoPicker = () => {
    const samplePhotos = [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
    ];
    const nextPhoto =
      samplePhotos.find((p) => p !== userProfile.avatarUrl) || samplePhotos[0];
    setUserProfile((prev) => ({ ...prev, avatarUrl: nextPhoto }));
  };

  // Handle Logout Action
  const handleLogoutPress = () => {
    if (onLogout) {
      onLogout();
    } else if (navigation?.navigate) {
      navigation.navigate('auth');
    }
  };

  // Handle Bottom Tab Navigation
  const handleTabChange = (tabName) => {
    if (onNavigateTab) {
      onNavigateTab(tabName);
    } else if (navigation?.setScreen) {
      navigation.setScreen(tabName.toLowerCase());
    }
  };

  // -------------------------------------------------------------
  // If user is inside Edit Profile sub-screen
  // -------------------------------------------------------------
  if (currentView === 'edit_profile') {
    return (
      <EditProfileScreen
        initialProfile={userProfile}
        onSave={(updatedData) => {
          setUserProfile((prev) => ({ ...prev, ...updatedData }));
          setCurrentView('profile');
        }}
        onCancel={() => setCurrentView('profile')}
        onBack={() => setCurrentView('profile')}
      />
    );
  }

  // -------------------------------------------------------------
  // If user is inside Notifications sub-screen
  // -------------------------------------------------------------
  if (currentView === 'notifications') {
    return (
      <NotificationsScreen
        onBack={() => setCurrentView('profile')}
        onNavigateTab={handleTabChange}
      />
    );
  }

  // -------------------------------------------------------------
  // Main Profile Screen
  // -------------------------------------------------------------
  const accountItems = [
    {
      id: 'edit_profile',
      label: 'Edit profile',
      icon: '👤',
      onPress: () => setCurrentView('edit_profile'),
    },
    {
      id: 'profile_photo',
      label: 'Profile photo',
      icon: '📷',
      onPress: handlePhotoPicker,
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: '🔔',
      onPress: () => setCurrentView('notifications'),
    },
    {
      id: 'security',
      label: 'Security',
      icon: '🛡️',
      onPress: () => {},
      disabled: false,
    },
  ];

  const preferenceItems = [
    {
      id: 'appearance',
      label: 'Appearance',
      icon: '🎨',
      onPress: () => {},
      disabled: false,
    },
    {
      id: 'language',
      label: 'Language',
      icon: '🌐',
      onPress: () => {},
      disabled: false,
    },
  ];

  const dangerItems = [
    {
      id: 'logout',
      label: 'Log out',
      icon: '🚪',
      isDanger: true,
      onPress: handleLogoutPress,
    },
  ];

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        { paddingTop: Math.max(insets.top, 14) },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor={THEME.bg} />

      <View style={styles.contentWrapper}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 1. Header with Back Arrow and 3-dot Menu */}
          <ProfileHeader
            title="Profile"
            onBackPress={() => {
              if (navigation?.goBack) navigation.goBack();
            }}
            onMenuPress={() => {}}
          />

          {/* 2. Profile Identity Section */}
          <View style={styles.identityContainer}>
            {/* Avatar Circle with Camera & Status Badge */}
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarInitials}>AM</Text>
              </View>

              {/* Status Green Dot & Camera Overlay */}
              <View style={styles.statusDot} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handlePhotoPicker}
                style={styles.cameraBadge}
                accessibilityRole="button"
                accessibilityLabel="Edit profile picture"
              >
                <Text style={styles.cameraIcon}>📷</Text>
              </TouchableOpacity>
            </View>

            {/* Name, Username, Email, Location */}
            <Text style={styles.userName}>{userProfile.fullName}</Text>
            <Text style={styles.userHandle}>{userProfile.username}</Text>

            <View style={styles.metaRow}>
              <Text style={styles.metaIcon}>✉</Text>
              <Text style={styles.metaText}>{userProfile.email}</Text>
            </View>

            <View style={styles.metaRow}>
              <Text style={styles.metaIcon}>📍</Text>
              <Text style={styles.metaText}>{userProfile.location}</Text>
            </View>
          </View>

          {/* 3. Workspace Card */}
          <WorkspaceCard
            workspaceName={workspaceName || userProfile.workspace}
            role={role || userProfile.role}
            onPress={onWorkspacePress}
          />

          {/* 4. Account Settings Section */}
          <ProfileMenuSection
            title="Account"
            items={accountItems}
          />

          {/* 5. Preferences Section */}
          <ProfileMenuSection
            title="Preferences"
            items={preferenceItems}
          />

          {/* 6. Danger Action (Log out) */}
          <ProfileMenuSection
            items={dangerItems}
          />
        </ScrollView>

        {/* 7. Bottom Navigation */}
        <BottomNavigation
          activeTab="Profile"
          onTabChange={handleTabChange}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.bg,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 20,
  },
  identityContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  avatarWrapper: {
    position: 'relative',
    width: 84,
    height: 84,
    marginBottom: 10,
  },
  avatarCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: THEME.darkSlate,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#17383A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  avatarInitials: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  statusDot: {
    position: 'absolute',
    bottom: 2,
    right: 28,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: THEME.successGreen,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    zIndex: 2,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: -2,
    right: 0,
    backgroundColor: '#EAE5DB',
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    zIndex: 3,
  },
  cameraIcon: {
    fontSize: 11,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: THEME.darkSlate,
    letterSpacing: -0.3,
  },
  userHandle: {
    fontSize: 13,
    color: THEME.mutedText,
    marginTop: 2,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  metaIcon: {
    fontSize: 13,
    marginRight: 6,
    color: THEME.mutedText,
  },
  metaText: {
    fontSize: 13,
    color: THEME.mutedText,
    fontWeight: '400',
  },
});
