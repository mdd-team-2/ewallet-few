export const getters = {
  isLoggedIn: (state) => {
    return !!state.token
  },
  currentUser: (state) => {
    return state.user ? state.user.name : undefined
  },
  currentRole: (state) => {
    return state.user ? state.user.role : undefined
  }
}
