import React, { useState,useContext,useEffect} from 'react';
import authContext from '../../context/Auth/authContext';
import AlertContext from '../../context/Alert/alertContext';


const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const AuthContext = useContext(authContext);

  const {setAlert} = alertContext;
  const{login,error,clearErrors,isAuthenticated} = AuthContext;

  useEffect(()=>{
    if(isAuthenticated){
      props.history.push('/');
    }
    if(error === 'Invalid Credentials'){// We use 'Invalid Credentials' because that is the exact message that we send from routes->auth from the server side.
      setAlert(error,'danger');
      clearErrors();
    }
    //eslint-disable-next-line
  },[error,isAuthenticated,props.history]);


  const [user,setUser] = useState({
    
    email:'',
    password:''
    
  });

  const{email,password} = user;

  const onChange = e =>{
    setUser({...user, [e.target.name] : e.target.value});
  };
  const onSubmit = e =>{
    e.preventDefault();
    if(email === '' || password === '')
     setAlert('Please fill in all the fields','danger');
    else
    {
      login(// once we get authenticated then isAuthenticated will become 'true'and that will trigger the useEffect and you will be redirected to the home page.
        {
          email,
          password
        }
      )
    } 
  };

  return (
    <div className = "form-container">
      <h1>
        Account <span className = "text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        
        <div className = "form-group">
        <label htmlFor="email">Email </label>
        <input type = "email" name = "email" value = {email} onChange = {onChange}></input>
        </div>

        <div className = "form-group">
        <label htmlFor="password"> Password </label>
        <input type = "password" name = "password" value = {password} onChange = {onChange}></input>
        </div>

        <input type ="submit" value = "Login" className ="btn btn-primary btn-block">
        </input>
      </form>
      
    </div>
  )
}

export default Login;
