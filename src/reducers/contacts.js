const initialState = {
    contacts: [
        { name: "Ravi", phoneNumber: "8753875873", email: "ravi@gmail.com" },
        { name: "Kumar", phoneNumber: "8754985499", email: "kumar@gmail.com" }
    ],
    filteredContacts: [] // For search functionality
};

export const contactsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_CONTACTS":
            return { ...state };

        case "ADD_CONTACT":
            return { ...state, contacts: [...state.contacts, action.payload] };

        case "EDIT_CONTACT":
            const updatedContacts = [...state.contacts];
            updatedContacts[action.payload.index] = action.payload.updatedContact;
            return { ...state, contacts: updatedContacts };

        case "DELETE_CONTACT":
            return {
                ...state,
                contacts: state.contacts.filter((_, i) => i !== action.payload)
            };

        case "SEARCH_CONTACTS":
            return {
                ...state,
                filteredContacts: state.contacts.filter((contact) =>
                    contact.name.toLowerCase().includes(action.payload.toLowerCase()) ||
                    contact.phoneNumber.includes(action.payload) ||
                    contact.email.toLowerCase().includes(action.payload.toLowerCase())
                )
            };

        default:
            return state;
    }
};
