import { useRef } from 'react'
import { Link } from 'react-router-dom'
import scrollIntoView from 'scroll-into-view-if-needed'

import Card from '../Card'
import ICardSliderProps from './types/ICardSliderProps'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

export default function CardSlider({ title, movies }: ICardSliderProps) {
  const indexRef = useRef(0)
  const boundaryRef = useRef(null)
  const moviesRef = useRef<Map<string, HTMLElement> | null>(null)

  function getMap() {
    if (!moviesRef.current) {
      moviesRef.current = new Map()
    }

    return moviesRef.current
  }

  function handlePrevBtnClick() {
    if (indexRef.current-1 < 0) {
      indexRef.current = movies.length-1
    } else {
      indexRef.current -= 1
    }

    const element = getMap().get(movies[indexRef.current]._id)

    if (element) {
      scrollIntoView(element, {
        behavior: 'smooth',
        block: 'end',
        inline: 'start',
        boundary: boundaryRef.current
      })
    }
  }

  function handleNextBtnClick() {
    if (indexRef.current+1 >= movies.length) {
      indexRef.current = 0
    } else {
      indexRef.current += 1
    }

    const element = getMap().get(movies[indexRef.current]._id)

    if (element) {
      scrollIntoView(element, {
        behavior: 'smooth',
        block: 'end',
        inline: 'start',
        boundary: boundaryRef.current
      })
    }
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
        <Link to='/' className='text-red-500 hover:[text-shadow:0_2px_8px_rgb(239,68,68)] hover:-translate-y-1'>
          Xem thêm
        </Link>
      </div>
      
      <div className='relative group/boundary'>
        <div 
          className='flex justify-start items-center overflow-hidden mx-[-8px] mt-8'
          ref={boundaryRef}
        >
          { movies.map(movie => {
            return (
              <Link
                key={movie._id} 
                to={`/player/${movie._id}`}
                className='w-1/5 h-[280px] px-[12px] shrink-0'
                ref={(node) => {
                  const moviesMap = getMap()

                  if (node) {
                    moviesMap.set(movie._id, node)
                  } else {
                    moviesMap.delete(movie._id)
                  }
                }}
              >
                <Card className='w-full h-full overflow-hidden rounded shadow-[3px_2px_4px_0_rgba(0,0,0,0.8)]' movie={movie} />
              </Link>
            )
          }) }
        </div>

        <button
          className='absolute hidden group-hover/boundary:block top-[50%] left-4 translate-y-[-50%] px-1 py-2 text-white rounded
          bg-gradient-to-r from-red-500 to-yellow-50 transition duration-500 ease-in-out
          hover:from-blue-500 hover:to-green-500'
          onClick={ handlePrevBtnClick }
        >
          <ArrowBackIosNewIcon 
            sx={{
              fontSize: '1.4rem'
            }}
          />
        </button>
        
        <button
          className='absolute hidden group-hover/boundary:block top-[50%] right-4 translate-y-[-50%] px-1 py-2 text-white rounded
          bg-gradient-to-r from-red-500 to-yellow-50 transition duration-500 ease-in-out
          hover:from-blue-500 hover:to-green-500'
          onClick={ handleNextBtnClick }
        >
          <ArrowForwardIosIcon 
            sx={{
              fontSize: '1.4rem'
            }}
          />
        </button>
      </div>
    </div>
  )
}