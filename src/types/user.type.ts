export type UserData = {
  id: number
  fullName: string
  email: string
  phoneNumber: string | null
  birthday: string | null
  avatar: string | null
  address: string | null
  organizations: any[]
}

export type Profile = Omit<UserData, 'organizations'>
