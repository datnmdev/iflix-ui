import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'

import generateAPIFullURLFromRelativePath from '../../../../utils/path/generateAPIFullURLFromRelativePath'
import IUserInfo from './types/IUserInfo'
import axiosInstance from '../../../../utils/axios'

export default function UserInfo({ user }: IUserInfo) {
  const [ isHidden, setHidden ] = useState(true)
  const navigate = useNavigate()

  async function handleLogout() {
    setHidden(true)

    const cookies = new Cookies(null, {
      path: '/'
    })

    try {
      await axiosInstance.post('/auth/logout', {}, {
        headers: {
          'Authorization': `Bearer ${ cookies.get('refreshToken') }`
        }
      })
      
      cookies.remove('refreshToken')
      cookies.remove('accessToken')

      navigate(0)
    } catch (error) {
      console.log(error)
    }
  }

  if (isHidden) {
    return (
      <div>
        <img 
          className='w-[32px] h-[32px] rounded-full cursor-pointer'
          src={ generateAPIFullURLFromRelativePath(user.avatar) } 
          alt={ user.name.last }
          onClick={() => setHidden(!isHidden)}
        />
      </div>
    )
  }

  return (
    <div className='relative'>
      <img 
        className='w-[32px] h-[32px] rounded-full cursor-pointer'
        src={ generateAPIFullURLFromRelativePath(user.avatar) } 
        alt={ user.name.last }
        onClick={() => setHidden(!isHidden)}
      />
      
      <div 
        className='z-[1] absolute right-0 top-[calc(100%+8px)] text-stone-950 dark:text-white w-[240px] p-4
        shadow-md shadow-stone-950 rounded-xl bg-white dark:bg-stone-700'
      >
        <div className='flex justify-between items-center space-x-4'>
          <img 
            className='w-[64px] h-[64px] rounded-full'
            src={ generateAPIFullURLFromRelativePath(user.avatar) }
            alt={ user.name.last }
          />

          <div className='grow flex flex-col overflow-hidden'>
            <div className='truncate font-bold'>{ user.name.first.concat(' ', user.name.last) }</div>
            <div className='truncate'>{ user.username }</div>
          </div>
        </div>

        <hr className='mt-4' />

        <ul className='mt-4'>
          <li className='cursor-pointer hover:opacity-100 py-1.5 opacity-60 dark:text-white text-stone-950'>
            <SettingsIcon className='mr-2' />
            Cài đặt
          </li>
          <li 
            className='cursor-pointer hover:opacity-100 py-1.5 opacity-60 dark:text-white text-stone-950'
            onClick={ handleLogout }
          >
            <LogoutIcon className='mr-2' />
            Đăng xuất
          </li>
        </ul>
      </div>
    </div>
  )
}