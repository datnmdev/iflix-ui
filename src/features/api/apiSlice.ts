import { EntityState, createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'universal-cookie'

import IMovie from '../../interfaces/IMovie'
import IEpisode from '../../interfaces/IEpisode'
import ISchedule from '../../interfaces/ISchedule'
import { RootState } from '../../store/types'
import IUser from '../../interfaces/IUser'
import IToken from '../../interfaces/IToken'
import ISignup from '../../interfaces/ISignup'
import IRate from '../../interfaces/IRate'

const moviesAdapter = createEntityAdapter<IMovie>({
  selectId: (movie) => movie._id
})

const episodesAdapter = createEntityAdapter<IEpisode>({
  selectId: (episode) =>  episode._id,
  sortComparer: (episode1, episode2) => episode2.ordinalNumber - episode1.ordinalNumber
})

const schedulesAdapter = createEntityAdapter<ISchedule>({
  selectId: schedule => schedule._id
})

const cookies = new Cookies(null, {
  path: '/'
})

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${ cookies.get('accessToken') || cookies.get('refreshToken') }`)
      return headers
    }
  }),
  tagTypes: [ 'AUTH', 'RATE' ],
  endpoints: (builder) => ({
    getUserProfile: builder.query<IUser, void>({
      query: () => '/users/profile',
      providesTags: [ 'AUTH' ]
    }),
    register: builder.mutation<IToken, ISignup>({
      query: (data) => ({
        url: '/auth/form/signup',
        method: 'post',
        body: data
      })
    }),
    getMovies: builder.query<EntityState<IMovie>, void>({
      query: () => '/movies',
      providesTags: ['RATE'],
      transformResponse(responseData: IMovie[]) {
        return moviesAdapter.setAll(moviesAdapter.getInitialState(), responseData)
      }
    }),
    addRating: builder.mutation<void, IRate>({
      query: (data) => ({
        url: '/rates',
        method: 'post',
        body: data
      }),
      invalidatesTags: ['RATE']
    }),
    updateRating: builder.mutation<void, IRate>({
      query: (data) => ({
        url: '/rates',
        method: 'put',
        body: data
      }),
      invalidatesTags: ['RATE']
    }),
    getEpisodes: builder.query<EntityState<IEpisode>, void>({
      query: () => '/episodes',
      transformResponse(responseData: IEpisode[]) {
        return episodesAdapter.setAll(episodesAdapter.getInitialState(), responseData)
      }
    }),
    getSchedules: builder.query<EntityState<ISchedule>, void>({
      query: () => '/schedules',
      transformResponse(responseData: ISchedule[]) {
        return schedulesAdapter.setAll(schedulesAdapter.getInitialState(), responseData)
      }
    }),
    
  }),
})

export const { useGetUserProfileQuery } = apiSlice

export const { useRegisterMutation } = apiSlice

export const { useGetMoviesQuery } = apiSlice
export const selectedMoviesResult = apiSlice.endpoints.getMovies.select()
const selectMoviesData = createSelector(
  selectedMoviesResult,
  moviesResult => moviesResult.data
)
export const { selectAll: selectAllMovies, selectById: selectByMovieId, selectEntities: selectMovieEntities } = moviesAdapter.getSelectors<RootState>(state => selectMoviesData(state) ?? moviesAdapter.getInitialState())

export const { useGetEpisodesQuery } = apiSlice
export const selectedEpisodesResult = apiSlice.endpoints.getEpisodes.select()
const selectEpisodesData = createSelector(
  selectedEpisodesResult,
  EpisodesResult => EpisodesResult.data
)
export const { selectAll: selectAllEpisodes, selectById: selectByEpisodeId, selectIds: selectEpisodeIds, selectEntities: selectEpisodeEntities } = episodesAdapter.getSelectors<RootState>(state => selectEpisodesData(state) ?? episodesAdapter.getInitialState())

export const { useGetSchedulesQuery } = apiSlice
export const selectedSchedulesResult = apiSlice.endpoints.getSchedules.select()
const selectSchedulesData = createSelector(
  selectedSchedulesResult,
  SchedulesResult => SchedulesResult.data
)
export const { selectAll: selectAllSchedules, selectById: selectByScheduleId } = schedulesAdapter.getSelectors<RootState>(state => selectSchedulesData(state) ?? schedulesAdapter.getInitialState())

export const { useAddRatingMutation } = apiSlice

export const { useUpdateRatingMutation } = apiSlice

export default apiSlice
