import { useEffect, useCallback } from 'react';

interface KeyboardShortcuts {
  onSearch?: () => void;
  onEscape?: () => void;
  onEnter?: () => void;
  onTab?: () => void;
}

export function useKeyboardShortcuts({
  onSearch,
  onEscape,
  onEnter,
  onTab
}: KeyboardShortcuts) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Cmd+K or Ctrl+K for search
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      onSearch?.();
    }
    
    // '/' key for search
    if (event.key === '/' && !event.ctrlKey && !event.metaKey) {
      event.preventDefault();
      onSearch?.();
    }
    
    // Escape key
    if (event.key === 'Escape') {
      onEscape?.();
    }
    
    // Enter key
    if (event.key === 'Enter' && !event.shiftKey) {
      onEnter?.();
    }
    
    // Tab key
    if (event.key === 'Tab') {
      onTab?.();
    }
  }, [onSearch, onEscape, onEnter, onTab]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}

export function useSearchShortcuts(onSearch: () => void) {
  return useKeyboardShortcuts({ onSearch });
}