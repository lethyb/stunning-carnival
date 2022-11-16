import { useContext, createContext } from "react"

interface ContextValues {}

const contextValues: Partial<ContextValues> = {}

export const AppContext = createContext(contextValues)

export function useAppContext() {
  return useContext(AppContext)
}
