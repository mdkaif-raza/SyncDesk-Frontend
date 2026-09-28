import React, { useState } from 'react';
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
  MessageTitle,
  MessageSearch,
  MessageFilter,
  MessageList,
  NewMessageAction,
} from '../../components/messages';
import { Footer } from '../../components/footer';
import { useNavigation } from '../../navigation';
import { colors } from '../../assets/colors/colors';

/**
 * MessagesScreen
 * Direct Messages screen matching SyncDesk UI aesthetics:
 * - Title "Direct Messages" & subtitle
 * - Search bar for quick filtering
 * - Segmented tabs filter: [ All | Unread | Teammates ]
 * - Conversation cards with online status indicator, role badges, timestamps & unread counter
 * - Floating compose button and 'New direct message' action bar
 * - Preserved interactive Footer navigation bar
 */
export default function MessagesScreen({
  workspaceName = 'Engineering Team',
  onConversationPress,
  onComposePress,
  onNavigateTab,
}) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const allConversations = [
    {
      id: '1',
      name: 'Maya Lin',
      role: 'Product Lead',
      lastMessage: 'Great progress on the API fix! Let me know when staging is updated.',
      time: '10:24 AM',
      unread: 2,
      isOnline: true,
      avatarBg: '#D4A373',
      avatarEmoji: '👩🏻',
    },
    {
      id: '2',
      name: 'Jordan Rivera',
      role: 'Backend Engineer',
      lastMessage: 'Deployed to staging ✅ DB migration succeeded without downtime.',
      time: '9:42 AM',
      unread: 0,
      isOnline: true,
      avatarBg: '#5A837E',
      avatarEmoji: '👨🏽',
    },
    {
      id: '3',
      name: 'Riley Vance',
      role: 'UI/UX Designer',
      lastMessage: 'Added the latest mockups to Figma for review.',
      time: 'Yesterday',
      unread: 0,
      isOnline: false,
      avatarBg: '#B89F7D',
      avatarEmoji: '👱🏼',
    },
    {
      id: '4',
      name: 'Taylor Kim',
      role: 'DevOps Lead',
      lastMessage: 'Kubernetes cluster health check completed and passed all nodes.',
      time: 'Sep 21',
      unread: 0,
      isOnline: true,
      avatarBg: '#1D3F3D',
      avatarEmoji: '👩🏾',
    },
    {
      id: '5',
      name: 'Alex Morgan',
      role: 'QA Engineer',
      lastMessage: 'Smoke tests passing across Android & iOS test suites.',
      time: 'Sep 19',
      unread: 1,
      isOnline: false,
      avatarBg: '#A6926B',
      avatarEmoji: '👨🏻‍💻',
    },
  ];

  // Filtering by search & filter tabs
  const filteredConversations = allConversations.filter((conv) => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'Unread') {
      return conv.unread > 0;
    }
    if (activeFilter === 'Teammates') {
      return conv.isOnline;
    }
    return true;
  });

  return (
    <KeyboardAvoidingView
      style={[
        styles.flex1,
        {
          backgroundColor: colors.screenBg,
          paddingTop: Math.max(insets.top, 14),
          paddingBottom: 0,
        },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.screenBg}
      />

      <View style={[styles.flex1, { justifyContent: 'space-between' }]}>
        <ScrollView
          contentContainerStyle={[
            styles.pdh16,
            styles.pdb32,
            { paddingTop: 8 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* 1. Title & Subtitle */}
          <MessageTitle
            title="Direct Messages"
            subtitle="Chat 1:1 and collaborate with teammates"
          />

          {/* 3. Search Bar */}
          <MessageSearch
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {/* 4. Filter Tabs */}
          <MessageFilter
            activeFilter={activeFilter}
            onSelectFilter={setActiveFilter}
          />

          {/* 5. Messages List */}
          <MessageList
            conversations={filteredConversations}
            onConversationPress={onConversationPress}
          />

          {/* 6. Compose / Bottom Action */}
          <NewMessageAction
            onComposePress={onComposePress}
          />
        </ScrollView>

        {/* 7. Footer Navigation Bar */}
        <Footer
          activeTab="Messages"
          onTabChange={onNavigateTab}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
