'use client'
import { createContext, useEffect, useState } from 'react'

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
  const [theme, setTheme] = useState(null);

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
    const initialThemeValue = initialTheme || getInitialTheme();
    setTheme(initialThemeValue);
  }, [initialTheme]);

  useEffect(() => {
    if (theme) {
      rawSetTheme(theme)
    }
  }, [theme])

  if (!theme) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
