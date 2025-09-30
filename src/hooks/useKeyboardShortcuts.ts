'use client';

import { useEffect, useCallback } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  callback: () => void;
  description?: string;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    shortcuts.forEach(({ key, ctrlKey, metaKey, shiftKey, altKey, callback }) => {
      const isCtrlMatch = ctrlKey === undefined ? true : event.ctrlKey === ctrlKey;
      const isMetaMatch = metaKey === undefined ? true : event.metaKey === metaKey;
      const isShiftMatch = shiftKey === undefined ? true : event.shiftKey === shiftKey;
      const isAltMatch = altKey === undefined ? true : event.altKey === altKey;
      const isKeyMatch = event.key.toLowerCase() === key.toLowerCase();

      if (isKeyMatch && isCtrlMatch && isMetaMatch && isShiftMatch && isAltMatch) {
        // Don't trigger if user is typing in an input field
        const target = event.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true') {
          return;
        }

        event.preventDefault();
        callback();
      }
    });
  }, [shortcuts]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

// Common keyboard shortcuts for the app
export const useAppKeyboardShortcuts = (onSearchFocus: () => void) => {
  useKeyboardShortcuts([
    {
      key: 'k',
      metaKey: true,
      callback: onSearchFocus,
      description: 'Focus search input'
    },
    {
      key: '/',
      callback: onSearchFocus,
      description: 'Focus search input'
    }
  ]);
};
