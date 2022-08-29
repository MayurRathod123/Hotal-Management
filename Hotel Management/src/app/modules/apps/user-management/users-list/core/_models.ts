import {ID, Response} from '../../../../../../_metronic/helpers'
export type User = {
  userId?: ID
  name?: string
  userName?: string
  userPhone?: string
  password?: string
  avatar?: string
  userEmail?: string
  position?: string
  role?: string
  last_login?: string
  two_steps?: boolean
  joined_day?: string
  online?: boolean
  initials?: {
    label: string
    state: string
  }
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  avatar: 'avatars/300-6.jpg',
  position: 'Art Director',
  role: 'Administrator',
  name: '',
  userEmail: '',
}
