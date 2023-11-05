import generateAPIFullURLFromRelativePath from '../../../../utils/path/generateAPIFullURLFromRelativePath'
import IScheduleMovieCardProps from './types/IScheduleMovieCardProps'

export default function ScheduleMovieCard({ className, movie, content }: IScheduleMovieCardProps) {
  return (
    <div
      className={ `group/wrapper transition ease-linear duration-500 text-stone-950 dark:text-white ${ className }` }
      title={ content }
    >
      <div className='relative'>
        <img
          className='translate ease-in-out duration-200 group-hover/wrapper:scale-110 absolute top-[50%] left-[-16px] translate-y-[-50%] z-[1] w-[72px] h-[72px] object-cover object-center rounded-[50%] border-solid border-4 border-stone-600'
          src={ generateAPIFullURLFromRelativePath(movie.posterUrl) } 
          alt={ movie.title }
        />
        <div className='transition ease-in-out duration-200 text-[0.9rem] shadow-md shadow-stone-400 dark:shadow-stone-950 group-hover/wrapper:[text-shadow:0_2px_8px_rgb(255,255,255)] group-hover/wrapper:text-white group-hover/wrapper:bg-[linear-gradient(140deg,#ec4899,#8b5cf6)] rounded w-full h-full pl-[64px] pr-4 py-2'>
          <p className='font-[500] truncate overflow-hidden'>{ movie.title }</p>
          <p className='italic'>
            Tập mới nhất 
            <span className='text-red-500 font-[500] group-hover/wrapper:[text-shadow:0_2px_8px_red]'>
              { movie.episode.numberOfEpisodesReleased > 0 ? ` Tập ${ movie.episode.numberOfEpisodesReleased }` : ' Trailer' }
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}