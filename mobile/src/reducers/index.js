import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';
import { fromJS } from 'immutable';

const INITIAL_STATE = {
  // logged in user
  current_user: {
    id: -1,
    name: '',
    email: '',
    access_token: '',
    refresh_token: '',
    expires_in: null,
    token_type: ''
  },

  // products component
  products: {},

  // app state
  error: false,
  error_message: '',
}

const authReducer = (state = fromJS(INITIAL_STATE), action) => {
  switch(action.type) {
    case 'USER_LOGIN':
      return state.merge({
        current_user: action.payload,
        loading: false,
        error: false,
        error_message: '',
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

    case 'USER_LOGOUT':
      return state.merge(INITIAL_STATE);
      break;

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  authReducer,
  // formReducer
});

export default rootReducer;