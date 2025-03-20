import { createStore, combineReducers } from "redux";
import { contactsReducer } from "./reducers/contacts";

const rootReducer = combineReducers({
    contactsState: contactsReducer
});

export const store = createStore(rootReducer);
