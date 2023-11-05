import IMovie from '../../../interfaces/IMovie'

interface ICardSliderProps {
  title: string,
  movies: IMovie[] | never[]
}

export default ICardSliderProps