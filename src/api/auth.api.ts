import { FormDataLogin } from 'src/pages/login/Login'
import { FormDataRegister } from 'src/pages/register/Register'
import { LoginResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

const PATH = 'auth'

export const authApi = {
  login: (body: FormDataLogin) => http.post<LoginResponse>(`${PATH}/login`, body),
  register: (body: Omit<FormDataRegister, 'agree'>) => http.post<{ message: string }>(`${PATH}/register`, body)
}
