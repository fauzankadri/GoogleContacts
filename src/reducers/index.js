import { combineReducers } from "redux";
import allContactsReducer from "./allContactsReducer";
import detailContactReducer from "./detailContactReducer";

export default combineReducers({
    allContacts: allContactsReducer,
    detailContact: detailContactReducer,

});