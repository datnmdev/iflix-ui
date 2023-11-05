interface IEpisode {
    _id: string,
    ordinalNumber: number,
    name: string,
    videoUrl: string,
    commentCount: number,
    movie: string,
    createdAt: string,
    updatedAt: string
}

export default IEpisode