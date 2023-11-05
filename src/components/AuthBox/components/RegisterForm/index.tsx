import { useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { AxiosResponse } from 'axios'
import Cookies from 'universal-cookie'
import CancelIcon from '@mui/icons-material/Cancel'

import validationSchema from './validationSchema'
import { useRegisterMutation, useGetUserProfileQuery } from '../../../../features/api/apiSlice'
import IRegisterForm from './types/IRegisterForm'
import Spinner from '../../../Spinner'

export default function RegisterForm({ setDisplayAuthBox }: IRegisterForm) {
  const [ register ] = useRegisterMutation()
  const { refetch: refetchProfile } = useGetUserProfileQuery()
  const [authMessage, setAuthMessage] = useState<string | null>(null)

  return (
    <Formik
      initialValues={{
        username: '',
        name: {
          first: '',
          last: ''
        },
        email: '',
        password: '',
        repeatPassword: ''
      }}

      validationSchema={ validationSchema }

      onSubmit={ async (values, { setSubmitting }) => {
        setSubmitting(true)

        try {
          const tokens = await register(values).unwrap()
          const cookies = new Cookies(null, {
            path: '/'
          })

          cookies.set('accessToken', tokens.accessToken, {
            maxAge: 2*60*60
          })

          cookies.set('refreshToken', tokens.refreshToken, {
            maxAge: 2*7*24*60*60
          })

          refetchProfile()
          setDisplayAuthBox(false)

        } catch (error) {
          const convertedError = error as AxiosResponse

          if (convertedError.status === 409) {
            setAuthMessage('Tên đăng nhập này đã tồn tại')
          } else {
            setAuthMessage('Đã xảy ra lỗi')
          }
        }

        setSubmitting(false)
      }}
    >
      { (formik) => (
        <>
          { formik.isSubmitting ? <Spinner className='bg-transparent' /> : null }
          { authMessage !== null ? (
            <div className='flex items-center text-red-600 border-solid border-2 border-red-600 p-4'>
              <CancelIcon sx={{ fontSize: '1.5rem' }} />
              <div className='ml-4'>{ authMessage }</div>
            </div>
          ) : null }
          <Form className='space-y-2.5'>
            <div>
              <Field
                className='block w-full py-2 px-4 rounded-[24px] border-solid border-2'
                type='text'
                name='username'
                placeholder='Tên đăng nhập của bạn?'
              />
              <div className='px-6 text-red-500 text-[0.9rem]'>
                <ErrorMessage name='username' />
              </div>
            </div>

            <div className='flex justify-between items-start space-x-2'>
              <div>
                <Field
                  className='block w-full py-2 px-4 rounded-[24px] border-solid border-2'
                  type='text'
                  name='name.first'
                  placeholder='Họ của bạn?'
                />
                <div className='px-6 text-red-500 text-[0.9rem]'>
                  <ErrorMessage name='name.first' />
                </div>
              </div>

              <div>
                <Field
                  className='block w-full py-2 px-4 rounded-[24px] border-solid border-2'
                  type='text'
                  name='name.last'
                  placeholder='Tên của bạn?'
                />
                <div className='px-6 text-red-500 text-[0.9rem]'>
                  <ErrorMessage name='name.last' />
                </div>
              </div>
            </div>

            <div>
              <Field
                className='block w-full py-2 px-4 rounded-[24px] border-solid border-2'
                type='text'
                name='email'
                placeholder='Email của bạn?'
              />
              <div className='px-6 text-red-500 text-[0.9rem]'>
                <ErrorMessage name='email' />
              </div>
            </div>

            <div>
              <Field
                className='block w-full py-2 px-4 rounded-[24px] border-solid border-2'
                type='password'
                name='password'
                placeholder='Password của bạn?'
              />
              <div className='px-6 text-red-500 text-[0.9rem]'>
                <ErrorMessage name='password' />
              </div>
            </div>

            <div>
              <Field
                className='block w-full py-2 px-4 rounded-[24px] border-solid border-2'
                type='password'
                name='repeatPassword'
                placeholder='Nhập lại password của bạn?'
              />
              <div className='px-6 text-red-500 text-[0.9rem]'>
                <ErrorMessage name='repeatPassword' />
              </div>
            </div>

            <button type='submit' className='rounded-[24px] py-2.5 px-2 bg-sky-500 w-full text-white'>
              Đăng ký
            </button>
          </Form>
        </>
      ) }
    </Formik>
  )
}