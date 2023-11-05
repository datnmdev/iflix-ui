import * as Yup from 'yup'

const validationSchema = Yup.object({
  username: Yup.string()
    .required('Trường này là bắt buộc')
    .nonNullable()
    .min(6, 'Tên đăng nhập tối thiểu phải chứa 6 kí tự')
    .lowercase('Tên đăng nhập chỉ chứa các kí tự thường')
    .trim(),
  password: Yup.string()
    .required('Trường này là bắt buộc')
    .nonNullable()
    .min(8, 'Mật khẩu tối thiểu phải chứa 8 kí tự')
})

export default validationSchema