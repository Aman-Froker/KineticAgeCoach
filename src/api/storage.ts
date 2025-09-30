interface StorageKeys {
  TOKEN: string;
  USER: string;
  REFRESH_TOKEN: string;
  THEME: string;
}

const STORAGE_KEYS: StorageKeys = {
  TOKEN: "auth_token",
  USER: "user_data",
  REFRESH_TOKEN: "refresh_token",
  THEME: "app_theme",
};

export interface StorageInterface {
  setToken: (token: string) => void;
  getToken: () => string | null;
  removeToken: () => void;
  setRefreshToken: (refreshToken: string) => void;
  getRefreshToken: () => string | null;
  removeRefreshToken: () => void;
  setUser: <T = any>(userData: T) => void;
  getUser: <T = any>() => T | null;
  removeUser: () => void;
  setTheme: (theme: string) => void;
  getTheme: () => string;
  clearAll: () => void;
  set: <T = any>(key: string, value: T) => void;
  get: <T = any>(key: string) => T | null;
  remove: (key: string) => void;
}

export const storage: StorageInterface = {
  // Token management
  setToken: (token: string): void => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  },

  getToken: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  removeToken: (): void => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  },

  // Refresh token management
  setRefreshToken: (refreshToken: string): void => {
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  removeRefreshToken: (): void => {
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  // User data management
  setUser: <T = any>(userData: T): void => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
  },

  getUser: <T = any>(): T | null => {
    const userData = localStorage.getItem(STORAGE_KEYS.USER);
    if (!userData) return null;

    try {
      return JSON.parse(userData) as T;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  },

  removeUser: (): void => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  // Theme management
  setTheme: (theme: string): void => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  },

  getTheme: (): string => {
    return localStorage.getItem(STORAGE_KEYS.THEME) || "light";
  },

  // Clear all storage
  clearAll: (): void => {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  },

  // Generic storage methods
  set: <T = any>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  get: <T = any>(key: string): T | null => {
    const item = localStorage.getItem(key);
    if (!item) return null;

    try {
      return JSON.parse(item) as T;
    } catch {
      return item as unknown as T;
    }
  },

  remove: (key: string): void => {
    localStorage.removeItem(key);
  },
};
