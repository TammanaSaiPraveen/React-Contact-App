// import React, { useState } from "react";

// const ContactsApp = () => {
//     const [contacts, setContacts] = useState([]);
//     const [newContact, setNewContact] = useState({ name: "", phoneNumber: "", email: "" });
//     const [editIndex, setEditIndex] = useState(null);
//     const [searchQuery, setSearchQuery] = useState("");

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewContact({ ...newContact, [name]: value });
//     };

//     const handleAddContact = () => {
//         if (!newContact.name || !newContact.phoneNumber || !newContact.email) {
//             alert("All fields are required!");
//             return;
//         }

//         if (!newContact.email.includes("@")) {
//             alert("Invalid email! Email must contain '@'.");
//             return;
//         }

//         const phoneRegex = /^[6-9]\d{9}$/;
//         if (!phoneRegex.test(newContact.phoneNumber)) {
//             alert("Invalid phone number! Indian numbers must be 10 digits and start with 6-9.");
//             return;
//         }

//         const formattedPhone = `+91 ${newContact.phoneNumber}`;
//         if (contacts.some(contact => contact.phoneNumber === formattedPhone)) {
//             alert("Phone number already exists!");
//             return;
//         }

//         setContacts([...contacts, { ...newContact, phoneNumber: formattedPhone }]);
//         setNewContact({ name: "", phoneNumber: "", email: "" });
//     };

//     const handleEditContact = () => {
//         if (editIndex !== null) {
//             if (!newContact.name || !newContact.phoneNumber || !newContact.email) {
//                 alert("All fields are required!");
//                 return;
//             }

//             if (!newContact.email.includes("@")) {
//                 alert("Invalid email! Email must contain '@'.");
//                 return;
//             }

//             const phoneRegex = /^[6-9]\d{9}$/;
//             if (!phoneRegex.test(newContact.phoneNumber.replace("+91 ", ""))) {
//                 alert("Invalid phone number! Indian numbers must be 10 digits and start with 6-9.");
//                 return;
//             }

//             const formattedPhone = `+91 ${newContact.phoneNumber.replace("+91 ", "")}`;
//             if (contacts.some((contact, index) => index !== editIndex && contact.phoneNumber === formattedPhone)) {
//                 alert("Phone number already exists!");
//                 return;
//             }

//             const updatedContacts = [...contacts];
//             updatedContacts[editIndex] = { ...newContact, phoneNumber: formattedPhone };
//             setContacts(updatedContacts);
//             setNewContact({ name: "", phoneNumber: "", email: "" });
//             setEditIndex(null);
//         }
//     };

//     const handleDelete = (index) => {
//         const updatedContacts = contacts.filter((_, i) => i !== index);
//         setContacts(updatedContacts);
//     };

//     const filteredContacts = contacts.filter(contact =>
//         contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         contact.phoneNumber.includes(searchQuery) ||
//         contact.email.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     return (
//         <div className="container mt-4">
//             <h2 className="mb-3">📞 Contact Management</h2>

//             <div className="mb-3">
//                 <input
//                     type="text"
//                     className="form-control"
//                     name="name"
//                     placeholder="Name"
//                     value={newContact.name}
//                     onChange={handleInputChange}
//                 />
//                 <input
//                     type="text"
//                     className="form-control mt-2"
//                     name="phoneNumber"
//                     placeholder="Phone Number (10-digit)"
//                     value={newContact.phoneNumber}
//                     onChange={handleInputChange}
//                 />
//                 <input
//                     type="email"
//                     className="form-control mt-2"
//                     name="email"
//                     placeholder="Email"
//                     value={newContact.email}
//                     onChange={handleInputChange}
//                 />
//             </div>

//             {editIndex === null ? (
//                 <button className="btn btn-primary" onClick={handleAddContact}>Add Contact</button>
//             ) : (
//                 <button className="btn btn-warning" onClick={handleEditContact}>Update Contact</button>
//             )}

//             <input
//                 type="text"
//                 className="form-control mt-3"
//                 placeholder="🔍 Search by name, phone, or email..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//             />

