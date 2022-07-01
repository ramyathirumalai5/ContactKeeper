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

export default(state,action) =>{
  switch(action.type){
    
    case ADD_CONTACT:
      return{
        ...state,//copy of their current state
        contacts:[action.payload,...state.contacts],// because state is immutable first we are taking a copy of the state and then we have the data to be added that we sent in the payload.in our reducer  we return a new object each time. So we use the spread operator here to fill that new object with everything from the previous state object..and overwrite the contacts key-value.
        loading:false
      }

      case DELETE_CONTACT:
        return{
          ...state,
          contacts:[...state.contacts.filter(contact => contact._id !== action.payload)],//filtering out all the contacts except the one matching the id in action.payload
          loading:false
  }
  
    case SET_CURRENT:
      return{
      ...state,
      current:action.payload
    }

    case CLEAR_CURRENT:
      return{
        ...state,
        current:null
      }
    case UPDATE_CONTACT:
      return{
        ...state,
        contacts:state.contacts.map(contact => contact._id === action.payload._id ? action.payload : contact)
      }
    case CONTACT_ERROR:
      return{
        ...state,
        error:action.payload
      }

    
    case FILTER_CONTACTS:
      return{
        ...state,
        filtered:state.contacts.filter(contact => {
          const regex = new RegExp(`${action.payload}`,'gi');//we are just matching the text. gi means global and case-insensitive
          return contact.name.match(regex) || contact.email.match(regex);//will return anything that matches name or email.
        })
      };

    case CLEAR_FILTER:
      return{
        ...state,
        filtered:null
      };
    case GET_CONTACTS:
      return{
        ...state,
        contacts:action.payload,
        loading:false
      }
    case CLEAR_CONTACTS:
      return{
        ...state,
        contacts:null,
        filtered:null,
        error:null,
        current:null
      }
    default:
      return state;

  }
}