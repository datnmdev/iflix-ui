import { useContext, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import CommentIcon from '@mui/icons-material/Comment'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'
import MovieIcon from '@mui/icons-material/Movie'
import ShareIcon from '@mui/icons-material/Share'
import BarChartIcon from '@mui/icons-material/BarChart'

import generateAPIFullURLFromRelativePath from '../utils/path/generateAPIFullURLFromRelativePath'
import { Link } from 'react-router-dom'
import { selectAllEpisodes, selectEpisodeEntities, selectMovieEntities, useGetEpisodesQuery, useGetMoviesQuery } from '../features/api/apiSlice'
import Player from '../components/Player'
import EpisodeList from '../components/EpisodeList'
import scrollIntoView from 'scroll-into-view-if-needed'
import MovieInfo from '../components/MovieInfo'
import Spinner from '../components/Spinner'
import EvaluationBox from '../components/EvaluationBox'
import ProfileContext from '../contexts/ProfileContext'
import DisplayAuthBoxContext from '../contexts/DisplayAuthBoxContext'
import CardSlider from '../components/CardSlider'

export default function Watch() {
  const { movieId } = useParams()
  const [ searchParams ] = useSearchParams()
  const { isSuccess: isGetEpisodesSuccess } = useGetEpisodesQuery()
  const episodes = useSelector(selectAllEpisodes)
  const episodeEntities = useSelector(selectEpisodeEntities)
  const { isSuccess: isGetMoviesSuccess } = useGetMoviesQuery()
  const movieEnities = useSelector(selectMovieEntities)
  const playerRef = useRef<HTMLDivElement>(null)
  const episodeListRef = useRef<HTMLDivElement>(null)
  const [ isDisplayEvaluationBox, setDisplayEvaluationBox ] = useState(false)
  const profile = useContext(ProfileContext)
  const displayAuthBoxState = useContext(DisplayAuthBoxContext)!

  const sortedEpisodes = episodes.slice().filter(episode => episode.movie === movieId).sort((ep1, ep2) => ep2.ordinalNumber - ep1.ordinalNumber)

  function _scrollIntoView(node: HTMLElement) {
    scrollIntoView(node, {
      behavior: 'smooth',
      block: 'center',
      inline: 'start'
    })
  }

  if (isGetEpisodesSuccess && isGetMoviesSuccess && movieId) {
    return (
      <>
        { isDisplayEvaluationBox ? <EvaluationBox setDisplayEvaluationBox={ setDisplayEvaluationBox } /> : null }
        <div className='transition ease-linear duration-500 bg-white dark:bg-stone-800 mt-14 py-8'>
          <div className='lg:container lg:mx-auto'>
            <Player 
              _ref={ playerRef }
              src={ generateAPIFullURLFromRelativePath(episodeEntities[searchParams.get('episodeId') || sortedEpisodes[0]._id]!.videoUrl) } 
            />
            <div className='flex justify-center items-center my-4 space-x-2 text-stone-700 dark:text-white'>
              <button 
                className='transition ease-in-out duration-300 px-2 py-1 hover:[text-shadow:2px_2px_4px_rgb(239,68,68)] hover:text-red-500'
                onClick={ () => _scrollIntoView(episodeListRef.current!) }
              >
                <MovieIcon className='mr-1 text-red-500' />
                Danh sách tập
              </button>
    
              <button className='transition ease-in-out duration-300 px-2 py-1 hover:[text-shadow:2px_2px_4px_rgb(239,68,68)] hover:text-red-500'>
                <CommentIcon className='mr-1 text-green-500' />
                Bình luận
              </button>
    
              <Link
                className='cursor-pointer transition ease-in-out duration-300 px-2 py-1 hover:[text-shadow:2px_2px_4px_rgb(239,68,68)] hover:text-red-500'
                to={ generateAPIFullURLFromRelativePath(episodeEntities[searchParams.get('episodeId') || sortedEpisodes[0]._id]!.videoUrl) }
                download={ episodeEntities[searchParams.get('episodeId') || sortedEpisodes[0]._id]!.videoUrl.split('\\')[episodeEntities[searchParams.get('episodeId') || sortedEpisodes[0]._id]!.videoUrl.split('\\').length-1] }
              >
                <FileDownloadIcon className='mr-1 text-violet-500' />
                Tải xuống
              </Link>
    
              <button className='transition ease-in-out duration-300 px-2 py-1 hover:[text-shadow:2px_2px_4px_rgb(239,68,68)] hover:text-red-500'>
                <LightbulbOutlinedIcon className='mr-1 text-gray-500' />
                Bật đèn
              </button>
    
              <button className='transition ease-in-out duration-300 px-2 py-1 hover:[text-shadow:2px_2px_4px_rgb(239,68,68)] hover:text-red-500'>
                <ShareIcon className='mr-1 text-sky-500' />
                Chia sẻ
              </button>
    
              <button 
                className='transition ease-in-out duration-300 px-2 py-1 hover:[text-shadow:2px_2px_4px_rgb(239,68,68)] hover:text-red-500'
                onClick={() => {
                  profile ? setDisplayEvaluationBox(true) : displayAuthBoxState[1](true)
                }}
              >
                <BarChartIcon className='mr-1 text-yellow-500' />
                Đánh giá độ phù hợp
              </button>
            </div>
    
            <EpisodeList ref={ episodeListRef } episodes={ sortedEpisodes } player={ playerRef } />
    
            <MovieInfo movie={ movieEnities[movieId]! } />

            {/* <CardSlider title='Có thể bạn thích xem' movies={} /> */}
          </div>
        </div>
      </>
    )
  }

  return (
    <div className='relative mt-14 py-8 h-[120px]'>
      <Spinner className='absolute' />
    </div>
  )
}