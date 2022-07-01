import React,{useContext,useEffect} from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactsFilter  from '../contacts/ContactsFilter';
import authContext from '../../context/Auth/authContext';

const Home = () => {

  const AuthContext = useContext(authContext);

  useEffect(()=>{//this will look at the token ,hit the backend, validate it and put the user into state.
    AuthContext.loadUser();
    //eslint-disable-next-line
  },[]);//we are adding the above comment because we don't want to add loadUser as an dependency.And [] is for running useEffect as soon as the component loads.

  return (//we will have a grid with form on one half and contact list on the other.
    <div className = "grid-2">
     <div>
        <ContactForm />
     </div>
     <div>
       <ContactsFilter />
       <Contacts />
     </div>
    </div>
  )
}
export default Home;