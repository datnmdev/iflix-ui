import { RefObject } from 'react'
import IEpisode from '../../../interfaces/IEpisode'

interface IEpisodeListProps {
  className?: string,
  episodes: IEpisode[],
  player?: RefObject<HTMLDivElement>
}

export default IEpisodeListProps