import {
  GET_CONTACTS, DELETE_CONTACT,CREATE_CONTACT
} from "../actions/actionTypes";

const initialState = {
  contactsArr: [], // all contacts will be stored in here
  nextPage: "", // used for api, to get next page
  loggedIn: false, // used to show login button
  refresh: false, // used when contact created or deleted, refresh our list
  ranks: -19,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACTS:
    // check for missing values, and add unknown to them
      let newAllContacts = action.payload.connections.map(contact => {
        if (contact.names === undefined) {
          contact['names'] = [{ displayName: 'Unknown' }]
        }
        if (contact.genders === undefined) {
          contact['genders'] = [{ formattedValue: 'Unknown' }]
        }
        if (contact.birthdays === undefined) {
          contact['birthdays'] = [{ date: { month: 'Unknown', day: 'Unknown' } }]
        }
        return contact;
      })
      return Object.assign({}, state, {
        contactsArr: [...newAllContacts],
        nextPage: action.payload.nextPageToken,
        loggedIn: true, // component knows its a sucessful login, no need to show login button
        refresh: false,
        ranks: state.ranks + 20,
      });
    case DELETE_CONTACT:
      return Object.assign({}, state, {
        contactsArr: state.contactsArr,
        nextPage: state.nextPage,
        refresh: true, // only need this to refresh our contact list
        ranks: -19
      });
    case CREATE_CONTACT:
      return Object.assign({}, state, {
        contactsArr: state.contactsArr,
        nextPage: state.nextPage,
        loggedIn: state.loggedIn,
        refresh: true, // only need this to refresh our contact list
        ranks: -19,
      });
    default:
      return state;
  }
};