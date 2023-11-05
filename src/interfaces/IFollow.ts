import { Types } from 'mongoose'

interface IFollow {
    movie: Types.ObjectId,
    user: Types.ObjectId
}

export default IFollow