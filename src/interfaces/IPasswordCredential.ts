import {Types} from 'mongoose'

interface IPasswordCredential {
    password: string,
    salt: string,
    user: Types.ObjectId
}

export default IPasswordCredential