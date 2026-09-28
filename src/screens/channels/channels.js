import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ChannelHeader,
  ChannelList,
  CreateChannelBar,
} from '../../components/channels';
import { Footer } from '../../components/footer';
import { colors } from '../../assets/colors/colors';

/**
 * ChannelsScreen
 * Main channels screen matching the exact design:
 * - Uses centralized screen background color (colors.screenBg = #FAF8F5)
 * - Large "Channels" title with "👥 Engineering Team ⌄" workspace pill dropdown
 * - Collapsible [#] Channels container
 * - Highlighted active dark teal channel (# general) with star, teal dot and count
 * - Clean white card items (# backend, # frontend, # ios, # design-review) with custom colored icons & lock
 * - Full-width dark teal "+ Create channel" pill button
 * - Preserved Footer navigation bar
 */
export default function ChannelsScreen({
  workspaceName = 'Engineering Team',
  onChannelPress,
  onCreateChannelPress,
  onNavigateTab,
  onWorkspacePress,
}) {
  const insets = useSafeAreaInsets();
  const [selectedChannelId, setSelectedChannelId] = useState('general');

  const [channelData, setChannelData] = useState([
    {
      id: 'general',
      name: 'general',
      description: 'Company-wide announcements and general discussion',
      count: 3,
      iconBg: '#277D77',
      iconSymbol: '#',
      isStarred: true,
    },
    {
      id: 'backend',
      name: 'backend',
      description: 'Node.js & MongoDB API discussion',
      count: 5,
      iconBg: '#8656CD',
      iconSymbol: '#',
      isStarred: false,
    },
    {
      id: 'frontend',
      name: 'frontend',
      description: 'React and CSS discussion',
      count: 2,
      iconBg: '#3F72D0',
      iconSymbol: '#',
      isStarred: false,
    },
    {
      id: 'ios',
      name: 'ios',
      description: 'Swift and iOS development',
      count: 2,
      iconBg: '#4182D2',
      iconSymbol: '#',
      isStarred: false,
    },
    {
      id: 'design-review',
      name: 'design-review',
      description: 'Design discussions and feedback',
      count: null,
      iconBg: '#5B6867',
      isLock: true,
      isStarred: false,
    },
  ]);

  const handleChannelSelect = (channel) => {
    setSelectedChannelId(channel.id);
    if (onChannelPress) {
      onChannelPress(channel);
    }
  };

  const handleCreateChannel = () => {
    if (onCreateChannelPress) {
      onCreateChannelPress();
    } else {
      Alert.alert('Create Channel', 'New channel modal will open here.');
    }
  };

  const handleWorkspaceSwitch = () => {
    if (onWorkspacePress) {
      onWorkspacePress();
    } else {
      Alert.alert('Switch Workspace', `Current workspace: ${workspaceName}`);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        {
          backgroundColor: colors.screenBg,
          paddingTop: Math.max(insets.top, 14),
        },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.screenBg}
      />

      <View style={styles.contentWrapper}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 1. Header with Channels Title, Profile Avatar & Workspace Dropdown */}
          <ChannelHeader
            workspaceName={workspaceName}
            onWorkspacePress={handleWorkspaceSwitch}
            onProfilePress={() => onNavigateTab && onNavigateTab('profile')}
          />

          {/* 2. Collapsible Channels Section with List Cards */}
          <ChannelList
            title="Channels"
            channels={channelData}
            activeChannelId={selectedChannelId}
            onChannelPress={handleChannelSelect}
          />

          {/* 3. "+ Create channel" Full-Width Dark Teal Action Button */}
          <CreateChannelBar
            onCreatePress={handleCreateChannel}
          />
        </ScrollView>

        {/* 4. Bottom Tab Navigation Footer */}
        <Footer
          activeTab="Channels"
          onTabChange={onNavigateTab}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 24,
  },
});
