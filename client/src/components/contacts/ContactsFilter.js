import React ,{useContext, useRef,useEffect}from 'react';// useRef is used to reference DOM objects
import ContactContext from '../../context/contact/contactContext';

const ContactsFilter = () => {
 
  const contactContext = useContext(ContactContext);
  const{filtered,filterContacts , clearFilter} = contactContext;
  const text = useRef('');

  useEffect(() =>{
  if(filtered === null){
    text.current.value = '';
  }
  });


 const onChange = (e) =>{
    if(text.current.value !== ' ') // this will give the value that user enters in search box
    {
      filterContacts(e.target.value);
    } else
     clearFilter();
 }
  return (
    <form>
      <input ref = {text} type = "text" placeholder = "Filter Contacts..." onChange = {onChange}></input>
    </form>
  )
}

export default ContactsFilter;