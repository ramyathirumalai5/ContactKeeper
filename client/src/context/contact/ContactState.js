import React , {useReducer} from 'react';
import axios from 'axios';

import ContactContext  from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  FILTER_CONTACTS,
  UPDATE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS

} from '../types';

const ContactState = (props) => {

const initalState = { 
  contacts:null,
  current:null, // when we click edit, whatever contact we want to edit should be put in this piece of state.
  filtered:null,
  error:null
};

const [state, dispatch]  = useReducer(contactReducer,initalState)

//Add Contact
const addContact = async (contact) =>{
  const config ={//doing this because we are sending data.
    headers: {
      'Content-Type':'application/json'
    }
  }

  try {
    const res = await axios.post('/api/contacts', contact,config);//notice that we are not sending the token with this because it is set globally in the setAuthToken.js

    dispatch({
      type:ADD_CONTACT ,
      payload:res.data
    });
  } catch (err) {
    dispatch({
      type:CONTACT_ERROR,
      payload:err.response.msg
    });  
  }
}

//Get Contacts
const getContacts = async () =>{
  try {
    const res = await axios.get('/api/contacts');

    dispatch({
      type:GET_CONTACTS ,
      payload:res.data
    });
  } catch (err) {
    dispatch({
      type:CONTACT_ERROR,
      payload:err.response.msg
    });  
  }
}
//Delete Contact
const deleteContact = async (id) =>{
  try {
    await axios.delete(`/api/contacts/${id}`);

    dispatch({
      type:DELETE_CONTACT , 
      payload:id
    });
  } catch (err) {
    dispatch({
      type:CONTACT_ERROR,
      payload:err.response.msg
    });  
  }
 }

 //Update Contact
const updateContact = async contact =>{
  const config ={//doing this because we are sending data.
    headers: {
      'Content-Type':'application/json'
    }
  }
  try {
    const res = await axios.put(`/api/contacts/${contact._id}`, contact,config);//notice that we are not sending the token with this because it is set globally in the setAuthToken.js

    dispatch({
      type:UPDATE_CONTACT ,
      payload:res.data
    });
  } catch (err) {
    dispatch({
      type:CONTACT_ERROR,
      payload:err.response.msg
    });  
  }
}
//Set Current Contact
const setCurrent = contact =>{
  dispatch({type:SET_CURRENT , payload:contact});
  
}

//Clear Current Contact

const clearCurrent = () =>{
  dispatch({type:CLEAR_CURRENT});
  
}

//Filter Contacts
const filterContacts = text =>{
  dispatch({type:FILTER_CONTACTS, payload:text});
}
//Clear Filter
const clearFilter = () =>{
  dispatch({type:CLEAR_FILTER});
}

//clear contacts
const clearContacts = () =>{
  dispatch({
  type:CLEAR_CONTACTS
  });
}

return(
     <ContactContext.Provider value = {{ //anything that needs to accessed from other components like state and actions go in here.
      contacts:state.contacts,
      current:state.current,
      filtered:state.filtered,
      error:state.error,
      addContact,
      deleteContact,
      setCurrent,
      clearCurrent,
      updateContact,
      filterContacts,
      clearFilter,
      getContacts,
      clearContacts

     }}>
      {props.children}

     </ContactContext.Provider>
)
};

export default ContactState;