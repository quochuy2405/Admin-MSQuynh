import type { User } from '@/types/interface'
import type { Dispatch, SetStateAction } from 'react'
import { createContext, useState } from 'react'

const AppCtx = createContext({
  loadingCourse: {} as Partial<boolean>,
  setLoadingCourse: {} as Dispatch<SetStateAction<boolean>>
})

const GlobalContext = ({ children }: { children: React.ReactNode; value?: Partial<User> }) => {
  const [loadingCourse, setLoadingCourse] = useState(false)
  const dataValue = {
    loadingCourse,
    setLoadingCourse
  }
  return <AppCtx.Provider value={dataValue}>{children}</AppCtx.Provider>
}
export { GlobalContext, AppCtx }
