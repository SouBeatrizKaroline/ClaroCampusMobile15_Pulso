import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
interface AppContextType {
  largeText: boolean; setLargeText: (value: boolean) => void
  readAloud: boolean; setReadAloud: (value: boolean) => void
  emergencyNumbersOpen: boolean; setEmergencyNumbersOpen: (value: boolean) => void
  identificationOpen: boolean; setIdentificationOpen: (value: boolean) => void
}
const AppContext = createContext<AppContextType | undefined>(undefined)
function readPreference(key: string) { try { return localStorage.getItem(key) === 'true' } catch { return false } }
function savePreference(key: string, value: boolean) { try { localStorage.setItem(key, String(value)) } catch { /* Private browsing can deny storage; in-memory state still works. */ } }
export function AppProvider({ children }: { children: ReactNode }) {
  const [largeText, setLargeText] = useState(() => readPreference('pulso_large_text'))
  // Audio starts only after an explicit action in this session.
  const [readAloud, setReadAloud] = useState(false)
  const [emergencyNumbersOpen, setEmergencyNumbersOpen] = useState(false)
  const [identificationOpen, setIdentificationOpen] = useState(false)
  useEffect(() => { savePreference('pulso_large_text', largeText); document.documentElement.classList.toggle('large-text', largeText) }, [largeText])
  return <AppContext.Provider value={{ largeText, setLargeText, readAloud, setReadAloud, emergencyNumbersOpen, setEmergencyNumbersOpen, identificationOpen, setIdentificationOpen }}>{children}</AppContext.Provider>
}
export function useApp() { const context = useContext(AppContext); if (!context) throw new Error('useApp must be used within AppProvider'); return context }
