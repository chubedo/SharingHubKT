import * as yup from 'yup'

export const schema = yup.object({
  email: yup.string().required('Email is required').email('Email is invalid'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .min(8, 'Confirm password must be at least 8 characters')
    .oneOf([yup.ref('password')], 'Confirm password must be match'),
  fullName: yup.string().required('FullName is required'),
  agree: yup.boolean().required()
})

export const donationSchema = yup.object({
  name: yup.string().required('Tên hiện vật là bắt buộc'),
  status: yup.string().required('Tình trạng là bắt buộc')
})

export type Schema = yup.InferType<typeof schema>
export type DonationSchema = yup.InferType<typeof donationSchema>
