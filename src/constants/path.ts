const path = {
  home: '/',
  login: '/login',
  logout: '/logout',
  register: '/register',
  explore: '/explore',
  campaignDetails: '/explore/:id',
  volunteerRegister: '/explore/:id/volunteer',
  donate: '/explore/:id/donate',
  notifications: '/notifications',
  profile: '/profile'
} as const

export default path
