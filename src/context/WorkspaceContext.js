import React, { createContext, useContext, useState } from 'react';

/**
 * Initial Default Workspaces
 */
const INITIAL_WORKSPACES = [
  {
    id: 'ws-1',
    name: 'Engineering Team',
    role: 'Admin',
    description: 'Backend, frontend, and product collaboration.',
    joinCode: 'A1B2C3D4',
    isActive: true,
  },
  {
    id: 'ws-2',
    name: 'Marketing Team',
    role: 'Member',
    description: 'Growth, marketing campaigns, and design assets.',
    joinCode: 'M4R8K9T1',
    isActive: false,
  },
  {
    id: 'ws-3',
    name: 'Product Team',
    role: 'Member',
    description: 'Roadmaps, specs, user research, and releases.',
    joinCode: 'P9R2D5T7',
    isActive: false,
  },
];

const WorkspaceContext = createContext(null);

export function WorkspaceProvider({ children }) {
  const [workspaces, setWorkspaces] = useState(INITIAL_WORKSPACES);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState('ws-1');
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  // Active workspace object
  const activeWorkspace =
    workspaces.find((ws) => ws.id === activeWorkspaceId) || workspaces[0] || {
      id: 'ws-1',
      name: 'Engineering Team',
      role: 'Admin',
      joinCode: 'A1B2C3D4',
    };

  const openSwitcher = () => {
    setIsSwitcherOpen(true);
  };

  const closeSwitcher = () => {
    setIsSwitcherOpen(false);
  };

  const selectWorkspace = (workspaceId) => {
    setActiveWorkspaceId(workspaceId);
    setWorkspaces((prev) =>
      prev.map((ws) => ({
        ...ws,
        isActive: ws.id === workspaceId,
      }))
    );
    closeSwitcher();
  };

  const createWorkspace = ({ name, description }) => {
    const newId = `ws-${Date.now()}`;
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    const newWs = {
      id: newId,
      name: name.trim() || 'New Workspace',
      description: description.trim() || '',
      role: 'Admin',
      joinCode: code,
      isActive: true,
    };

    setWorkspaces((prev) => [
      ...prev.map((w) => ({ ...w, isActive: false })),
      newWs,
    ]);
    setActiveWorkspaceId(newId);
    return newWs;
  };

  const joinWorkspace = ({ joinCode, name = 'Joined Workspace' }) => {
    const codeUpper = (joinCode || 'A1B2C3D4').toUpperCase();
    const existing = workspaces.find((w) => w.joinCode === codeUpper);

    if (existing) {
      selectWorkspace(existing.id);
      return existing;
    }

    const newId = `ws-${Date.now()}`;
    const newWs = {
      id: newId,
      name: name || `Team (${codeUpper})`,
      description: 'Joined via invite code.',
      role: 'Member',
      joinCode: codeUpper,
      isActive: true,
    };

    setWorkspaces((prev) => [
      ...prev.map((w) => ({ ...w, isActive: false })),
      newWs,
    ]);
    setActiveWorkspaceId(newId);
    return newWs;
  };

  const value = {
    workspaces,
    activeWorkspace,
    activeWorkspaceName: activeWorkspace.name,
    activeWorkspaceRole: activeWorkspace.role,
    isSwitcherOpen,
    openSwitcher,
    closeSwitcher,
    selectWorkspace,
    createWorkspace,
    joinWorkspace,
  };

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}
