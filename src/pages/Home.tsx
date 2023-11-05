import lodash from 'lodash'
import { useSelector } from 'react-redux'

import Genres from '../common/enums/Genres'
import CardSlider from '../components/CardSlider'
import Slider from '../components/Slider'
import { selectAllMovies, useGetMoviesQuery } from '../features/api/apiSlice'
import Schedule from '../components/Schedule'

export default function Home() {
  const { isSuccess } = useGetMoviesQuery()
  const movies = useSelector(selectAllMovies)

  const highlightedMovies = movies.slice().sort((movie1, movie2) => movie2.views-movie1.views).slice(0, 19)
  const seriesMovies = lodash.shuffle(movies.filter(movie => movie.genres.findIndex(genre => genre.name === Genres.TV_SERIES) != -1).slice(0, 19)) 
  const featureMovies = lodash.shuffle(movies.filter(movie => movie.genres.findIndex(genre => genre.name === Genres.MOVIE) != -1).slice(0, 19))
  const tvShows = lodash.shuffle(movies.filter(movie => movie.genres.findIndex(genre => genre.name === Genres.TV_SHOW) != -1).slice(0, 19))

  return (
    <div
      className='transition ease-linear duration-500 bg-white dark:bg-stone-800 mt-14 py-8'
    >
      <div
        className='lg:container lg:mx-auto'
      >
        <Slider visibleSlideCount={2} />

        <div>
          <Schedule title='LỊCH CHIẾU TUẦN NÀY' />
          { isSuccess && highlightedMovies.length > 0 ? <CardSlider title='PHIM NỔI BẬT' movies={highlightedMovies} /> : '' }
          { isSuccess && seriesMovies.length > 0  ? <CardSlider title='PHIM BỘ' movies={seriesMovies} /> : '' }
          { isSuccess && featureMovies.length > 0  ? <CardSlider title='PHIM LẺ' movies={featureMovies} /> : '' }
          { isSuccess && tvShows.length > 0  ? <CardSlider title='TV SHOW' movies={tvShows} /> : '' }
        </div>
      </div>
    </div>
    
  )
}