//             <table className="table mt-3">
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>Name</th>
//                         <th>Phone Number</th>
//                         <th>Email</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {(searchQuery ? filteredContacts : contacts).map((contact, index) => (
//                         <tr key={index}>
//                             <th scope="row">{index + 1}</th>
//                             <td>{contact.name}</td>
//                             <td>🇮🇳 {contact.phoneNumber}</td>
//                             <td>{contact.email}</td>
//                             <td>
//                                 <button className="btn btn-sm btn-warning me-2" onClick={() => {
//                                     setNewContact(contact);
//                                     setEditIndex(index);
//                                 }}>Edit</button>
//                                 <button className="btn btn-sm btn-danger" onClick={() => handleDelete(index)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ContactsApp;
import React, { useState } from "react";

const countryCodes = {
    India: "+91",
    USA: "+1",
    China: "+86",
    UK: "+44",
    Canada: "+1",
    Australia: "+61",
    Germany: "+49",
    France: "+33",
    Japan: "+81",
};

const ContactsApp = () => {
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState({ name: "", phoneNumber: "", email: "", country: "India" });
    const [editIndex, setEditIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // If country changes, update phone number with new country code
        if (name === "country") {
            const countryCode = countryCodes[value];
            let phoneWithoutCode = newContact.phoneNumber.replace(/^\+\d+\s*/, ""); // Remove old country code
            setNewContact({ ...newContact, country: value, phoneNumber: `${countryCode} ${phoneWithoutCode}` });
        } else {
            setNewContact({ ...newContact, [name]: value });
        }
    };

    const handleAddContact = () => {
        if (!newContact.name || !newContact.phoneNumber || !newContact.email) {
            alert("All fields are required!");
            return;
        }

        if (!newContact.email.includes("@")) {
            alert("Invalid email! Email must contain '@'.");
            return;
        }

        if (contacts.some(contact => contact.phoneNumber === newContact.phoneNumber)) {
            alert("Phone number already exists!");
            return;
        }

        setContacts([...contacts, newContact]);
        setNewContact({ name: "", phoneNumber: "", email: "", country: "India" });
    };

    const handleEditContact = () => {
        if (editIndex !== null) {
            if (!newContact.name || !newContact.phoneNumber || !newContact.email) {
                alert("All fields are required!");
                return;
            }

            if (!newContact.email.includes("@")) {
                alert("Invalid email! Email must contain '@'.");
                return;
            }

            if (contacts.some((contact, index) => index !== editIndex && contact.phoneNumber === newContact.phoneNumber)) {
                alert("Phone number already exists!");
                return;
            }

            const updatedContacts = [...contacts];
            updatedContacts[editIndex] = newContact;
            setContacts(updatedContacts);
            setNewContact({ name: "", phoneNumber: "", email: "", country: "India" });
            setEditIndex(null);
        }
    };

    const handleDelete = (index) => {
        const updatedContacts = contacts.filter((_, i) => i !== index);
        setContacts(updatedContacts);
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phoneNumber.includes(searchQuery) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <h2 className="mb-3">📞 Contact Management</h2>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Name"
                    value={newContact.name}
                    onChange={handleInputChange}
                />
                <select
                    className="form-control mt-2"
                    name="country"
                    value={newContact.country}
                    onChange={handleInputChange}
                >
                    {Object.keys(countryCodes).map(country => (
                        <option key={country} value={country}>
                            {country} ({countryCodes[country]})
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    className="form-control mt-2"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={newContact.phoneNumber}
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    className="form-control mt-2"
                    name="email"
                    placeholder="Email"
                    value={newContact.email}
                    onChange={handleInputChange}
                />
            </div>

            {editIndex === null ? (
                <button className="btn btn-primary" onClick={handleAddContact}>Add Contact</button>
            ) : (
                <button className="btn btn-warning" onClick={handleEditContact}>Update Contact</button>
            )}

            {/* Search Input */}
            <input
                type="text"
                className="form-control mt-3"
                placeholder="🔍 Search by name, phone, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Contacts Table */}
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredContacts.length > 0 ? (
                        filteredContacts.map((contact, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{contact.name}</td>
                                <td>{contact.country}</td>
                                <td>{contact.phoneNumber}</td>
                                <td>{contact.email}</td>
                                <td>
                                    <button className="btn btn-sm btn-warning me-2" onClick={() => {
                                        setNewContact(contact);
                                        setEditIndex(index);
                                    }}>Edit</button>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(index)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No contacts found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ContactsApp;
