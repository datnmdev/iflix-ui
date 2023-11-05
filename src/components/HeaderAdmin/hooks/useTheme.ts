import { useEffect, useState } from 'react'

const initialValue = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) ? true : false

export default function useTheme() {
  const [ isDarkMode, setDarkMode ] = useState(initialValue)

  useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem('theme', 'dark')
      document.documentElement.classList.add('dark')
    } else {
      localStorage.setItem('theme', 'light')
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return {
    initialValue,
    isDarkMode,
    setDarkMode
  }
}