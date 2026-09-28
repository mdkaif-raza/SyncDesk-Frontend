import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../assets/colors/colors';
import styles from '../../assets/styles/styles';
import {
  WorkspaceWelcomeView,
  CreateWorkspaceView,
  JoinWorkspaceView,
  WorkspaceReadyView,
} from '../../components/workspace';
import HomeScreen from '../home/home';

/**
 * WorkspaceScreen
 * 4-Step Workspace flow (Welcome -> Create / Join -> Confirm -> Enter Home)
 * with inline styling and modular sub-components.
 */
export default function WorkspaceScreen({
  initialStep = 'welcome',
  onComplete,
  onBackToApp,
}) {
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(initialStep); // 'welcome' | 'create' | 'join' | 'ready' | 'home'
  const [workspaceData, setWorkspaceData] = useState({
    workspaceName: 'Engineering Team',
    description: 'Backend, frontend, and product collaboration.',
    joinCode: 'A1B2C3D4',
    role: 'Admin',
  });

  const handleFinish = (data) => {
    if (onComplete) {
      onComplete(data || workspaceData);
    } else {
      setStep('home');
    }
  };

  const handleBackToApp = () => {
    if (onBackToApp) {
      onBackToApp();
    } else {
      handleFinish();
    }
  };

  const handleCreateSubmit = ({ workspaceName, description }) => {
    const updated = {
      ...workspaceData,
      workspaceName: workspaceName || 'Engineering Team',
      description,
      role: 'Admin',
    };
    setWorkspaceData(updated);
    setStep('ready');
  };

  const handleJoinSubmit = ({ joinCode }) => {
    const updated = {
      ...workspaceData,
      workspaceName: 'Engineering Team',
      joinCode: joinCode || 'A1B2C3D4',
      role: 'Member',
    };
    setWorkspaceData(updated);
    setStep('ready');
  };

  if (step === 'home') {
    return (
      <HomeScreen
        workspaceName={workspaceData.workspaceName}
      />
    );
  }

  return (
    <KeyboardAvoidingView
      style={[
        styles.flex1,
        {
          backgroundColor: colors.screenBg,
          paddingTop: Math.max(insets.top, 14),
          paddingBottom: Math.max(insets.bottom, 16),
        },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.screenBg}
      />

      <View style={[styles.flex1, styles.pdh24]}>
        {/* Step 1: Welcome */}
        {step === 'welcome' && (
          <WorkspaceWelcomeView
            onCreatePress={() => setStep('create')}
            onJoinPress={() => setStep('join')}
            onMaybeLater={handleBackToApp}
          />
        )}

        {/* Step 2A: Create Details */}
        {step === 'create' && (
          <CreateWorkspaceView
            onBack={() => setStep('welcome')}
            onSubmit={handleCreateSubmit}
          />
        )}

        {/* Step 2B: Join with Code */}
        {step === 'join' && (
          <JoinWorkspaceView
            onBack={() => setStep('welcome')}
            onSubmit={handleJoinSubmit}
            onSwitchToCreate={() => setStep('create')}
          />
        )}

        {/* Step 3: Confirm Workspace Ready */}
        {step === 'ready' && (
          <WorkspaceReadyView
            workspaceName={workspaceData.workspaceName}
            joinCode={workspaceData.joinCode}
            role={workspaceData.role}
            onContinue={() => handleFinish()}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

