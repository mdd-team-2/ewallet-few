export default {
  getAuthHeader: () => {
    let storedToken = JSON.parse(localStorage.getItem('user'))
    if (storedToken && storedToken.token) {
      return 'Bearer ' + storedToken.token
    } else {
      return undefined
    }
  }
}
