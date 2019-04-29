export default {
  authHeaders( ) {
    let storedToken = JSON.parse( localStorage.getItem( 'user' ) );
    if( storedToken && storedToken.token ) {
      return {
        'Authorization': 'Bearer ' + storedToken.token
      };
    }
    else {
      return { };
    }
  }
}