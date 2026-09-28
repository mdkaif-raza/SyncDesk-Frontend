import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from '../../assets/styles/styles';
import {
  HomeHeader,
  HomeGreeting,
  HomeWorkspaceCard,
  HomeRecentActivity,
  HomeChannelsSection,
} from '../../components/home';
import { Footer } from '../../components/footer';
import { useNavigation } from '../../navigation';
import { colors } from '../../assets/colors/colors';

/**
 * HomeScreen
 * SyncDesk Main Home Screen matching the reference mockup:
 * - Top header with user avatar, workspace dropdown switcher, notification bell with dot, search
 * - Welcome greeting headline "Good morning, Alex" with subtitle
 * - Warm sand/camel active workspace banner with team icon, channel count, and "Active workspace" green dot
 * - "Recent activity" section with user avatars, actions, #channel badges, and timestamps
 * - "Channels" section with hashtag square badges, channel names, descriptions, and chevrons
 * - Bottom tab navigation footer
 */
export default function HomeScreen({
  workspaceName = 'Engineering Team',
  userName = 'Alex',
  userAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  onChannelPress,
  onActivityPress,
  onQuickActionPress,
  onNavigateTab,
  onWorkspacePress,
  onNotificationPress,
  onSearchPress,
}) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleChannelClick = (channel) => {
    if (onChannelPress) {
      onChannelPress(channel);
    } else if (onNavigateTab) {
      onNavigateTab('channels');
    } else if (navigation?.navigate) {
      navigation.navigate('channels');
    }
  };

  const handleViewAllChannels = () => {
    if (onNavigateTab) {
      onNavigateTab('channels');
    } else if (navigation?.navigate) {
      navigation.navigate('channels');
    }
  };

  const handleRecentActivityClick = (item) => {
    if (onActivityPress) {
      onActivityPress(item);
    } else if (onNavigateTab) {
      onNavigateTab('channels');
    } else if (navigation?.navigate) {
      navigation.navigate('channels');
    }
  };

  const handleNotificationClick = () => {
    if (onNotificationPress) {
      onNotificationPress();
    } else if (onNavigateTab) {
      onNavigateTab('messages');
    } else if (navigation?.navigate) {
      navigation.navigate('messages');
    }
  };

  const handleSearchClick = () => {
    if (onSearchPress) {
      onSearchPress();
    } else if (onNavigateTab) {
      onNavigateTab('channels');
    } else if (navigation?.navigate) {
      navigation.navigate('channels');
    }
  };

  const handleAvatarClick = () => {
    if (onNavigateTab) {
      onNavigateTab('profile');
    } else if (navigation?.navigate) {
      navigation.navigate('profile');
    }
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.flex1,
        {
          backgroundColor: colors.screenBg || '#FAF8F5',
          paddingTop: Math.max(insets.top, 14),
          paddingBottom: 0,
        },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.screenBg || '#FAF8F5'}
      />

      <View style={[styles.flex1, { justifyContent: 'space-between' }]}>
        <ScrollView
          contentContainerStyle={[
            styles.pdh16,
            styles.pdb32,
            { paddingTop: 4 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* 1. Top Header Bar */}
          <HomeHeader
            workspaceName={workspaceName}
            userAvatar={userAvatar}
            onAvatarPress={handleAvatarClick}
            onWorkspacePress={onWorkspacePress}
            onNotificationPress={handleNotificationClick}
            onSearchPress={handleSearchClick}
          />

          {/* 2. Welcome Greeting */}
          <HomeGreeting userName={userName} />

          {/* 3. Active Workspace Banner Card */}
          <HomeWorkspaceCard
            workspaceName={workspaceName}
            channelCount={4}
            isActive={true}
            onPress={onWorkspacePress || handleViewAllChannels}
          />

          {/* 4. Recent Activity */}
          <HomeRecentActivity
            onViewAllPress={handleViewAllChannels}
            onActivityPress={handleRecentActivityClick}
            onChannelTagPress={handleChannelClick}
          />

          {/* 5. Channels Section */}
          <HomeChannelsSection
            onViewAllPress={handleViewAllChannels}
            onChannelPress={handleChannelClick}
          />
        </ScrollView>

        {/* 6. Footer Navigation Bar */}
        <Footer
          activeTab="Home"
          onTabChange={onNavigateTab}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
