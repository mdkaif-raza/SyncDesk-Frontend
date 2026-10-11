import React, { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../assets/colors/colors';
import styles from '../../assets/styles/styles';
import {
  AuthHeader,
  AuthTabs,
  LoginForm,
  RegisterForm,
} from '../../components/auth';

/**
 * AuthScreen
 * Clean authentication screen with Login & Register tabs using utility & inline styles.
 *
 * @param {Object} props
 * @param {Function} [props.onAuthSuccess] - Callback when user logs in or registers
 */
export default function AuthScreen({ onAuthSuccess }) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const scrollViewRef = useRef(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSubscription = Keyboard.addListener(showEvent, (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleScrollToOffset = (yOffset) => {
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: yOffset, animated: true });
      }
    }, 120);
  };

  const handleLoginSubmit = (credentials) => {
    if (typeof onAuthSuccess === 'function') {
      onAuthSuccess('login', credentials);
    }
  };

  const handleRegisterSubmit = (userData) => {
    if (typeof onAuthSuccess === 'function') {
      onAuthSuccess('register', userData);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.flex1,
        {
          backgroundColor: colors.warmCamel || '#F8F4EC',
          paddingTop: Math.max(insets.top, 14),
        },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.warmCamel || '#F8F4EC'}
      />

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={[
          styles.pdh24,
          {
            flexGrow: 1,
            paddingBottom:
              keyboardHeight > 0
                ? keyboardHeight + 140
                : Math.max(insets.bottom, 24) + 40,
          },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <View>
          {/* Top Brand Header */}
          <AuthHeader />

          {/* Dynamic Title Section */}
          <View
            style={[
              styles.mt18,
              styles.mb20,
            ]}
          >
            <Text
              style={[
                styles.ts28,
                styles.bold,
                styles.mb8,
                {
                  color: colors.bgAccent || '#132B2C',
                },
              ]}
            >
              {activeTab === 'login'
                ? 'Welcome back'
                : 'Create your account'}
            </Text>
            <Text
              style={[
                styles.ts15,
                styles.regular,
                {
                  color: colors.bodyText || '#687E7B',
                },
              ]}
            >
              {activeTab === 'login'
                ? 'Sign in to continue to your workspace'
                : 'Start collaborating with your team'}
            </Text>
          </View>

          {/* Segmented Switcher Tabs */}
          <AuthTabs activeTab={activeTab} onSelectTab={setActiveTab} />

          {/* Form Content */}
          {activeTab === 'login' ? (
            <LoginForm
              onSubmit={handleLoginSubmit}
              onSwitchToRegister={() => setActiveTab('register')}
              onScrollToInput={handleScrollToOffset}
            />
          ) : (
            <RegisterForm
              onSubmit={handleRegisterSubmit}
              onSwitchToLogin={() => setActiveTab('login')}
              onScrollToInput={handleScrollToOffset}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
