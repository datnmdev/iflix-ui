import generateAPIFullURLFromRelativePath from '../../../utils/path/generateAPIFullURLFromRelativePath'
import ISlideProps from './types/ISlideProps'

export default function Slide({ movie }: ISlideProps) {
  return (
    <div className='relative h-full'>
      <img
        className='w-[100%] h-[100%] object-cover object-center'
        src={ generateAPIFullURLFromRelativePath(movie.posterUrl) } 
        alt={ movie.title } 
      />
      <div
        className='absolute bottom-0 w-[100%] px-8 py-4 bg-[rgba(0,0,0,0.68)] text-white'
      >
        <h1
          className='text-[1.4rem]'
        >
          { movie.title }
        </h1>
        <h2>
          { movie.alias.length > 1 ? `[${ movie.alias[1] }]` : '' }
        </h2>
      </div>
    </div>
  )
}