import IMovieTabInfoProps from './types/IMovieTabInfoProps'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import PersonIcon from '@mui/icons-material/Person'
import VideocamIcon from '@mui/icons-material/Videocam'
import ImageIcon from '@mui/icons-material/Image'
import AdjustIcon from '@mui/icons-material/Adjust';
import { Link } from 'react-router-dom'

export default function MovieTabInfo({ movie }: IMovieTabInfoProps) {
  return (
    <div>
      <ul className='flex justify-start items-center text-gray-500 dark:text-white'>
        <li 
          className='relative transition ease-in-out duration-300 px-4 py-2 cursor-pointer hover:text-red-500 hover:[text-shadow:2px_2px_4px_rgb(239,68,68)]
          [text-shadow:2px_2px_4px_rgb(239,68,68)] text-red-500
          border-solid border-b-2 border-red-500
          before:content-[""] before:inline-block before:border-solid before:border-[6px] before:border-transparent before: before:border-t-red-500
          before:absolute before:left-[50%] before:top-[calc(100%+2px)]'
        >
          <TextSnippetIcon className='mr-1.5 text-green-400' />
          Thông tin phim
        </li>
        <li className='transition ease-in-out duration-300 px-4 py-2 cursor-pointer hover:text-red-500 hover:[text-shadow:2px_2px_4px_rgb(239,68,68)]'>
          <PersonIcon className='mr-1.5 text-pink-500' />
          Nhân vật
        </li>
        <li className='transition ease-in-out duration-300 px-4 py-2 cursor-pointer hover:text-red-500 hover:[text-shadow:2px_2px_4px_rgb(239,68,68)]'>
          <VideocamIcon className='mr-1.5 text-violet-500' />
          Trailer
        </li>
        <li className='transition ease-in-out duration-300 px-4 py-2 cursor-pointer hover:text-red-500 hover:[text-shadow:2px_2px_4px_rgb(239,68,68)]'>
          <ImageIcon className='mr-1.5 text-sky-500' />
          Hình ảnh
        </li>
      </ul>

      <ul className='p-4 flex flex-wrap justify-between items-center'>
        <li className='shrink-0 w-1/3 inline-block text-stone-900 dark:text-white transition ease-in-out duration-300'>
          <AdjustIcon />
          <span className='font-bold ml-1'>Trạng Thái:</span> 
          <span className='text-white bg-gradient-to-r from-pink-400 to-violet-700 px-2 py-1 rounded text-[0.9rem] font-bold ml-2'>
            { movie.episode.numberOfEpisodesReleased === movie.episode.total ? 'Đã hoàn thành' : 'Đang cập nhật' }
          </span>
        </li>

        <li className='shrink-0 w-1/3 inline-block text-stone-900 dark:text-white transition ease-in-out duration-300'>
          <AdjustIcon />
          <span className='font-bold ml-1'>Thể Loại:</span>
          <span className='ml-1'>
            { movie.genres.map((genre, index) => {
              return (
                <span key={index}>
                  <Link className='text-transparent bg-clip-text font-bold bg-gradient-to-r from-pink-400 to-violet-500' to='#'>{ genre.name }</Link>
                  { index !== movie.genres.length-1 ? <span>, </span> : '' }
                </span>
              )
            }) }
          </span>
        </li>

        <li className='shrink-0 w-1/3 inline-block text-stone-900 dark:text-white transition ease-in-out duration-300'>
          <AdjustIcon />
          <span className='font-bold ml-1'>Quốc Gia:</span>
          <span className='ml-1 text-transparent bg-clip-text font-bold bg-gradient-to-r from-pink-400 to-violet-500'>{ movie.country.name }</span>
        </li>
      </ul>

    </div>
  )
}