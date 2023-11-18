export type UserData = {
  id: number
  fullName: string
  email: string
  phoneNumber: string | null
  birthday: string | null
  avatar: string | null
  address: string | null
  organizations: {
    id: number
    name: string
    phoneNumber: string | null
    address: string
    description: string
    avatar: string | null
  }[]
}
