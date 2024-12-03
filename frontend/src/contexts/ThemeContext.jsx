'use client'
import { createContext, useEffect, useState } from 'react'
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('color-theme')
    if (typeof storedPrefs === 'string') {
      return storedPrefs
    }

    const userMedia = window.matchMedia('(prefers-color-scheme: dark)')
    if (userMedia.matches) {
      return 'dark'
    }
  }
  return 'light'
}

export const ThemeContext = createContext()

export const ThemeProvider = ({ initialTheme, children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return getInitialTheme();
    }
    return 'light';
  });

  const rawSetTheme = (rawTheme) => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement
      const isDark = rawTheme === 'dark'

      root.classList.remove(isDark ? 'light' : 'dark')
      root.classList.add(rawTheme)

      localStorage.setItem('color-theme', rawTheme)
    }
  }

  useEffect(() => {
    if (initialTheme) {
      rawSetTheme(initialTheme);
    }
  }, [initialTheme]);

  useEffect(() => {
    rawSetTheme(theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}