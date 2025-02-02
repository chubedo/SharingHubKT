const path = {
  home: '/',
  login: '/login',
  logout: '/logout',
  register: '/register',
  explore: '/explore',
  campaignDetails: '/explore/:id',
  volunteerRegister: '/explore/:id/volunteer',
  donate: '/explore/:id/donate',
  management: '/management',
  managementDetails: '/management/:id',
  createCampaign: '/management/create',
  notifications: '/notifications',
  profile: '/profile'
} as const

export default path
