import { useState } from 'react'
import { useSelector } from 'react-redux'

import IScheduleProps from './types/IScheduleProps'
import ScheduleStatus from '../../common/enums/ScheduleStatus'
import WeekDay from '../../common/enums/WeekDay'
import ScheduleMovieCard from './components/ScheduleMovieCard/ScheduleMovieCard'
import { selectAllEpisodes, selectAllSchedules, selectMovieEntities, useGetEpisodesQuery, useGetMoviesQuery, useGetSchedulesQuery } from '../../features/api/apiSlice'
import startOfDay from '../../utils/dateTime/startOfDay'
import ISchedule from '../../interfaces/ISchedule'
import Spinner from '../Spinner'
import Empty from './components/Empty'
import { Link } from 'react-router-dom'
import Error from './components/Error'

const weekDayNow = new Date().getDay()

export default function Schedule({ title }: IScheduleProps) {
  const [ isShowScheduleStatusBox, setShowScheduleStatusBox ] = useState(false)
  const { isFetching: isFetchingMovies, isSuccess: isGetMovieSuccess, isError: isGetMoviesError, refetch: refetchMovies } = useGetMoviesQuery()
  const movies = useSelector(selectMovieEntities)
  const { isFetching: isFetchingEpisodes, isSuccess: isGetEpisodesSuccess, isError: isGetEpisodesError, refetch: refetchEpisodes } = useGetEpisodesQuery()
  const episodes = useSelector(selectAllEpisodes)
  const { isFetching: isFetchingSchedules, isSuccess: isGetSchedulesSuccess, isError: isGetSchedulesError, refetch: refetchSchedules  } = useGetSchedulesQuery()
  const schedules = useSelector(selectAllSchedules)
  const [ weekDay, setWeekDay ] = useState(weekDayNow)
  const [ scheduleStatus, setScheduleStatus ] = useState(ScheduleStatus.RECENTLY_UPDATED)
  const [ scheduleStatusString, setScheduleStatusString ] = useState('Mới cập nhật')

  let movieSchedules: ISchedule[] = [] 
  if (isGetMovieSuccess && isGetEpisodesSuccess && isGetSchedulesSuccess) {
    movieSchedules = schedules.filter(schedule => schedule.status == ScheduleStatus.RELEASED)
      .filter(schedule => schedule.schedules.findIndex(value => value == weekDay) != -1)
      .filter(schedule => {
        const date = new Date()
        date.setDate(date.getDate() + weekDay - date.getDay())
        const episodesOfMovie = episodes.filter(episode => episode.movie === schedule.movie)
          .sort((episode1, episode2) => new Date(episode2.createdAt).getTime() - new Date(episode1.createdAt).getTime())
        
        switch (scheduleStatus) {
        case ScheduleStatus.RECENTLY_UPDATED: {
          if (episodesOfMovie.length > 0 && new Date(episodesOfMovie[0].createdAt).getTime() >= startOfDay(date).getTime()) {
            return true
          }
          break
        }
        case ScheduleStatus.UPCOMING: {
          if (episodesOfMovie.length == 0 || (episodesOfMovie.length > 0 && new Date(episodesOfMovie[0].createdAt).getTime() < startOfDay(date).getTime())) {
            return true
          }
          break
        }
        default: {
          if (movies[schedule.movie]!.episode.numberOfEpisodesReleased == movies[schedule.movie]!.episode.total) {
            return true
          }
          break
        }
        }

        return false
      })
  }

  return (
    <div>
      <div className='flex justify-between items-center mt-8'>
        <h3 
          className='flex items-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-[1.6rem] font-[500]
          before:content-[""] before:inline-block before:w-[3px] before:h-[2.5rem] before:bg-red-500 before:mr-4'
        >
          { title }
        </h3>

        <div 
          className='relative cursor-pointer' 
          onClick={() => setShowScheduleStatusBox(!isShowScheduleStatusBox)}
        >
          <div className='text-red-500 [text-shadow:2px_2px_4px_rgb(239,68,68)]'>{ scheduleStatusString }</div>
          <ul 
            className={
              `${ isShowScheduleStatusBox ? 'block' : 'hidden' } transition ease-linear duration-500 absolute top-[calc(100%+12px)] shadow-md shadow-stone-400 
              dark:shadow-stone-900 text-center rounded w-[132px] right-0 bg-white dark:bg-stone-700 
              text-stone-950 dark:text-white z-[10]`
            }
          >
            <li 
              className={ `${ scheduleStatus == ScheduleStatus.RECENTLY_UPDATED ? 'text-red-500' : '' } w-full px-2.5 py-1 hover:bg-stone-100 hover:text-red-500 dark:hover:bg-stone-600` }
              onClick={ () => { 
                setScheduleStatus(ScheduleStatus.RECENTLY_UPDATED)
                setScheduleStatusString('Mới cập nhật') 
              } }
            >
              Mới cập nhật
            </li>
            <li 
              className={ `${ scheduleStatus == ScheduleStatus.UPCOMING ? 'text-red-500' : '' } w-full px-2.5 py-1 hover:bg-stone-100 hover:text-red-500 dark:hover:bg-stone-600` }
              onClick={ () => { 
                setScheduleStatus(ScheduleStatus.UPCOMING)
                setScheduleStatusString('Sắp cập nhật') 
              } }
            >
              Sắp cập nhật
            </li>
            <li 
              className={ `${ scheduleStatus == ScheduleStatus.COMPLETED ? 'text-red-500' : '' } w-full px-2.5 py-1 hover:bg-stone-100 hover:text-red-500 dark:hover:bg-stone-600` }
              onClick={ () => { 
                setScheduleStatus(ScheduleStatus.COMPLETED)
                setScheduleStatusString('Đã hoàn thành') 
              } }
            >
              Đã hoàn thành
            </li>
          </ul>
        </div>
      </div>

      <div className='h-[288px] flex justify-between items-start mt-4'>
        <ul className='flex justify-center items-center w-1/3 flex-wrap'>
          <li 
            className={ `${weekDay == WeekDay.MONDAY ? 'bg-[linear-gradient(140deg,#ec4899,#8b5cf6)]' : 'bg-[linear-gradient(140deg,rgba(0,77,102,0.8)_0%,rgba(0,134,179,0.9)_50%,rgba(0,191,255,1)_100%)]' }
             shrink-0 w-[40%] mx-2 my-2 grow text-center rounded px-2 py-1 text-white cursor-pointer transition ease-in-out duration-200 hover:bg-[linear-gradient(140deg,#ec4899,#8b5cf6)]` }
            onClick={ () => setWeekDay(WeekDay.MONDAY) }
          >
            <div>Monday</div>
            <div>Thứ Hai</div>
          </li>
          <li 
            className={ `${weekDay == WeekDay.TUESDAY ? 'bg-[linear-gradient(140deg,#ec4899,#8b5cf6)]' : 'bg-[linear-gradient(140deg,rgba(0,77,102,0.8)_0%,rgba(0,134,179,0.9)_50%,rgba(0,191,255,1)_100%)]' }
            shrink-0 w-[40%] mx-2 my-2 grow text-center rounded px-2 py-1 text-white cursor-pointer transition ease-in-out duration-200 hover:bg-[linear-gradient(140deg,#ec4899,#8b5cf6)]` }
            onClick={ () => setWeekDay(WeekDay.TUESDAY) }
          >
            <div>Tuesday</div>
            <div>Thứ Ba</div>
          </li>
          <li
            className={ `${weekDay == WeekDay.WEDNESDAY ? 'bg-[linear-gradient(140deg,#ec4899,#8b5cf6)]' : 'bg-[linear-gradient(140deg,rgba(0,77,102,0.8)_0%,rgba(0,134,179,0.9)_50%,rgba(0,191,255,1)_100%)]' }
             shrink-0 w-[40%] mx-2 my-2 grow text-center rounded px-2 py-1 text-white cursor-pointer transition ease-in-out duration-200 hover:bg-[linear-gradient(140deg,#ec4899,#8b5cf6)]` }
            onClick={ () => setWeekDay(WeekDay.WEDNESDAY) }
          >
            <div>Wednesday</div>
            <div>Thứ Tư</div>
          </li>
          <li
            className={ `${weekDay == WeekDay.THURSDAY ? 'bg-[linear-gradient(140deg,#ec4899,#8b5cf6)]' : 'bg-[linear-gradient(140deg,rgba(0,77,102,0.8)_0%,rgba(0,134,179,0.9)_50%,rgba(0,191,255,1)_100%)]' }
             shrink-0 w-[40%] mx-2 my-2 grow text-center rounded px-2 py-1 text-white cursor-pointer transition ease-in-out duration-200 hover:bg-[linear-gradient(140deg,#ec4899,#8b5cf6)]` }
            onClick={ () => setWeekDay(WeekDay.THURSDAY) }
          >
            <div>Thursday</div>
            <div>Thứ Năm</div>
          </li>
          <li
            className={ `${weekDay == WeekDay.FRIDAY ? 'bg-[linear-gradient(140deg,#ec4899,#8b5cf6)]' : 'bg-[linear-gradient(140deg,rgba(0,77,102,0.8)_0%,rgba(0,134,179,0.9)_50%,rgba(0,191,255,1)_100%)]' }
             shrink-0 w-[40%] mx-2 my-2 grow text-center rounded px-2 py-1 text-white cursor-pointer transition ease-in-out duration-200 hover:bg-[linear-gradient(140deg,#ec4899,#8b5cf6)]` }
            onClick={ () => setWeekDay(WeekDay.FRIDAY) }
          >
            <div>Friday</div>
            <div>Thứ Sáu</div>
          </li>
          <li
            className={ `${weekDay == WeekDay.SATURDAY ? 'bg-[linear-gradient(140deg,#ec4899,#8b5cf6)]' : 'bg-[linear-gradient(140deg,rgba(0,77,102,0.8)_0%,rgba(0,134,179,0.9)_50%,rgba(0,191,255,1)_100%)]' }
             shrink-0 w-[40%] mx-2 my-2 grow text-center rounded px-2 py-1 text-white cursor-pointer transition ease-in-out duration-200 hover:bg-[linear-gradient(140deg,#ec4899,#8b5cf6)]` }
            onClick={ () => setWeekDay(WeekDay.SATURDAY) }
          >
            <div>Saturday</div>
            <div>Thứ Bảy</div>
          </li>
          <li
            className={ `${weekDay == WeekDay.SUNDAY ? 'bg-[linear-gradient(140deg,#ec4899,#8b5cf6)]' : 'bg-[linear-gradient(140deg,rgba(0,77,102,0.8)_0%,rgba(0,134,179,0.9)_50%,rgba(0,191,255,1)_100%)]' }
             shrink-0 w-[40%] mx-2 my-2 grow text-center rounded px-2 py-1 text-white cursor-pointer transition ease-in-out duration-200 hover:bg-[linear-gradient(140deg,#ec4899,#8b5cf6)]` }
            onClick={ () => setWeekDay(WeekDay.SUNDAY) }
          >
            <div>Sunday</div>
            <div>Chủ Nhật</div>
          </li>
        </ul>

        <div 
          className={ `relative overflow-y-auto scroll-smooth w-2/3 h-full p-6 ${ movieSchedules.length > 0 ? 'grid grid-cols-3 gap-8 place-content-start place-items-stretch' : '' }` }
        >
          { (isGetMovieSuccess && isGetEpisodesSuccess && isGetSchedulesSuccess && movieSchedules.length > 0) ? 
            movieSchedules.map((schedule) => {
              return (
                <Link
                  key={ schedule._id }
                  to={`/player/${schedule._id}`}
                >
                  <ScheduleMovieCard 
                    movie={ movies[schedule.movie]! } 
                    content={ schedule.content }
                  />
                </Link>
              )
            }) : 
            (isFetchingMovies || isFetchingEpisodes || isFetchingSchedules) ? 
              <Spinner className='absolute bg-transparent' /> :
              (isGetMoviesError || isGetEpisodesError || isGetSchedulesError) ?
                <Error 
                  handleRefreshClick={() => {
                    if (isGetMoviesError) {
                      refetchMovies()
                    }

                    if (isGetEpisodesError) {
                      refetchEpisodes()
                    }

                    if (isGetSchedulesError) {
                      refetchSchedules()
                    }
                  }}
                /> :
                <Empty 
                  message={ 
                    scheduleStatus === ScheduleStatus.RECENTLY_UPDATED ? 'Chưa có chương trình nào mới được cập nhật trong thời gian này...' :
                      scheduleStatus === ScheduleStatus.UPCOMING ? 'Hiện không có chương trình nào được chiếu tiếp theo trong thời gian này...' :
                        scheduleStatus === ScheduleStatus.COMPLETED ? 'Hiện chưa có chương trình nào đã hoàn thành có lịch chiếu thời gian này...' : '' 
                  } 
                />
          }
        </div>
      </div>
    </div>
  )
}