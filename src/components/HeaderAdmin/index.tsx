import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined'
import SearchIcon from '@mui/icons-material/Search'

import useTheme from './hooks/useTheme'
import UserInfo from './components/UserInfo'
import ProfileContext from '../../contexts/ProfileContext'

export default function HeaderAdmin() {
  const { initialValue, isDarkMode, setDarkMode } = useTheme()
  const [isThemeBoxHidden, setThemeBoxDisplay] = useState(true)
  const profile = useContext(ProfileContext)

  return (
    <>
      <div className='transition ease-linear duration-500 fixed z-[100] w-[100%] top-0 shadow bg-white dark:bg-stone-950 text-stone-950 dark:text-white'>
        <div
          className='lg:container lg:mx-auto'
        >
          <div
            className='h-14 flex justify-between items-center'
          >
            <div
              className='flex items-center'
            >
              <NavLink
                to='/'
                className={({ isActive, isPending }) => `${isActive ? 'text-red-500 [text-shadow:0_2px_8px_rgb(239,68,68)]' : isPending ? 'text-orange-500' : ''} hover:text-red-500`}
              >
                <img src='/src/assets/brands/logo.png' width={120} />
              </NavLink>
            </div>
            <div
              className='flex justify-between items-center space-x-4'
            >
              <div>
                <SearchIcon className='text-red-500' />

              </div>
              <div
                className='relative cursor-pointer'
              >
                {isDarkMode ?
                  <DarkModeOutlinedIcon
                    className='text-red-500'
                    onClick={() => isThemeBoxHidden ? setThemeBoxDisplay(false) : setThemeBoxDisplay(true)}
                  /> :
                  <LightModeOutlinedIcon
                    className='text-red-500'
                    onClick={() => isThemeBoxHidden ? setThemeBoxDisplay(false) : setThemeBoxDisplay(true)}
                  />
                }

                <ul
                  className={`${isThemeBoxHidden ? 'hidden' : ''} transition ease-linear duration-500 z-[2] absolute w-[148px] top-[calc(100%+24px)] left-[50%] translate-x-[-50%]
                  bg-white dark:bg-stone-700 text-stone-950 dark:shadow-stone-900 dark:text-white
                  shadow-md shadow-stone-400 rounded`}
                >
                  <li
                    className={`${isDarkMode ? '' : 'text-red-500'} transition ease-linear duration-500 w-full px-2.5 py-1 hover:bg-stone-100 dark:hover:bg-stone-600`}
                    onClick={() => {
                      setDarkMode(false)
                      setThemeBoxDisplay(true)
                    }}
                  >
                    <LightModeOutlinedIcon
                      className='mr-2 text-stone-400 text-inherit'
                    />
                    Chế độ sáng
                  </li>
                  <li
                    className={`${isDarkMode ? 'text-red-500' : ''} transition ease-linear duration-500 w-full px-2.5 py-1 hover:bg-stone-100 dark:hover:bg-stone-600`}
                    onClick={() => {
                      setDarkMode(true)
                      setThemeBoxDisplay(true)
                    }}
                  >
                    <DarkModeOutlinedIcon
                      className='mr-2 text-stone-400'
                    />
                    Chế độ tối
                  </li>
                  <li
                    className='transition ease-linear duration-500 w-full px-2.5 py-1 hover:bg-stone-100 dark:hover:bg-stone-600'
                    onClick={() => {
                      setDarkMode(initialValue)
                      setThemeBoxDisplay(true)
                    }}
                  >
                    <DesktopWindowsOutlinedIcon
                      className='mr-2 text-stone-400'
                    />
                    Hệ thống
                  </li>
                </ul>
              </div>

              <UserInfo user={profile!} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}