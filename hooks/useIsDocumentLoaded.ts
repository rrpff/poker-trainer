import { useEffect, useState } from 'react'

export const useIsDocumentLoaded = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const listener = () => setLoaded(true)

    window.addEventListener('load', listener)

    return () => window.removeEventListener('load', listener)
  }, [])

  return loaded
}
