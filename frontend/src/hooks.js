import { useEffect, useState } from 'react'

export const useLocalStorage = (key, initial) => {
  const [value, setValue] = useState(
    localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key)).v
      : initial
  )

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ v: value }))
  }, [value])

  return [value, setValue]
}
