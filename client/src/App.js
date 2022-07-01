import React, {Fragment}from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'; 
import Navbar from './components/layout/Navbar';
import './App.css';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactState from './context/contact/ContactState';
import AuthState from './context/Auth/AuthState';
import Register  from './components/auth/Register';
import Login from './components/auth/Login';
import AlertState from './context/Alert/AlertState';
import Alerts from './components/layout/Alerts';
import setAuthToken  from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';


if(localStorage.token) {
 
  setAuthToken(localStorage.token);
  
}

const App = () => {
  return (
    <AuthState>
    <ContactState>
      <AlertState>
    <Router>
      <Fragment>
        <Navbar  />
          <div className ="container">
            <Alerts />
            <Switch>
              <PrivateRoute exact path = '/' component ={Home}></PrivateRoute>
              <Route exact path = '/about' component={About}></Route>
              <Route exact path = '/register' component = {Register}></Route>
              <Route exact path = '/login' component={Login}></Route>
            </Switch>
            
          </div>
      </Fragment>
    </Router>
    </AlertState>
    </ContactState>
    </AuthState>
  );
}

Navbar.defaultProps = {
  title:'Contact Keeper',
  icon:'fas fa-id-card-alt'
}
export default App;

