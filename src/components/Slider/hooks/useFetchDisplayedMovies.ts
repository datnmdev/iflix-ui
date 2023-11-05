import { useEffect, useState } from 'react'
import lodash from 'lodash'

import axiosInstance from '../../../utils/axios'

export default function useFetchDisplayedMovies<T>(): T[] {
  const [ movies, setMovies ] = useState<T[]>([])

  useEffect(() => {
    axiosInstance.get('/movies')
      .then(res => {
        setMovies(lodash.shuffle(res.data).slice(0, 8))
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return movies
}