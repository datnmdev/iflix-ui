import { Dispatch, SetStateAction } from 'react'

interface IAuthBox {
  setDisplayAuthBox: Dispatch<SetStateAction<boolean>>
}

export default IAuthBox