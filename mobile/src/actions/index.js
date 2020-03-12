export function setError(error) {
  return {
    type: 'SET_ERROR',
    payload: error,
  }; 
}

export function userLogin(payload) {
  return {
    type: 'USER_LOGIN',
    payload
  };
}

export function userLogout() {
  return {
    type: 'USER_LOGOUT'
  };
}
