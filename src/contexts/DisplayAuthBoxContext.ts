import { Dispatch, SetStateAction, createContext } from 'react'

export type DisplayAuthBoxContextType = [boolean, Dispatch<SetStateAction<boolean>>] | null

const DisplayAuthBoxContext = createContext<DisplayAuthBoxContextType>(null)

export default DisplayAuthBoxContext