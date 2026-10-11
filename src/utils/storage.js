import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Standard Storage Keys
 */
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  USER_ID: 'userId',
  WORKSPACES: 'workspaces',
  ACTIVE_WORKSPACE_ID: 'activeWorkspaceId',
  ACTIVE_WORKSPACE_NAME: 'activeWorkspaceName',
  ACTIVE_WORKSPACE_ROLE: 'activeWorkspaceRole',
  IS_SWITCHER_OPEN: 'isSwitcherOpen',
};

/**
 * Centralized Storage Service
 * Wraps AsyncStorage with auto-serialization, deserialization, and safe error handling.
 */
export const storage = {
  /**
   * Store data in AsyncStorage.
   * Objects and arrays are automatically serialized to JSON strings.
   * @param {string} key
   * @param {any} value
   * @returns {Promise<boolean>}
   */
  setItem: async (key, value) => {
    try {
      if (value === null || value === undefined) {
        await AsyncStorage.removeItem(key);
        return true;
      }
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, stringValue);
      return true;
    } catch (error) {
      console.warn(`[storage.setItem] Failed to save key "${key}":`, error);
      return false;
    }
  },

  /**
   * Retrieve data from AsyncStorage.
   * Valid JSON strings are automatically parsed back to objects/arrays.
   * @param {string} key
   * @returns {Promise<any>}
   */
  getItem: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value === null) return null;
      try {
        return JSON.parse(value);
      } catch {
        // Not a JSON string (e.g. plain token string)
        return value;
      }
    } catch (error) {
      console.warn(`[storage.getItem] Failed to get key "${key}":`, error);
      return null;
    }
  },

  /**
   * Remove a single item from AsyncStorage.
   * @param {string} key
   * @returns {Promise<boolean>}
   */
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`[storage.removeItem] Failed to remove key "${key}":`, error);
      return false;
    }
  },

  /**
   * Remove multiple items at once.
   * @param {string[]} keys
   * @returns {Promise<boolean>}
   */
  multiRemove: async (keys) => {
    try {
      await AsyncStorage.multiRemove(keys);
      return true;
    } catch (error) {
      console.warn('[storage.multiRemove] Failed to remove keys:', error);
      return false;
    }
  },

  /**
   * Clear all stored data.
   * @returns {Promise<boolean>}
   */
  clear: async () => {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.warn('[storage.clear] Failed to clear storage:', error);
      return false;
    }
  },

  // -------------------------------------------------------------
  // Convenient Helper Methods for Auth
  // -------------------------------------------------------------

  /**
   * Get auth token
   * @returns {Promise<string|null>}
   */
  getToken: async () => {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.warn('[storage.getToken] Error:', error);
      return null;
    }
  },

  /**
   * Set auth token
   * @param {string} token
   */
  setToken: async (token) => {
    return storage.setItem(STORAGE_KEYS.TOKEN, token);
  },

  /**
   * Get parsed user object
   * @returns {Promise<object|null>}
   */
  getUser: async () => {
    return storage.getItem(STORAGE_KEYS.USER);
  },

  /**
   * Store user object
   * @param {object} user
   */
  setUser: async (user) => {
    return storage.setItem(STORAGE_KEYS.USER, user);
  },

  /**
   * Clear user session data (used during logout or token expiry)
   */
  clearAuth: async () => {
    return storage.multiRemove([
      STORAGE_KEYS.TOKEN,
      STORAGE_KEYS.USER,
      STORAGE_KEYS.USER_ID,
      STORAGE_KEYS.WORKSPACES,
      STORAGE_KEYS.ACTIVE_WORKSPACE_ID,
      STORAGE_KEYS.IS_SWITCHER_OPEN,
      STORAGE_KEYS.ACTIVE_WORKSPACE_NAME,
      STORAGE_KEYS.ACTIVE_WORKSPACE_ROLE,
    ]);
  },
};

export default storage;
