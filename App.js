/**
 * SyncDesk Mobile Application Entry Point
 */

import React, { useEffect, useState } from 'react';
import storage from './src/utils/storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationProvider } from './src/navigation';
import { WorkspaceProvider, useWorkspace } from './src/context/WorkspaceContext';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import OnboardingScreen from './src/screens/Onboarding/OnboardingScreen';
import AuthScreen from './src/screens/auth/auth';
import WorkspaceScreen from './src/screens/workspace/workspace';
import HomeScreen from './src/screens/home/home';
import ChannelsScreen from './src/screens/channels/channels';
import MessagesScreen from './src/screens/messages/messages';
import TasksScreen from './src/screens/tasks/tasks';
import ProfileScreen from './src/screens/profile/ProfileScreen';
import { WorkspaceSwitcherModal } from './src/components/workspace';

function MainAppContent() {
  const [currentFlow, setCurrentFlow] = useState('splash'); // 'splash' | 'onboarding' | 'auth' | 'workspace' | 'app'
  const [currentTab, setCurrentTab] = useState('home'); // 'home' | 'channels' | 'messages' | 'tasks' | 'profile'
  const [workspaceInitialStep, setWorkspaceInitialStep] = useState('welcome');
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await storage.getToken();
        setHasToken(!!token);
      } catch (err) {
        console.warn('Failed to check stored auth token:', err);
        setHasToken(false);
      }
    };
    checkAuthStatus();
  }, []);

  const {
    activeWorkspaceName,
    activeWorkspaceRole,
    isSwitcherOpen,
    openSwitcher,
    closeSwitcher,
    createWorkspace,
  } = useWorkspace();

  const handleTabNavigation = (tabName) => {
    setCurrentTab(tabName.toLowerCase());
  };

  const handleQuickAction = (action) => {
    if (action.id === '2' || action.title === 'Join workspace') {
      openSwitcher();
    } else if (action.id === '1' || action.title === 'New channel') {
      setCurrentTab('channels');
    } else if (action.id === '3' || action.title === 'Invite team') {
      openSwitcher();
    }
  };

  return (
    <>
      {currentFlow === 'splash' && (
        <SplashScreen
          durationMs={2000}
          onSplashComplete={() => {
            if (hasToken) {
              setCurrentFlow('app');
              setCurrentTab('home');
            } else {
              setCurrentFlow('onboarding');
            }
          }}
        />
      )}

      {currentFlow === 'onboarding' && (
        <OnboardingScreen
          onComplete={() => setCurrentFlow('auth')}
        />
      )}

      {currentFlow === 'auth' && (
        <AuthScreen
          onAuthSuccess={(type, data) => {
            console.log(`Authenticated via ${type}:`, data);
            setWorkspaceInitialStep('welcome');
            setCurrentFlow('workspace');
          }}
          onSkip={() => {
            setCurrentFlow('app');
            setCurrentTab('home');
          }}
        />
      )}

      {currentFlow === 'workspace' && (
        <WorkspaceScreen
          initialStep={workspaceInitialStep}
          onComplete={(wsData) => {
            if (wsData?.workspaceName) {
              createWorkspace({
                name: wsData.workspaceName,
                description: wsData.description || '',
              });
            }
            setCurrentFlow('app');
            setCurrentTab('home');
          }}
          onBackToApp={() => {
            setCurrentFlow('app');
          }}
        />
      )}

      {currentFlow === 'app' && (
        <>
          {currentTab === 'home' && (
            <HomeScreen
              workspaceName={activeWorkspaceName}
              onNavigateTab={handleTabNavigation}
              onChannelPress={() => setCurrentTab('channels')}
              onQuickActionPress={handleQuickAction}
              onWorkspacePress={openSwitcher}
            />
          )}

          {currentTab === 'channels' && (
            <ChannelsScreen
              workspaceName={activeWorkspaceName}
              onNavigateTab={handleTabNavigation}
              onWorkspacePress={openSwitcher}
            />
          )}

          {currentTab === 'messages' && (
            <MessagesScreen
              workspaceName={activeWorkspaceName}
              onNavigateTab={handleTabNavigation}
            />
          )}

          {currentTab === 'tasks' && (
            <TasksScreen
              workspaceName={activeWorkspaceName}
              onNavigateTab={handleTabNavigation}
            />
          )}

          {currentTab === 'profile' && (
            <ProfileScreen
              workspaceName={activeWorkspaceName}
              role={activeWorkspaceRole}
              onNavigateTab={handleTabNavigation}
              onWorkspacePress={openSwitcher}
            />
          )}

          {/* Reusable Global Workspace Switcher Modal */}
          <WorkspaceSwitcherModal
            visible={isSwitcherOpen}
            onClose={closeSwitcher}
            onWorkspaceSelected={() => {
              setCurrentTab('home');
            }}
          />
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationProvider initialScreen="home">
        <WorkspaceProvider>
          <MainAppContent />
        </WorkspaceProvider>
      </NavigationProvider>
    </SafeAreaProvider>
  );
}
