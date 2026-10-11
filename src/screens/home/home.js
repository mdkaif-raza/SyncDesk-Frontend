import React, {useEffect,useState,} from 'react';
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
import authApi from '../../services/authApi';
import storage from '../../utils/storage';


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

  useEffect(() => {
    const checkStorage = async () => {
      const token = await storage.getToken();
      const user2 = await storage.getUser();
      console.log('this is user from asyncstrage', user2);
      console.log('this is token get from asyncsotage', token);
    };
    checkStorage();
  }, []);

    const[user, setUser]=useState(null);
    const[loading, setLoading]= useState(true);
  
    useEffect(()=>{
      async function featchUser(params) {
        try {
           const token = await storage.getToken();
          const userData= await authApi.getUserProfile(token);
          setUser(userData);
        } catch (error) {
          console.log('could not load profile', error);
          } finally {
          setLoading(false);
      }
  }
  featchUser();
  },[]);
    const displayName =  user?.userName || user?.data?.userName;

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
          <HomeGreeting userName={displayName} />

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
