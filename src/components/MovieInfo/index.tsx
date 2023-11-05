import DOMPurify from 'dompurify'
import { Rating } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import TimelapseIcon from '@mui/icons-material/Timelapse'
import UpdateIcon from '@mui/icons-material/Update';

import generateAPIFullURLFromRelativePath from '../../utils/path/generateAPIFullURLFromRelativePath'
import IMovieInfoProps from './types/IMovieInfoProps'
import CircleProgressBar from './components/CircleProgressBar'
import MovieTabInfo from './components/CircleProgressBar/MovieTabInfo'
import { useContext } from 'react'
import DisplayAuthBoxContext from '../../contexts/DisplayAuthBoxContext'
import ProfileContext from '../../contexts/ProfileContext'
import { useAddRatingMutation, useUpdateRatingMutation } from '../../features/api/apiSlice'
import axiosInstance from '../../utils/axios'
import IRate from '../../interfaces/IRate'

export default function MovieInfo({ className, movie }: IMovieInfoProps) {
  const profile = useContext(ProfileContext)
  const [isDisplayAuthBox, setDisplayAuthBox] = useContext(DisplayAuthBoxContext)!
  const [ addRating ] = useAddRatingMutation()
  const [ updateRating ] = useUpdateRatingMutation()

  return (
    <div
      className={ `${ className }` }
    >
      <div className='flex justify-between'>
        <div className='w-1/4'>
          <img 
            className='w-[300px] h-[420px] object-cover object-center rounded shadow-md shadow-stone-700'
            src={ movie?.posterUrl ? generateAPIFullURLFromRelativePath(movie?.posterUrl) : '' }
            alt={ movie?.title }
          />
        </div>

        <div className='px-8 w-3/4 flex flex-col justify-between'>
          <div className='grow flex flex-col justify-between'>
            <h3 className='truncate leading-[3rem] inline-block font-bold text-[2rem] bg-clip-text bg-gradient-to-r text-transparent from-pink-500 to-violet-500'>
              { movie.title }
            </h3>
            <h4 className='font-bold text-justify text-stone-400'>{ movie.alias.length > 1 ? movie.alias[1] : '' }</h4>

            <p 
              className='mt-4 mb-4 overflow-auto grow text-stone-900 h-[240px] dark:text-white' 
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(movie.description || '') }}
            >
            </p>
          </div>

          <div className='border-solid border-t-2 border-stone-200 dark:border-stone-700 pt-2.5 flex items-center'>
            <div className='flex items-center'>
              <CircleProgressBar value={ movie.ratingSummary.reviewCount === 0 ? 0 : movie.ratingSummary.starRatingCount/(movie.ratingSummary.reviewCount*5) } />

              <div className='ml-2'>
                <Rating 
                  value={ movie.ratingSummary.reviewCount === 0 ? 0 : Math.floor(movie.ratingSummary.starRatingCount/movie.ratingSummary.reviewCount)  } 
                  onChange={async (e, newValue) => {
                    if (profile) {
                      const rate = (await axiosInstance.get(`/rates?movieId=${ movie._id }&userId=${ profile._id }`)).data as IRate
                      if (!rate) {
                        await addRating({
                          movie: movie._id,
                          stars: newValue!
                        })     
                      } else {
                        await updateRating({
                          movie: movie._id,
                          stars: newValue!
                        })
                      }
                    } else {
                      setDisplayAuthBox(true)
                    }
                  }}
                />
                <div className='text-[0.9rem] text-stone-900 dark:text-gray-400'> { movie.ratingSummary.reviewCount } lượt đánh giá</div>
              </div>
            </div>

            <div className='text-[0.9rem] grow flex justify-center items-center text-gray-400 space-x-4'>
              <div>
                <TimelapseIcon className='mr-1' />
                { movie.release }
              </div>

              <div>
                <UpdateIcon className='mr-1' />
                { `${ movie.episode.numberOfEpisodesReleased }/${ movie.episode.total } tập` }
              </div>

              <div>
                <VisibilityIcon className='mr-1' />
                { movie.views } lượt xem
              </div>

              <div>
                <BookmarkIcon className='mr-1' />
                { movie.followerCount } lượt theo dõi
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-8'>
        <MovieTabInfo movie={ movie } />
      </div>
    </div>
  )
}