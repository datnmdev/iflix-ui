interface IUser {
  _id: string,
  username: string,
  email: string,
  name: {
    first: string,
    last: string
  },
  avatar: string,
  provider: string,
  role: string
}

export default IUser