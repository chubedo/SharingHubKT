import { UserData } from './user.type'

export type LoginResponse = { message: string; accessToken: string; user: UserData }
