import { Dispatch, SetStateAction } from 'react'

interface ILoginForm {
  setDisplayAuthBox: Dispatch<SetStateAction<boolean>>
}

export default ILoginForm