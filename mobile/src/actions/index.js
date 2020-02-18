import { API_URL, OAUTH_ROUTE } from '../config/urls';

// export const userLoginRequest = () => ({
//   type: 'USER_LOGIN_REQUEST',
//   isLoggedIn: true,
//   token
// });

// export const userLoginSuccess = user => ({
//   type: 'USER_LOGIN_SUCCESS',
//   isLoggedIn: true,
//   user
// });

// export const userLoginFailure = error => ({
//   type: 'USER_LOGIN_FAILURE',
//   isLoggedIn: false,
//   token: '',
//   error
// });

// export const userLogout = () => ({
//   type: 'USER_LOGOUT_REQUEST',
//   isLoggedIn: false,
//   token: ''
// });

// export function userFetch(auth) {
//     return (dispatch) => {
//         console.log('auth',auth)
//         dispatch(userRequest(auth))
//         return fetch(USER_URL,{
//             method:'GET',
//             headers: {
//                 'Content-Type' : 'application/json',
//                 'Accept' :'application/json',
//                 'Authorization' : 'Bearer '+auth.access_token
//             }
//         })
//         .then(response => response.json())
//         .then(json => {
//             console.log('JSON',json)
//             if(json.hasOwnProperty('error'))
//                 dispatch(userFailure(auth,json.message))
//             else 
//                 dispatch(userSuccess(auth,json))
//         })
//         .catch((error) => {
//             console.log('ERROR',error)
//             dispatch(userFailure(auth,error))
//         })
//     }
// }
// export function userRequest(auth) {
//     return {
//         type:USER_REQUEST,
//         payload: auth
//     }
// }
// export function userSuccess(auth, response){
//     return {
//         type:USER_SUCCESS,
//         payload: { response }
//     }
// }
// export function userFailure(auth, error){
//     return {
//         type:USER_FAILURE,
//         payload: { auth, error}
//     }
// }

export function setError(error) {
  return {
    type: 'SET_ERROR',
    payload: error,
  }; 
}

// export function login(email, password) {
//   return (dispatch) => {
//     dispatch(loginRequest(email, password));

//     // TODO(iris): change this to /login!
//     const login_url = API_URL + OAUTH_ROUTE;
//     const request = {
//       method:'POST',
//       headers: {
//           'Content-Type' : 'application/json'
//       },
//       body: JSON.stringify({
//         grant_type:'password',
//         client_id: '2',
//         client_secret: 'Ad8mbpxYqtE00G15SML5DZXAMj1JtMgYa5h7akmS',
//         username: email,
//         password: password,
//         scope: '*'
//       })
//     };

//     return fetch(login_url, request)
//       .then(response => response.json())
//       .then(json => {
//         if (json.hasOwnProperty('error')) {
//           dispatch(loginFailure(json.message));
//         } else {
//           dispatch(loginSuccess(json));
//         }
//       })
//       .catch((error) => {
//         dispatch(loginFailure(error));
//       });
//   };
// }

// export function loginRequest(email, password) {
//   return {
//     type: 'LOGIN_REQUEST',
//     payload: { email, password }
//   };
// }

export function userLogin(payload) {
  return {
    type: 'USER_LOGIN',
    payload
  };
}

// export function loginFailure(payload) {
//   return {
//     type: 'LOGIN_FAILURE',
//     payload
//   };
// }

export function userLogout() {
  return {
    type: 'USER_LOGOUT'
  };
}
