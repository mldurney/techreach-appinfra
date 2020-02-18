import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { fromJS } from 'immutable';

const INITIAL_STATE = {
  id: -1,
  name: '',
  email: '',
  password: '',
  access_token: '',
  refresh_token: '',
  expires: null,
  loading: false,
  error: false,
  error_message: '',
}

const authReducer = (state = fromJS(INITIAL_STATE), action) => {
  switch(action.type) {
    case 'LOGIN_REQUEST':
      return state.merge({
        email: action.payload.email,
        password: action.payload.password,
        loading: true,
        error: false,
        error_message: '',
      })
      break;

    case 'LOGIN_SUCCESS':
      // console.log('payload',action.payload)
      return state.merge({
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
        expires: action.payload.expires,
        password: '',
        loading: false,
        error: false,
        error_message: '',
      });
      break;

    case 'LOGIN_FAILURE':
      if (action.payload instanceof TypeError) {
        return state.merge(INITIAL_STATE).merge({
          error: true,
          error_message: 'Network error.'
        });
      }
      return state.merge(INITIAL_STATE).merge({
          error: true,
          error_message: 'Incorrect username or password.'
        });
      break;

    // case USER_REQUEST:
    //   return state.merge({loading:true,error:false});
    //   break;

    // case USER_SUCCESS:
    //   return state.merge(action.payload.response).merge({loading:false,error:false});
    //   break;

    // case USER_FAILURE:
    //   return state.merge({loading:false,error:true});
    //   break;

    case 'LOGOUT_REQUEST':
      return state.merge(INITIAL_STATE);
      break;

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  authReducer,
  formReducer
});

export default rootReducer;