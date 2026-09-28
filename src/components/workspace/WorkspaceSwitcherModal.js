import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useWorkspace } from '../../context/WorkspaceContext';
import WorkspaceListItem from './WorkspaceListItem';

/**
 * WorkspaceSwitcherModal
 * Reusable Bottom Sheet / Modal supporting:
 * 1. "Your workspaces" list with active checkmark, role badges, and "+ Create or join workspace" button
 * 2. "Create or join workspace" choice view
 * 3. "Create your workspace" form
 * 4. "Join a workspace" form
 * 5. "Workspace ready" confirmation step
 */
export default function WorkspaceSwitcherModal({
  visible,
  onClose,
  onWorkspaceSelected,
}) {
  const {
    workspaces,
    activeWorkspace,
    selectWorkspace,
    createWorkspace,
    joinWorkspace,
  } = useWorkspace();

  // Internal modal view state: 'list' | 'choose' | 'create' | 'join' | 'ready'
  const [modalView, setModalView] = useState('list');
  const [newWsName, setNewWsName] = useState('');
  const [newWsDesc, setNewWsDesc] = useState('');
  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [readyWorkspace, setReadyWorkspace] = useState(null);
  const [copied, setCopied] = useState(false);

  // Reset internal view when closed/opened
  const handleModalClose = () => {
    setModalView('list');
    setNewWsName('');
    setNewWsDesc('');
    setJoinCodeInput('');
    setReadyWorkspace(null);
    if (onClose) onClose();
  };

  const handleSelect = (ws) => {
    selectWorkspace(ws.id);
    if (onWorkspaceSelected) onWorkspaceSelected(ws);
    handleModalClose();
  };

  const handleCreateSubmit = () => {
    const ws = createWorkspace({
      name: newWsName.trim() || 'New Workspace',
      description: newWsDesc.trim() || 'Team collaboration space.',
    });
    setReadyWorkspace(ws);
    setModalView('ready');
  };

  const handleJoinSubmit = () => {
    const ws = joinWorkspace({
      joinCode: joinCodeInput.trim() || 'A1B2C3D4',
      name: 'Engineering Team',
    });
    setReadyWorkspace(ws);
    setModalView('ready');
  };

  const handleContinueReady = () => {
    if (readyWorkspace) {
      selectWorkspace(readyWorkspace.id);
      if (onWorkspaceSelected) onWorkspaceSelected(readyWorkspace);
    }
    handleModalClose();
  };

  const handleCopyCode = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleModalClose}
    >
      <KeyboardAvoidingView
        style={styles.modalOverlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Backdrop tap to dismiss */}
        <Pressable
          style={styles.backdropPressable}
          onPress={handleModalClose}
        />

        {/* Bottom Sheet Card */}
        <View style={styles.sheetContainer}>
          {/* Top Drag Handle Indicator */}
          <View style={styles.dragHandle} />

          {/* ------------------------------------------------------------ */}
          {/* VIEW 1: Your Workspaces List */}
          {/* ------------------------------------------------------------ */}
          {modalView === 'list' && (
            <View style={styles.viewContent}>
              {/* Header with Title and Close X Button */}
              <View style={styles.headerRow}>
                <Text style={styles.modalTitle}>Your workspaces</Text>
                <Pressable
                  style={({ pressed }) => [
                    styles.closeButton,
                    pressed && styles.closeButtonPressed,
                  ]}
                  onPress={handleModalClose}
                  accessibilityRole="button"
                  accessibilityLabel="Close workspaces modal"
                >
                  <Text style={styles.closeIcon}>✕</Text>
                </Pressable>
              </View>

              {/* Workspaces Scrollable List */}
              <ScrollView
                style={styles.listScrollView}
                contentContainerStyle={styles.listScrollContent}
                showsVerticalScrollIndicator={false}
              >
                {workspaces.length === 0 ? (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                      You are currently in only one workspace.
                    </Text>
                  </View>
                ) : (
                  workspaces.map((ws) => (
                    <WorkspaceListItem
                      key={ws.id}
                      workspace={ws}
                      isActive={ws.id === activeWorkspace?.id}
                      onPress={() => handleSelect(ws)}
                    />
                  ))
                )}
              </ScrollView>

              {/* Bottom Primary Button */}
              <Pressable
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.primaryButtonPressed,
                ]}
                onPress={() => setModalView('choose')}
                accessibilityRole="button"
                accessibilityLabel="Create or join workspace"
              >
                <Text style={styles.primaryButtonText}>
                  + Create or join workspace
                </Text>
              </Pressable>
            </View>
          )}

          {/* ------------------------------------------------------------ */}
          {/* VIEW 2: Choose Create or Join */}
          {/* ------------------------------------------------------------ */}
          {modalView === 'choose' && (
            <View style={styles.viewContent}>
              <View style={styles.headerRow}>
                <Pressable
                  style={styles.backButton}
                  onPress={() => setModalView('list')}
                >
                  <Text style={styles.backIcon}>←</Text>
                </Pressable>
                <Text style={styles.modalTitle}>Create or join</Text>
                <Pressable
                  style={styles.closeButton}
                  onPress={handleModalClose}
                >
                  <Text style={styles.closeIcon}>✕</Text>
                </Pressable>
              </View>

              <Text style={styles.subTitleText}>
                Collaborate with a new team or enter an existing one with an invite code.
              </Text>

              <View style={styles.optionsWrapper}>
                {/* 1. Create Workspace Card */}
                <Pressable
                  style={({ pressed }) => [
                    styles.optionCard,
                    pressed && styles.optionCardPressed,
                  ]}
                  onPress={() => setModalView('create')}
                >
                  <View style={styles.optionLeft}>
                    <View style={styles.optionIconCircle}>
                      <Text style={styles.optionIconText}>+</Text>
                    </View>
                    <View>
                      <Text style={styles.optionTitle}>Create workspace</Text>
                      <Text style={styles.optionSubtitle}>
                        Set up a space for your team
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.optionChevron}>›</Text>
                </Pressable>

                {/* 2. Join Workspace Card */}
                <Pressable
                  style={({ pressed }) => [
                    styles.optionCard,
                    pressed && styles.optionCardPressed,
                  ]}
                  onPress={() => setModalView('join')}
                >
                  <View style={styles.optionLeft}>
                    <View style={styles.optionIconCircle}>
                      <Text style={styles.optionIconText}>👥</Text>
                    </View>
                    <View>
                      <Text style={styles.optionTitle}>Join workspace</Text>
                      <Text style={styles.optionSubtitle}>
                        Use an invite code from your admin
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.optionChevron}>›</Text>
                </Pressable>
              </View>
            </View>
          )}

          {/* ------------------------------------------------------------ */}
          {/* VIEW 3A: Create Workspace Form */}
          {/* ------------------------------------------------------------ */}
          {modalView === 'create' && (
            <View style={styles.viewContent}>
              <View style={styles.headerRow}>
                <Pressable
                  style={styles.backButton}
                  onPress={() => setModalView('choose')}
                >
                  <Text style={styles.backIcon}>←</Text>
                </Pressable>
                <Text style={styles.modalTitle}>Create workspace</Text>
                <Pressable
                  style={styles.closeButton}
                  onPress={handleModalClose}
                >
                  <Text style={styles.closeIcon}>✕</Text>
                </Pressable>
              </View>

              <Text style={styles.subTitleText}>
                Your team will use this space to collaborate and stay in sync.
              </Text>

              <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Workspace name</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="e.g. Design & UX Team"
                    placeholderTextColor="#9EA8A6"
                    value={newWsName}
                    onChangeText={setNewWsName}
                    autoFocus
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Description (optional)</Text>
                  <TextInput
                    style={[styles.textInput, styles.textArea]}
                    placeholder="What does your team collaborate on?"
                    placeholderTextColor="#9EA8A6"
                    value={newWsDesc}
                    onChangeText={setNewWsDesc}
                    multiline
                    numberOfLines={3}
                  />
                </View>
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.primaryButtonPressed,
                ]}
                onPress={handleCreateSubmit}
              >
                <Text style={styles.primaryButtonText}>Create workspace</Text>
              </Pressable>
            </View>
          )}

          {/* ------------------------------------------------------------ */}
          {/* VIEW 3B: Join Workspace Form */}
          {/* ------------------------------------------------------------ */}
          {modalView === 'join' && (
            <View style={styles.viewContent}>
              <View style={styles.headerRow}>
                <Pressable
                  style={styles.backButton}
                  onPress={() => setModalView('choose')}
                >
                  <Text style={styles.backIcon}>←</Text>
                </Pressable>
                <Text style={styles.modalTitle}>Join workspace</Text>
                <Pressable
                  style={styles.closeButton}
                  onPress={handleModalClose}
                >
                  <Text style={styles.closeIcon}>✕</Text>
                </Pressable>
              </View>

              <Text style={styles.subTitleText}>
                Enter the invite code shared by your administrator.
              </Text>

              <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Join code</Text>
                  <TextInput
                    style={[styles.textInput, styles.codeInput]}
                    placeholder="A1B2C3D4"
                    placeholderTextColor="#9EA8A6"
                    value={joinCodeInput}
                    onChangeText={(text) => setJoinCodeInput(text.toUpperCase())}
                    autoCapitalize="characters"
                    autoFocus
                  />
                </View>
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.primaryButtonPressed,
                ]}
                onPress={handleJoinSubmit}
              >
                <Text style={styles.primaryButtonText}>Join workspace</Text>
              </Pressable>

              <Pressable
                style={styles.switchLink}
                onPress={() => setModalView('create')}
              >
                <Text style={styles.switchLinkText}>
                  Create a workspace instead
                </Text>
              </Pressable>
            </View>
          )}

          {/* ------------------------------------------------------------ */}
          {/* VIEW 4: Workspace Ready Confirmation */}
          {/* ------------------------------------------------------------ */}
          {modalView === 'ready' && readyWorkspace && (
            <View style={styles.viewContent}>
              <View style={styles.centerReady}>
                <View style={styles.readyCheckCircle}>
                  <Text style={styles.readyCheckIcon}>✓</Text>
                </View>
                <Text style={styles.readyTitle}>Workspace ready</Text>
                <Text style={styles.readySubtitle}>
                  You are now part of{' '}
                  <Text style={styles.boldText}>{readyWorkspace.name}</Text>.
                </Text>

                <View style={styles.readyRoleBadge}>
                  <Text style={styles.readyRoleText}>{readyWorkspace.role}</Text>
                </View>

                {/* Join Code Box */}
                <View style={styles.joinCodeBox}>
                  <View>
                    <Text style={styles.joinCodeLabel}>Join code</Text>
                    <Text style={styles.joinCodeValue}>
                      {readyWorkspace.joinCode}
                    </Text>
                  </View>
                  <Pressable
                    style={styles.copyButton}
                    onPress={handleCopyCode}
                  >
                    <Text style={styles.copyText}>
                      {copied ? 'Copied ✓' : '📋 Copy'}
                    </Text>
                  </Pressable>
                </View>
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.primaryButtonPressed,
                ]}
                onPress={handleContinueReady}
              >
                <Text style={styles.primaryButtonText}>Continue</Text>
              </Pressable>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end',
  },
  backdropPressable: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: '#FAF8F5',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
    maxHeight: '85%',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 10,
  },
  dragHandle: {
    width: 44,
    height: 4.5,
    borderRadius: 3,
    backgroundColor: '#D6CDC0',
    alignSelf: 'center',
    marginBottom: 14,
  },
  viewContent: {
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 23,
    fontWeight: '800',
    color: '#17383A',
    letterSpacing: -0.4,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EAE4D6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonPressed: {
    backgroundColor: '#DFD8C9',
  },
  closeIcon: {
    fontSize: 13,
    color: '#4B5856',
    fontWeight: '700',
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EAE4D6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 16,
    color: '#17383A',
    fontWeight: '700',
  },
  listScrollView: {
    maxHeight: 280,
    marginBottom: 16,
  },
  listScrollContent: {
    paddingVertical: 2,
  },
  emptyContainer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#788383',
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#1E4E4C',
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1E4E4C',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  primaryButtonPressed: {
    backgroundColor: '#173E3C',
    transform: [{ scale: 0.99 }],
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  subTitleText: {
    fontSize: 13,
    color: '#687E7B',
    lineHeight: 18,
    marginBottom: 16,
  },
  optionsWrapper: {
    gap: 10,
    marginBottom: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ECE5D8',
    marginBottom: 10,
  },
  optionCardPressed: {
    backgroundColor: '#F7F3EB',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E4E4C',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionIconText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#17383A',
  },
  optionSubtitle: {
    fontSize: 12,
    color: '#687E7B',
    marginTop: 2,
  },
  optionChevron: {
    fontSize: 20,
    color: '#8A9995',
  },
  formContainer: {
    marginBottom: 18,
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#17383A',
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DED7CA',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#17383A',
  },
  textArea: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  codeInput: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 2,
    textAlign: 'center',
  },
  switchLink: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 6,
  },
  switchLinkText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E4E4C',
  },
  centerReady: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  readyCheckCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1E4E4C',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  readyCheckIcon: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: '800',
  },
  readyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#17383A',
    marginBottom: 4,
  },
  readySubtitle: {
    fontSize: 14,
    color: '#687E7B',
    textAlign: 'center',
    marginBottom: 10,
  },
  boldText: {
    fontWeight: '700',
    color: '#17383A',
  },
  readyRoleBadge: {
    backgroundColor: '#E4DDD0',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 18,
  },
  readyRoleText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4B5856',
  },
  joinCodeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DED7CA',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%',
    marginBottom: 16,
  },
  joinCodeLabel: {
    fontSize: 11,
    color: '#788383',
    fontWeight: '500',
  },
  joinCodeValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#17383A',
    letterSpacing: 1.5,
    marginTop: 2,
  },
  copyButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#EFE8DE',
    borderRadius: 8,
  },
  copyText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E4E4C',
  },
});
