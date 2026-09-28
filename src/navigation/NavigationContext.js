import React, { createContext, useContext, useState } from 'react';

/**
 * NavigationContext
 * Lightweight, robust navigation system providing:
 * - navigation.navigate('ScreenName', params)
 * - navigation.goBack()
 * - currentScreen
 */
const NavigationContext = createContext(null);

export function NavigationProvider({
  initialScreen = 'home',
  children,
}) {
  const [history, setHistory] = useState([initialScreen]);
  const [params, setParams] = useState({});

  const currentScreen = history[history.length - 1];

  const navigate = (screenName, screenParams = {}) => {
    setParams(screenParams);
    setHistory((prev) => {
      // Map display tab names to lower-case screen keys
      const normalized = screenName.toLowerCase();
      return [...prev, normalized];
    });
  };

  const goBack = () => {
    setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const setScreen = (screenName, screenParams = {}) => {
    setParams(screenParams);
    setHistory([screenName.toLowerCase()]);
  };

  const value = {
    currentScreen,
    params,
    navigate,
    goBack,
    setScreen,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      currentScreen: 'home',
      params: {},
      navigate: () => {},
      goBack: () => {},
      setScreen: () => {},
    };
  }
  return context;
}
