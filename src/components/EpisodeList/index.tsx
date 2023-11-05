import { ForwardedRef, forwardRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import scrollIntoView from 'scroll-into-view-if-needed'
import SearchIcon from '@mui/icons-material/Search'

import IEpisodeListProps from './types/IEpisodeListProps'

const EpisodeList = forwardRef(({ className, episodes, player }: IEpisodeListProps, ref: ForwardedRef<HTMLDivElement | null>) => {
  const [ searchParams ] = useSearchParams()
  const [ episodeSearch, setEpisodeSearch ] = useState('')

  const foundEpisodes = episodes.filter(episode => episode.name.match(new RegExp(episodeSearch, 'gi')))

  return (
    <div ref={ ref } className={ `py-4 rounded ${ className }` }>
      <div>
        <label className='text-stone-950 dark:text-white' htmlFor='episodeSearch'>
          <SearchIcon sx={{ fontSize: '2rem' }} />
          TÌM TẬP NHANH
          <input 
            id='episodeSearch' 
            className='text-stone-900 block border-solid border-2 focus:border-inherit focus:outline-none rounded px-2 py-1 font-normal' 
            type="text" 
            placeholder='Nhập số tập...' 
            min={0}
            value={ episodeSearch }
            onChange={ (e) => setEpisodeSearch(e.target.value) }
          />
        </label>
      </div>

      <div className='my-4 flex justify-start items-center space-x-2 max-h-[220px] overflow-auto py-2'>
        { foundEpisodes.map(episode => {
          return (
            <Link
              className='animate-fadeIn'
              key={ episode._id }
              to={ `/player/${episode.movie}?episodeId=${episode._id}` }
              onClick={ () => {
                const videoHTML = player?.current?.querySelector('video')
                if (videoHTML) {
                  videoHTML.load()
                  scrollIntoView(player!.current!, {
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'center'
                  })
                }
              } }
            >
              <button 
                className={ `${ searchParams.get('episodeId') === episode._id ? 'bg-gradient-to-r from-pink-500 to-violet-500 text-white  [text-shadow:0px_0px_4px_white]' : '' } transition ease-in-out duration-500 w-[64px] p-2 shadow-md shadow-stone-400 dark:shadow-stone-950 rounded text-[0.9rem] text-stone-950 dark:text-white hover:bg-red-500 hover:text-white` }
              >
                { episode.name }
              </button>
            </Link>
          )
        }) }
      </div>
    </div>
  )
})

export default EpisodeList