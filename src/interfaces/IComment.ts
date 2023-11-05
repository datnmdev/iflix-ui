import IUser from './IUser'

interface IComment {
    _id: string,
    pin?: boolean | false,
    text: string,
    likes?: string[],
    dislikes?: string[],
    author: IUser,
    episode: string,
    parent?: string,
    replies?: string[]
}

export default IComment
