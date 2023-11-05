import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Cookies from 'universal-cookie'
import CancelIcon from '@mui/icons-material/Cancel'

import validationSchema from './validationSchema'
import Spinner from '../../../Spinner'
import axiosInstance from '../../../../utils/axios'
import IToken from '../../../../interfaces/IToken'
import { useGetUserProfileQuery } from '../../../../features/api/apiSlice'
import ILoginForm from './types/ILoginForm'

export default function LoginForm({ setDisplayAuthBox }: ILoginForm) {
  const [authMessage, setAuthMessage] = useState<string | null>(null)
  const { refetch: refetchUserProfile } = useGetUserProfileQuery()

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true)

        try {
          const responseData = await axiosInstance.post(
            '/auth/form/signin',
            JSON.stringify(values, null, 2)
          )
          const tokens: IToken = responseData.data
          const cookies = new Cookies(null, {
            path: '/',
          })
          cookies.set('accessToken', tokens.accessToken, {
            maxAge: 2*60*60
          })
          cookies.set('refreshToken', tokens.refreshToken, {
            maxAge: 2*7*24*60*60
          })
          
          refetchUserProfile()
          setDisplayAuthBox(false)

        } catch (error) {
          setAuthMessage('Tên đăng nhập hoặc mật khẩu không đúng')
        }

        setSubmitting(false)
      }}
    >
      {(formik) => (
        <>
          { formik.isSubmitting ? (
            <Spinner className='bg-transparent' />
          ) : null }
          { authMessage !== null ? (
            <div className='flex items-center text-red-600 border-solid border-2 border-red-600 p-4'>
              <CancelIcon sx={{ fontSize: '1.5rem' }} />
              <div className='ml-4'>{ authMessage }</div>
            </div>
          ) : null }
          <Form className='space-y-4'>
            <div>
              <Field
                className='block w-full py-2 px-4 rounded-[24px] border-solid border-2'
                name='username'
                placeholder='Tên đăng nhập của bạn?'
              />
              <div className='px-6 text-red-500 text-[0.9rem]'>
                <ErrorMessage className='px-4 py-1' name='username' />
              </div>
            </div>

            <div>
              <Field
                className='block w-full py-2 px-4 rounded-[24px] border-solid border-2'
                name='password'
                type='password'
                placeholder='Mật khẩu của bạn?'
              />
              <div className='px-6 text-red-500 text-[0.9rem]'>
                <ErrorMessage name='password' />
              </div>
            </div>

            <div className='text-right'>
              <span className='inline-block text-red-500 font-bold cursor-pointer'>
                Quên mật khẩu?
              </span>
            </div>

            <button
              type='submit'
              className='rounded-[24px] py-2.5 px-2 bg-sky-500 w-full text-white'
            >
              Đăng nhập
            </button>
          </Form>
        </>
      )}
    </Formik>
  )
}
