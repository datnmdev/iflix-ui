import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'

import { useGetUserProfileQuery } from '../features/api/apiSlice'
import AdminLayout from './AdminLayout'
import UserLayout from './UserLayout'
import axiosInstance from '../utils/axios'
import ProfileContext from '../contexts/ProfileContext'
import DisplayAuthBoxContext from '../contexts/DisplayAuthBoxContext'

export default function Root() {
  const displayAuthBoxState = useState(false)
  const { data: profile, refetch: refetchProfile } = useGetUserProfileQuery()
  
  useEffect(() => {
    const cookies = new Cookies(null, {
      path: '/'
    })
    
    if (!cookies.get('accessToken') && cookies.get('refreshToken')) {
      axiosInstance.post('/auth/refreshToken')
        .then(res => res.data)
        .then(data => {
          cookies.set('accessToken', data.accessToken, {
            maxAge: 2*60*60
          })
          cookies.set('refreshToken', data.refreshToken, {
            maxAge: 2*14*24*60*60
          })

          refetchProfile()
        })
    }
  }, [ refetchProfile ])

  if (!profile || profile.role === 'user') {
    return (
      <ProfileContext.Provider value={ profile }>
        <DisplayAuthBoxContext.Provider value={ displayAuthBoxState }>
          <UserLayout />
        </DisplayAuthBoxContext.Provider>
      </ProfileContext.Provider>
    )
  }

  return (
    <ProfileContext.Provider value={ profile }>
      <DisplayAuthBoxContext.Provider value={ displayAuthBoxState }>
        <AdminLayout />
      </DisplayAuthBoxContext.Provider>
    </ProfileContext.Provider>
  )
}