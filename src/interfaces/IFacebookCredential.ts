import {Types} from 'mongoose'

interface IFacebookCredential {
    uid: string,
    user: Types.ObjectId
}

export default IFacebookCredential