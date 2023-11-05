import { Rating } from '@mui/material'
import generateAPIFullURLFromRelativePath from '../../utils/path/generateAPIFullURLFromRelativePath'
import ICardProps from './types/ICardProps'

export default function Card({ className, movie }: ICardProps) {
  return (
    <div className={`${ className } group/wrapper`}>
      <div className='relative w-full h-full'>
        <img 
          className='w-[100%] h-[100%] object-cover object-center transition ease-in-out duration-500 group-hover/wrapper:scale-150 scale-100'
          src={generateAPIFullURLFromRelativePath(movie.posterUrl)} 
          alt={movie.title} 
        />

        <span className={
          `absolute top-0 left-0 px-2 py-1 rounded text-white text-[0.9rem] font-[500] bg-gradient-to-tr 
          ${ movie.episode.numberOfEpisodesReleased == 0 ? 'from-[#d83232] to-[#460de2]' : 'from-[#d83232] to-[#e26d0d]' }`
        }>
          { movie.episode.numberOfEpisodesReleased == 0 ? 'Trailer': `Tập ${ movie.episode.numberOfEpisodesReleased }` }
        </span>

        <div className='absolute bottom-0 left-0 px-4 pb-2 overflow-hidden w-full'>
          <h3 className='truncate text-white [text-shadow:1px_1px_4px_rgba(0,0,0,0.8)] font-[500]'>{ movie.title }</h3>
          <h3 className='truncate text-white [text-shadow:1px_1px_4px_rgba(0,0,0,0.8)] text-[0.9rem] opacity-80'>{ movie.alias[1] }</h3>
          <Rating 
            name="half-rating" 
            sx={{ 
              fontSize: '1.2rem',
            }} 
            value={ movie.ratingSummary.starRatingCount/movie.ratingSummary.reviewCount || null } precision={1} 
            readOnly={true}
          />
        </div>
      </div>
    </div>
  )
}