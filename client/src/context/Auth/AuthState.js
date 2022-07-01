import React , {useReducer} from 'react';
import axios from 'axios';
import AuthContext  from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
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


const AuthState = (props) => {

const initalState = {
  token:localStorage.getItem('token'),// get the token from LS
  isAuthenticated:null,
  user:null,
  loading:true, //it is going to be true until we make a request and then it will set to false 
  error:null   

};

const [state, dispatch]  = useReducer(authReducer,initalState)

//Load User

const loadUser = async() =>{
  console.log('Entered Load user');
 if(localStorage.token) {
     setAuthToken(localStorage.token);
 }
 console.log('Control comes to Loaduser again')
 try {
   const res = await axios.get('/api/auth');

   dispatch({
     type:USER_LOADED,
     payload:res.data
   })
 } catch (err) {
   dispatch({
     type:AUTH_ERROR
   })
 }
}; 

//Register User
const register = async formData =>{ //formData is the data  required to register a user
 const config = {//because its post request and as we are sending data we need headers
   headers:{ 'Content-Type':'application/json'}
 }
 try {//post request sent to users.js on the server
   const res = await axios.post('/api/users',formData,config);
   dispatch({
     type:REGISTER_SUCCESS,
     payload:res.data,//this will be the token.This connects to 'users.js' on the serverside
     
   });

   loadUser();
 } catch (err) {
   dispatch({//say if email already exists then 'REGISTER_FAIL' will execute.
     type:REGISTER_FAIL,
     payload:err.response.data.msg//this msg is from the users.js saying'user already exists'
   });
   
 }
}
//Login User

const login = async formData =>{ 
   console.log('Entered login user');
  const config = {
    headers:
    { 
      'Content-Type': 'application/json'
    }
  }

  try {
      console.log('Entered the try block of login user')
    const res = await axios.post('/api/auth',formData,config);
      console.log('Got the JWT token for login user')
    dispatch({

      type:LOGIN_SUCCESS,
      payload:res.data
    });
      console.log('Going to Load user')
    loadUser();
  } catch (err) {
    dispatch({
      type:LOGIN_FAIL,
      payload:err.response.data.msg
    });
    
  }
}

//Logout user
const logout = () =>{
  dispatch({
    type:LOGOUT
  })
}
//clear error
const clearErrors = () =>{
  dispatch({
    type:CLEAR_ERRORS
  })
}
return(
     <AuthContext.Provider 
     value = {{
       token:state.token,
       isAuthenticated:state.isAuthenticated,
       loading: state.loading,
       user:state.user,
       error:state.error,
       register,
       clearErrors,
       loadUser,
       login,
       logout
     }}>

{props.children}
</AuthContext.Provider>
);   
    };
export default AuthState;