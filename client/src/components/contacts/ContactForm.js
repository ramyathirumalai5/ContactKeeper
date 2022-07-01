import React, {useState, useContext,useEffect}from 'react';// since its a form, we need component level state and thats why using 'useState'. 
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {

  const contactContext = useContext(ContactContext);

  const{current,updateContact,clearCurrent} = contactContext;

  useEffect(() => {
    if(current!= null)
    {
      setContact(current);
    }
    else {
      setContact(
        {
          name:'',
          email:'',
          phone:'',
          type:'personal'
        });
    }
  }, [contactContext,current]);// we only want this to happen when one of these two values gets changed.

  const [contact,setContact] = useState({// instead of having setter function for every single form item, we are putting everything inside an object and will have one setter function.
    name:'',
    email:'',
    phone:'',
    type:'personal'//default is personal
  });

  const{name,email,phone,type} = contact;

  const onChange = (e) =>{
           setContact({...contact,[e.target.name] : e.target.value});
      }

  const clearAll = () =>{
    clearCurrent();
  }

  const onSubmit = (e) =>{
    e.preventDefault();

    // we need to make a difference between adding and updating contact
    if(current === null){
      contactContext.addContact(contact);//contact is what we are passing because that is our state and it has all the form fields.
    }
    else{
       updateContact(contact); 
    }
    
    setContact({// clear all the fields
      name:'',
      email:'',
      phone:'',
      type:'personal'
    })
  }
  return (
    <form onSubmit = {onSubmit}>
      <h2 className = "text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
    <input 
      type = "text" 
      placeholder ="Name" 
      name = "name" 
      value = {name} 
      onChange = {onChange} />{/*value={name} comes from the state */}

    <input 
      type = "email" 
      placeholder ="Email" 
      name = "email" 
      value = {email} 
      onChange = {onChange} />

    <input 
      type = "text"
      placeholder ="Phone number" 
      name = "phone" 
      value = {phone} 
      onChange = {onChange} />

     <h5>Contact Type</h5>
    <input 
      type = "radio"
      name = "type" 
      value = 'personal' 
      checked = {type === 'personal'} onChange = {onChange} />
      Personal  {' '}
    <input 
      type = "radio"
      name = "type" 
      value = 'professional' 
      checked = {type === 'professional'} onChange = {onChange} />  
    Professional
    <div>
      <input type = "submit" value = {current ? 'Update Contact' : 'Add Contact'} className = "btn btn-primary btn-block" />
    </div>
    {current && <div>
      <button className ="btn btn-light btn-block" onClick = {clearAll}>
        Clear
      </button>
      </div>}
    </form>
  )
}
export default ContactForm;