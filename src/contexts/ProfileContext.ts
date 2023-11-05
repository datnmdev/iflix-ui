import { createContext } from 'react'
import IUser from '../interfaces/IUser'

const ProfileContext = createContext<IUser | undefined | null>(null)

export default ProfileContext