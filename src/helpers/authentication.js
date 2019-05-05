export default {
  getCurrentToken: () => {
    return localStorage.getItem('token')
  },
  getCurrentUser: () => {
    return localStorage.getItem('user')
  }
}
