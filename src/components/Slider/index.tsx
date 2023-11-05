import { useRef, MutableRefObject } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import scrollIntoView from 'scroll-into-view-if-needed'
import { Link } from 'react-router-dom'
import { selectAllEpisodes, useGetEpisodesQuery } from '../../features/api/apiSlice'
import { useSelector } from 'react-redux'

import ISliderProps from './types/ISliderProps'
import useFetchDisplayedMovies from './hooks/useFetchDisplayedMovies'
import IMovie from '../../interfaces/IMovie'
import Slide from './components/Slide'

export default function Slider({ visibleSlideCount = 2 }: ISliderProps) {
  const { isSuccess } = useGetEpisodesQuery()
  const episodes = useSelector(selectAllEpisodes)
  const displayedMovies = useFetchDisplayedMovies<IMovie>()
  const boundaryRef = useRef(null)
  const slidesRef = useRef<Map<string, HTMLAnchorElement> | null>(null)
  const btnsRef = useRef<Map<string, HTMLSpanElement> | null>(null)
  const indexRef = useRef(0)
  const intervalRef = useRef<number | null>(null)
  
  function sortedEpisodesOfMovie(movieId: string) {
    return episodes.slice().filter(episode => episode.movie === movieId).sort((ep1, ep2) => ep2.ordinalNumber - ep1.ordinalNumber)
  }
  
  if (displayedMovies.length <= 0) {
    return
  }

  function getMap(ref: MutableRefObject<Map<string | number, HTMLElement> | null>) {
    if (!ref.current) {
      ref.current = new Map();
    }
    return ref.current;
  }

  function handleNavBtnClick(index: number) {
    clearInterval(intervalRef.current!)

    const prevActivedBtn = getMap(btnsRef).get(displayedMovies[indexRef.current]._id + indexRef.current)
    prevActivedBtn!.classList.remove('bg-[#8bc34a]')

    const activedBtn = getMap(btnsRef).get(displayedMovies[index]._id + index)
    activedBtn!.classList.add('bg-[#8bc34a]')

    scrollIntoViewToMovie(displayedMovies[index]._id)
    indexRef.current = index

    if (displayedMovies.length > visibleSlideCount) {
      const intervalId = setInterval(() => {
        indexRef.current += 1

        if (indexRef.current >= displayedMovies.length) {
          indexRef.current = 0
        }

        const forwardSlideIndex = indexRef.current-1 < 0 ? displayedMovies.length-1 : indexRef.current-1
        btnsRef.current!.get(displayedMovies[forwardSlideIndex]._id + forwardSlideIndex)!.classList.remove('bg-[#8bc34a]')
        btnsRef.current!.get(displayedMovies[indexRef.current]._id + indexRef.current)!.classList.add('bg-[#8bc34a]')
        scrollIntoViewToMovie(displayedMovies[indexRef.current]._id)
        
      }, 4000)

      intervalRef.current = intervalId
    }
  }

  function scrollIntoViewToMovie(_id: string) {
    const movieElement = getMap(slidesRef).get(_id)

    if (movieElement) {
      scrollIntoView(movieElement, {
        behavior: 'smooth',
        block: 'end',
        inline: 'start',
        boundary: boundaryRef.current
      })
    }
  }

  if (displayedMovies.length > visibleSlideCount) {
    clearInterval(intervalRef.current!)
    
    const intervalId = setInterval(() => {
      indexRef.current += 1

      if (indexRef.current >= displayedMovies.length) {
        indexRef.current = 0
      }

      const forwardSlideIndex = indexRef.current-1 < 0 ? displayedMovies.length-1 : indexRef.current-1
      btnsRef.current!.get(displayedMovies[forwardSlideIndex]._id + forwardSlideIndex)!.classList.remove('bg-[#8bc34a]')
      btnsRef.current!.get(displayedMovies[indexRef.current]._id + indexRef.current)!.classList.add('bg-[#8bc34a]')
      scrollIntoViewToMovie(displayedMovies[indexRef.current]._id)
        
    }, 4000)

    intervalRef.current = intervalId
  }

  return (
    <div
      className='relative'
      ref={ boundaryRef }
    >
      <div
        className='h-[300px] flex justify-start items-center overflow-hidden'
      >
        { isSuccess && displayedMovies.map((movie) => {
          return (
            <Link
              key={ movie._id }
              to={ `/player/${movie._id}?episodeId=${ sortedEpisodesOfMovie(movie._id)[0]._id }` }
              className='basis-1/2 h-[100%] shrink-0'
              ref={ (node) => {
                const displayedMoviesMap = getMap(slidesRef)
                if (node) {
                  displayedMoviesMap.set(movie._id, node)
                } else {
                  displayedMoviesMap.delete(movie._id)
                }
              } }
              onClick={() => intervalRef.current ? clearInterval(intervalRef.current) : null}
            >
              <Slide movie={movie} />
            </Link>
            
          )
        }) }
      </div>
      <button
        className='absolute top-[50%] left-4 translate-y-[-50%] px-1 py-2 text-white rounded
        bg-gradient-to-r from-red-500 to-yellow-50 transition duration-500 ease-in-out
         hover:from-blue-500 hover:to-green-500'
        onClick={ () => handleNavBtnClick(indexRef.current-1 < 0 ? displayedMovies.length-1 : indexRef.current-1) }
      >
        <ArrowBackIosNewIcon 
          sx={{
            fontSize: '1.4rem'
          }}
        />
      </button>
      <button
        className='absolute top-[50%] right-4 translate-y-[-50%] px-1 py-2 text-white rounded
        bg-gradient-to-r from-red-500 to-yellow-50 transition duration-500 ease-in-out
         hover:from-blue-500 hover:to-green-500'
        onClick={() => handleNavBtnClick(indexRef.current+1 >= displayedMovies.length ? 0 : indexRef.current+1)}
      >
        <ArrowForwardIosIcon 
          sx={{
            fontSize: '1.4rem'
          }}
        />
      </button>
      <div
        className='absolute bottom-3 right-3 flex justify-center items-center'
      >
        { displayedMovies.map((movie, index) => {
          return (
            <button 
              key={movie._id + index}
              className={
                `bg-[#52a7f1] hover:bg-[#8bc34a] bg-clip-content w-[40px] 
                h-[10px] px-[6px] py-[1px] ${ index == 0 ? 'bg-[#8bc34a]' : '' }`
              } 
              ref={ (node) => {
                const btns = getMap(btnsRef)

                if (node) {
                  btns.set(movie._id + index, node)
                } else {
                  btns.delete(movie._id + index)
                }
              } }
              onClick={() => handleNavBtnClick(index)}
            ></button>
          )
        }) }
      </div>
    </div>
  )
}