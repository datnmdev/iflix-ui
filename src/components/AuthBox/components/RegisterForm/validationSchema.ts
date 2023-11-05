import * as Yup from 'yup'

const validationSchema = Yup.object({
  username: Yup.string()
    .required('Trường này là bắt buộc')
    .nonNullable()
    .min(6, 'Tên đăng nhập tối thiểu phải chứa 6 kí tự')
    .lowercase('Tên đăng nhập chỉ chứa các kí tự thường')
    .trim(),
  name: Yup.object({
    first: Yup.string()
      .required('Trường này bắt buộc')
      .trim(),
    last: Yup.string()
      .required('Trường này là bắt buộc')
      .trim()
  }),
  email: Yup.string()
    .required('Trường này là bắt buộc')
    .email('Email không hợp lệ'),
  password: Yup.string()
    .required('Trường này là bắt buộc')
    .nonNullable()
    .min(8, 'Mật khẩu tối thiểu phải chứa 8 kí tự'),
  repeatPassword: Yup.string()
    .required('Trường này là bắt buộc')
    .nonNullable()
    .min(8, 'Mật khẩu tối thiểu phải chứa 8 kí tự')
    .test({
      name: 'equal',
      message: 'Mật khẩu không khớp',
      test: function (value: string) {
        return value === this.parent.password
      }
    })
})

export default validationSchema