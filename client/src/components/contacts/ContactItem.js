import React, { useContext } from 'react'
import ContactContext from '../../context/contact/contactContext';
const ContactItem = ({contact}) => {

  const contactContext = useContext(ContactContext);
  const{_id,name,email,phone,type} = contact;

  const{deleteContact,setCurrent,clearCurrent} = contactContext;

  const onDelete = () =>{
       deleteContact(_id);// we have access to id because we are pulling it out of contact that is passed into props({contact})
       clearCurrent();
  }
  return (
    <div className ="card bg-light">
      <h3 className ="text-primary text-left">{/* space next to className: badge is must */}
        {name} {' '} 
        <span style = {{float:'right'}} // for the badge to float right
        className ={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>
          {type.charAt(0).toUpperCase() + type.slice(1)} {/*this is to display first char in type with an upper case */}
          </span>
        </h3>
      <ul>
        {email && <li>
         <i className ="fas fa-envelope-open"></i>
         {' '}
         {email}
         </li>}
        {phone && <li>
         <i className = "fas fa-phone"></i>
         {' '}
         {phone}
        </li>}
      </ul> 
      <p>
          <button className = "btn btn-dark btn-sm" onClick ={()=> setCurrent(contact)}>Edit</button>   
          <button className= "btn btn-danger btn-sm" onClick = {onDelete}>Delete</button>
      </p>
    </div>
  )
}

export default ContactItem;
