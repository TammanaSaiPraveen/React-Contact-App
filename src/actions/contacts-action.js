// Action Types
export const GET_ALL_CONTACTS = "GET_ALL_CONTACTS";
export const ADD_CONTACT = "ADD_CONTACT";
export const EDIT_CONTACT = "EDIT_CONTACT";
export const DELETE_CONTACT = "DELETE_CONTACT";
export const SEARCH_CONTACTS = "SEARCH_CONTACTS";

// Action Creators
export const getAllContacts = () => {
    return { type: GET_ALL_CONTACTS };
};

export const addContact = (contact) => {
    return { type: ADD_CONTACT, payload: contact };
};

export const editContact = (index, updatedContact) => {
    return { type: EDIT_CONTACT, payload: { index, updatedContact } };
};

export const deleteContact = (index) => {
    return { type: DELETE_CONTACT, payload: index };
};

export const searchContacts = (query) => {
    return { type: SEARCH_CONTACTS, payload: query };
};
