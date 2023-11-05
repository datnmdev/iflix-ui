import * as Yup from 'yup'

const validationSchema = Yup.object({
  violenceLevel: Yup.number()
    .required('Trường này là bắt buộc')
    .min(0, 'Giá trị không nhỏ hơn 0')
    .max(10, 'Giá trị khuông vượt quá 10'),
  discomfort: Yup.array()
    .test({
      name: 'noneEmpty',
      message: 'Vui lòng chọn một mục phù hợp',
      test: function(value) {
        return value && value?.length > 0 
      }
    }),
  suitableAge: Yup.number()
    .required('Trường này là bắt buộc')
    .min(1, 'Giá trị không nhỏ hơn 1')
    .max(100, 'Giá trị không vượt quá 100')
})

export default validationSchema