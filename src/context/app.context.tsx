import { createContext, useState } from 'react'
import { UserData } from 'src/types/user.type'
import { getAccessTokenFormLS, getProfileFromLS, getStatusTokenFormLS } from 'src/utils/auth'

export interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: UserData | null
  setProfile: React.Dispatch<React.SetStateAction<UserData | null>>
  isOrganization: boolean
  setIsOrganization: React.Dispatch<React.SetStateAction<boolean>>
}

const initContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFormLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  isOrganization: Boolean(getStatusTokenFormLS()),
  setIsOrganization: () => null
}

export const AppContext = createContext<AppContextInterface>(initContext)

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initContext.isAuthenticated)
  const [profile, setProfile] = useState<UserData | null>(initContext.profile)
  const [isOrganization, setIsOrganization] = useState<boolean>(initContext.isOrganization)

  return (
    <AppContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, profile, setProfile, isOrganization, setIsOrganization }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
