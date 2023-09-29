import { createContext, useState } from 'react'
import { getAccessTokenFormLS } from 'src/utils/auth'

export interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const initContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFormLS()),
  setIsAuthenticated: () => null
}

export const AppContext = createContext<AppContextInterface>(initContext)

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initContext.isAuthenticated)

  return <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</AppContext.Provider>
}

export default AppProvider
