import { useState } from 'react'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import FacebookIcon from '@mui/icons-material/Facebook'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

import IAuthBox from './types/IAuthBox'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

export default function AuthBox({
  setDisplayAuthBox
}: IAuthBox) {
  const [ isDisplayChoiceBox, setDisplayChoiceBox ] = useState(true)
  const [ isUsingLoginFeature, setUsingLoginFeature ] = useState(true)

  let form = (
    <ul className='flex justify-center items-center flex-wrap mt-6 space-y-2'>
      <li
        className='hover:bg-gray-200 cursor-pointer flex justify-between px-4 py-1.5 items-center w-[300px] rounded-[32px] border-solid border-2 border-gray-300 '
        onClick={() => {
          setDisplayChoiceBox(false)
        }}
      >
        <PersonOutlineOutlinedIcon />
        <span className='grow text-center'>Sử dụng username/password</span>
      </li>
      <li className='hover:bg-gray-200 cursor-pointer flex justify-between px-4 py-1.5 items-center w-[300px] rounded-[32px] border-solid border-2 border-gray-300 '>
        <img
          className='w-[20px]'
          src='/src/assets/icons/google-18px.svg'
          alt='google-icon'
        />
        <span className='grow text-center'>Tiếp tục với google</span>
      </li>
      <li className='hover:bg-gray-200 cursor-pointer flex justify-between px-4 py-1.5 items-center w-[300px] rounded-[32px] border-solid border-2 border-gray-300 '>
        <FacebookIcon className='text-sky-800' />
        <span className='grow text-center'>Tiếp tục với facebook</span>
      </li>
    </ul>
  )

  if (!isDisplayChoiceBox) {
    if (isUsingLoginFeature) {
      form = (
        <div className='max-w-[80%] m-auto mt-6 space-y-4 mb-4'>
          <LoginForm setDisplayAuthBox={ setDisplayAuthBox } />
        </div>
      )
    } else {
      form = (
        <div className='max-w-[80%] m-auto mt-6 space-y-4 mb-4'>
          <RegisterForm setDisplayAuthBox={ setDisplayAuthBox } />
        </div>
      )
    }
  }

  return (
    <div className='flex p-x-8 justify-center items-center fixed top-0 left-0 z-[999] w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.5)]'>
      <div className='animate-scaleIn relative flex justify-between flex-col w-[520px] min-w-[320px] h-[584px] overflow-hidden bg-white rounded-[24px] shadow-md shadow-gray-500'>
        <button 
          className={ `absolute left-4 top-4 p-2 ${ isDisplayChoiceBox ? 'hidden' : '' }` } 
          onClick={() => setDisplayChoiceBox(true)}
        >
          <ArrowBackIosNewOutlinedIcon sx={{ fontSize: '1.5rem' }} />
        </button>
        <button
          className='absolute right-4 top-4 bg-gray-200 p-2 rounded-[50%]'
          onClick={() => setDisplayAuthBox(false)}
        >
          <CloseOutlinedIcon sx={{ fontSize: '1.5rem' }} />
        </button>
        
        <div>
          <img
            className='mt-12 w-[156px] m-auto'
            src='/src/assets/brands/logo.png'
            alt='IFLIX'
          />

          { isUsingLoginFeature ? (
            <h3 className='text-center font-bold text-[2rem] font-sans mb-4'>
              Đăng nhập vào IFLIX
            </h3>
          ) : (
            <h3 className='text-center font-bold text-[2rem] font-sans mb-4'>
              Đăng ký tài khoản IFLIX
            </h3>
          )}
          <div className='overflow-auto h-[354px]'>
            { form }
          </div>
        </div>

        { isUsingLoginFeature ? (
          <div className='text-center my-4'>
            Bạn chưa có tài khoản?
            <span
              className='text-red-500 ml-1.5 cursor-pointer font-bold'
              onClick={() => {
                setUsingLoginFeature(false)
                setDisplayChoiceBox(true)
              }}
            >
              Đăng ký
            </span>
          </div>
        ) : (
          <div className='text-center my-4'>
            Bạn đã có tài khoản?
            <span
              className='text-red-500 ml-1.5 cursor-pointer font-bold'
              onClick={() => {
                setUsingLoginFeature(true)
                setDisplayChoiceBox(true)
              }} 
            >
              Đăng nhập
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
