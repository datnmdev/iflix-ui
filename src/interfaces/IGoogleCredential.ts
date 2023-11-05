import {Types} from 'mongoose'

interface IGoogleCredential {
    uid: string,
    user: Types.ObjectId
}

export default IGoogleCredential