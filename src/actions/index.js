/* global gapi */
import { GET_CONTACTS, GET_CONTACT, DELETE_CONTACT, CREATE_CONTACT } from "./actionTypes";

// api gets a list of contacts with the given fields
export function getContacts(pageToken) {
    return dispatch => {
        gapi.client.load('people', 'v1', () => {
            gapi.client.people.people.connections.list({
                resourceName: 'people/me',
                personFields: 'names,genders,birthdays',
                sortOrder: 'FIRST_NAME_ASCENDING',
                pageSize: '20',
                pageToken: pageToken
            }).then(res => {
                dispatch({
                    type: GET_CONTACTS,
                    payload: res.result
                });
            }).catch(error => {
                console.log(error);
            });
        });
    }
}

// get a single contact with the api call
export function getContact(resourceName) {
    return dispatch => {
        gapi.client.load('people', 'v1', () => {
            gapi.client.people.people.get({
                resourceName: resourceName,
                personFields: 'names,genders,birthdays,phoneNumbers,emailAddresses'
            }).then(response => {
                dispatch({
                    type: GET_CONTACT,
                    payload: response.result
                });
            }).catch(error => {
                console.log(error)
            });
        });
    }
}

// create a contact with the name, gender, birthday
export function createContact(state) {
    return dispatch => {
        gapi.client.load('people', 'v1', () => {
            gapi.client.people.people.createContact({
                names: [{displayName: state.name, givenName: state.name}],
                genders: [{value: state.gender, formattedValue: state.gender}],
                birthdays: [{date: {month: state.month, day: state.day}}]
            }).then(response => {
                dispatch({
                    type: CREATE_CONTACT,
                    payload: response.result
                });
            }).catch(error => {
                console.log(error)
            });
        });
    }
}

// delete contact with resourceName
export function deleteContact(resourceName) {
    return dispatch => {
        gapi.client.load('people', 'v1', () => {
            // get the contact by resource name
            gapi.client.people.people.deleteContact({
                resourceName: resourceName,
            }).then(response => {
                dispatch({
                    type: DELETE_CONTACT,
                    payload: resourceName
                });
            }).catch(error => {
                console.log(error)
            });
        });
    }
}
