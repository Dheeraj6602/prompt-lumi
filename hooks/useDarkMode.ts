
import { useState, useEffect, useCallback } from 'react';

const ANIMATION_DURATION = 600; // ms, should match CSS animation duration in index.html

// RGB values for your theme's background colors
const BG_LIGHT_RGB = '245, 245, 245'; // from #f5f5f5
const BG_DARK_RGB = '23, 23, 23';    // from #171717

export const useDarkMode = (): [boolean, () => void] => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const storedPreference = localStorage.getItem('darkMode');
      if (storedPreference !== null) {
        return JSON.parse(storedPreference);
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false; // Default for SSR or non-browser environments
  });

  // This effect synchronizes the isDarkMode state with localStorage and the <html> class
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
      const htmlElement = document.documentElement;
      if (isDarkMode) {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }
    }
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => {
    if (typeof window === 'undefined') return;

    const overlay = document.getElementById('theme-transition-overlay');
    if (!overlay) {
      console.warn('Theme transition overlay element not found.');
      setIsDarkMode(prevMode => !prevMode); // Still toggle state if overlay is missing for some reason
      return;
    }

    const currentlyDark = document.documentElement.classList.contains('dark');
    const targetIsDark = !currentlyDark;

    // Clear previous animation styles from overlay
    overlay.classList.remove('animate-theme-reveal');
    overlay.style.background = '';
    overlay.style.backdropFilter = '';
    void overlay.offsetWidth; // Force reflow to ensure animation restarts

    // Determine the target gradient color
    const gradientColorRGB = targetIsDark ? BG_DARK_RGB : BG_LIGHT_RGB;

    // Apply new animation styles
    overlay.style.background = `radial-gradient(circle at 90% 10%, rgba(${gradientColorRGB}, 0.85) 0%, rgba(${gradientColorRGB}, 0.7) 25%, rgba(${gradientColorRGB}, 0.4) 50%, rgba(${gradientColorRGB}, 0) 70%)`;
    overlay.style.backdropFilter = 'blur(4px)';
    overlay.classList.add('animate-theme-reveal'); 

    // Update the theme state. This will trigger the useEffect above to change the
    // <html> class and save to localStorage. The page elements underneath
    // should transition their colors due to their own CSS transitions.
    setIsDarkMode(targetIsDark);
    
    // Clean up overlay styles after animation
    setTimeout(() => {
      overlay.classList.remove('animate-theme-reveal');
      overlay.style.background = '';
      overlay.style.backdropFilter = '';
    }, ANIMATION_DURATION);

  }, [setIsDarkMode]); 

  return [isDarkMode, toggleDarkMode];
};
