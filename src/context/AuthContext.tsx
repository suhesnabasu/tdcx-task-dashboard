import {
  createContext,
  type FC,
  type ReactNode,
  useContext,
  useMemo,
  useState,
  useEffect
} from 'react'
import Cookies from 'js-cookie'
import { SESSION_COOKIE_KEY, USER_STORAGE_KEY } from '../utils/constants'
import {
  clearStorageKey,
  readFromStorage,
  writeToStorage
} from '../utils/storage'

export interface UserProfile {
  name: string
  email: string
  avatarColor: string
  avatarUrl?: string
}

interface AuthContextValue {
  user: UserProfile | null
  isAuthenticated: boolean
  isSessionLoading: boolean
  login: (payload: { name: string; email: string }) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const generateAvatarColor = (seed: string): string => {
  let hash = 0
  for (let i = 0; i < seed.length; i += 1) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = Math.abs(hash) % 360
  return `hsl(${hue}, 70%, 55%)`
}

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isSessionLoading, setIsSessionLoading] = useState(true)

  useEffect(() => {
    const hasSession = Boolean(Cookies.get(SESSION_COOKIE_KEY))
    if (hasSession) {
      const storedUser = readFromStorage<UserProfile | null>(
        USER_STORAGE_KEY,
        null
      )
      if (storedUser) {
        setUser(storedUser)
      }
    }
    setIsSessionLoading(false)
  }, [])

  const login = (payload: { name: string; email: string }) => {
    // Generate a consistent avatar URL based on the user's name
    const seed = encodeURIComponent(payload.name || payload.email)
    const avatarUrl = `https://i.pravatar.cc/100?u=${seed}`
    
    const enrichedProfile: UserProfile = {
      ...payload,
      avatarColor: generateAvatarColor(payload.name || payload.email),
      avatarUrl
    }
    Cookies.set(SESSION_COOKIE_KEY, 'active')
    writeToStorage(USER_STORAGE_KEY, enrichedProfile)
    setUser(enrichedProfile)
  }

  const logout = () => {
    Cookies.remove(SESSION_COOKIE_KEY)
    clearStorageKey(USER_STORAGE_KEY)
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isSessionLoading,
      login,
      logout
    }),
    [user, isSessionLoading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return ctx
}

