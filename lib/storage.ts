// Gestion du localStorage pour les abonnements, historique, etc.

import type { Subscription, HistoryItem, Theme } from './types';

// Clés du localStorage
const STORAGE_KEYS = {
  SUBSCRIPTIONS: 'freetube_subscriptions',
  HISTORY: 'freetube_history',
  THEME: 'freetube_theme',
  SETTINGS: 'freetube_settings',
} as const;

// Settings interface
export interface AppSettings {
  autoplay: boolean;
  defaultQuality: string;
  volume: number;
  playbackRate: number;
  instanceUrl: string;
}

const DEFAULT_SETTINGS: AppSettings = {
  autoplay: false,
  defaultQuality: 'auto',
  volume: 1,
  playbackRate: 1,
  instanceUrl: 'https://invidious.fdn.fr',
};

// Fonctions d'abonnement
export function getSubscriptions(): Subscription[] {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(STORAGE_KEYS.SUBSCRIPTIONS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading subscriptions:', error);
    return [];
  }
}

export function addSubscription(subscription: Subscription): void {
  if (typeof window === 'undefined') return;

  try {
    const subs = getSubscriptions();
    const exists = subs.find(s => s.authorId === subscription.authorId);

    if (!exists) {
      subs.push({
        ...subscription,
        subscribedAt: Date.now(),
      });
      localStorage.setItem(STORAGE_KEYS.SUBSCRIPTIONS, JSON.stringify(subs));
    }
  } catch (error) {
    console.error('Error adding subscription:', error);
  }
}

export function removeSubscription(authorId: string): void {
  if (typeof window === 'undefined') return;

  try {
    const subs = getSubscriptions();
    const filtered = subs.filter(s => s.authorId !== authorId);
    localStorage.setItem(STORAGE_KEYS.SUBSCRIPTIONS, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing subscription:', error);
  }
}

export function isSubscribed(authorId: string): boolean {
  if (typeof window === 'undefined') return false;

  const subs = getSubscriptions();
  return subs.some(s => s.authorId === authorId);
}

// Fonctions d'historique
export function getHistory(): HistoryItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
    const history = data ? JSON.parse(data) : [];
    // Trier par date (plus récent en premier)
    return history.sort((a: HistoryItem, b: HistoryItem) => b.watchedAt - a.watchedAt);
  } catch (error) {
    console.error('Error reading history:', error);
    return [];
  }
}

export function addToHistory(item: HistoryItem): void {
  if (typeof window === 'undefined') return;

  try {
    let history = getHistory();

    // Supprimer l'entrée existante si elle existe
    history = history.filter(h => h.videoId !== item.videoId);

    // Ajouter la nouvelle entrée
    history.unshift({
      ...item,
      watchedAt: Date.now(),
    });

    // Garder seulement les 100 dernières vidéos
    if (history.length > 100) {
      history = history.slice(0, 100);
    }

    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
  } catch (error) {
    console.error('Error adding to history:', error);
  }
}

export function removeFromHistory(videoId: string): void {
  if (typeof window === 'undefined') return;

  try {
    const history = getHistory();
    const filtered = history.filter(h => h.videoId !== videoId);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing from history:', error);
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify([]));
  } catch (error) {
    console.error('Error clearing history:', error);
  }
}

// Fonctions de thème
export function getTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';

  try {
    const theme = localStorage.getItem(STORAGE_KEYS.THEME);
    return (theme as Theme) || 'dark';
  } catch (error) {
    console.error('Error reading theme:', error);
    return 'dark';
  }
}

export function setTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    // Appliquer le thème au document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (error) {
    console.error('Error setting theme:', error);
  }
}

// Fonctions de paramètres
export function getSettings(): AppSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;

  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
  } catch (error) {
    console.error('Error reading settings:', error);
    return DEFAULT_SETTINGS;
  }
}

export function updateSettings(settings: Partial<AppSettings>): void {
  if (typeof window === 'undefined') return;

  try {
    const current = getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
  } catch (error) {
    console.error('Error updating settings:', error);
  }
}

// Export/Import des données (pour backup)
export function exportData(): string {
  if (typeof window === 'undefined') return '{}';

  try {
    const data = {
      subscriptions: getSubscriptions(),
      history: getHistory(),
      settings: getSettings(),
      theme: getTheme(),
      exportedAt: Date.now(),
    };
    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Error exporting data:', error);
    return '{}';
  }
}

export function importData(jsonString: string): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const data = JSON.parse(jsonString);

    if (data.subscriptions) {
      localStorage.setItem(STORAGE_KEYS.SUBSCRIPTIONS, JSON.stringify(data.subscriptions));
    }

    if (data.history) {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(data.history));
    }

    if (data.settings) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data.settings));
    }

    if (data.theme) {
      setTheme(data.theme);
    }

    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
}
