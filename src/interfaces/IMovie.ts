import ICast from './ICast'
import ICountry from './ICountry'
import IDirector from './IDirector'
import IGenre from './IGenre'

interface IMovie {
    _id: string,
    title: string,
    alias: string[] | never[],
    description?: string,
    posterUrl: string,
    release: number,
    duration: string,
    views: number,
    episode: {
      total: number,
      numberOfEpisodesReleased: number
    },
    followerCount: number,
    ratingSummary: {
      starRatingCount: number,
      reviewCount: number
    },
    genres: IGenre[] | never[],
    directors: IDirector[] | never[],
    casts: ICast[] | never[],
    country: ICountry
}

export default IMovie