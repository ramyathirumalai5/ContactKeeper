import React,{useContext} from 'react';
import {Route,Redirect} from 'react-router-dom';
import authContext from '../../context/Auth/authContext';

 const PrivateRoute = ({component:Component, ...rest}) => {

  const AuthContext = useContext(authContext);
  const{isAuthenticated,loading} = AuthContext;
  return (
  <Route {...rest} render = {props=>!isAuthenticated && !loading ? 
    (<Redirect to ='/login'/>) // if the user is not authenticated and if state is done loading then we are asking to redirect to the 'login' page.
    : (<Component {...props}/>)  }/> //else we want to load whatever component that is.
  
  
    )
}

export default PrivateRoute;
