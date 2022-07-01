import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS 
} from '../types';

export default(state,action) =>{
  switch(action.type){

    case USER_LOADED:
      return{
        ...state,
        isAuthenticated:true,
        loading:false,
        user:action.payload
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    
      //the token is in the payload. We want to store that to LS
      localStorage.setItem('token',action.payload.token)
      console.log('token stored');

      return{
       ...state,
       ...action.payload,//token
       isAuthenticated:true,
       loading:false
      }

    case REGISTER_FAIL:
      case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return{
        ...state,
        token:null,
        isAuthenticated:false,
        loading:false,
        user:null,
        error:action.payload//in dispatch we set the payload with error message.So that message will be set here as well
      }
    case CLEAR_ERRORS:
      return{
        ...state,
        error:null
      };
    default:
      return state;
  }
}