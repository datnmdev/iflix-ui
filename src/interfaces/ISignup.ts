interface ISignup {
  username: string,
  name: {
    first: string,
    last: string
  },
  email: string,
  password: string,
  repeatPassword: string
}

export default ISignup