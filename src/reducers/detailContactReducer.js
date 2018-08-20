import {
  GET_CONTACT,
} from "../actions/actionTypes";

const initialState = {
  contactArr: [{}], // initial contact is empty
  loggedIn: false // help us determine to unauthorize the page
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACT:
    // some contacts having missing values, check and add unknown to them
      if (action.payload.names === undefined) {
        action.payload['names'] = [{ displayName: 'Unknown' }];
      }
      if (action.payload.emailAddresses === undefined) {
        action.payload['emailAddresses'] = [{ value: 'Unknown' }];
      }
      if (action.payload.phoneNumbers === undefined) {
        action.payload['phoneNumbers'] = [{ value: 'Unknown' }];
      }
      if (action.payload.genders === undefined) {
        action.payload['genders'] = [{ 'formattedValue': 'Unknown' }];
      }
      if (action.payload.birthdays === undefined) {
        action.payload['birthdays'] = [{ 'date': { 'month': 'Unknown', 'day': 'Unknown' } }];
      }
      let detailContact = [{ name: action.payload.names[0].displayName, email: action.payload.emailAddresses[0].value, phone: action.payload.phoneNumbers[0].value, gender: action.payload.genders[0].formattedValue, birthday: action.payload.birthdays[0].date.month + '/' + action.payload.birthdays[0].date.day }]
      return Object.assign({}, state, {
        contactArr: [...detailContact],
        loggedIn: true
      });
    default:
      return state;
  }
};