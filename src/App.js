
import './App.css';
import { nanoid } from "nanoid";
import data from "./mock-data.json";
import { Fragment, useState } from 'react';
import ReadOnlyRow from './components/ReadOnlyRow';
import EditableRow from './components/EditableRow';


const App = () => {

  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFromData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    age: ""
  });

  const [editFormData, setEditFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    age: ""
  });

  const [editContactId, setEditContactId] = useState(null);


  const [searchTerm, setSearchTerm] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormaData = { ...addFormData};
    newFormaData[fieldName] = fieldValue;

    setAddFromData(newFormaData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormaData = { ...editFormData };
    newFormaData[fieldName] = fieldValue;

    setEditFormData(newFormaData);
  } 

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      index: nanoid(),
      id: addFormData.id, 
      firstName: addFormData.firstName,
      lastName: addFormData.lastName,
      age: addFormData.age
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);

  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      index: editContactId,
      id: editFormData.id,
      firstName: editFormData.firstName, 
      lastName: editFormData.lastName, 
      age: editFormData.age
    }

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);

  }

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      id: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      age: contact.age
    };

  setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  }

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  }

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if(searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
          return Object.values(contact).join(' ').toLowerCase().includes(searchTerm.toLowerCase());
        })
        setSearchResults(newContactList);
    }else{
        setSearchResults(contacts);

    }
  }

  const getSearchTerm = (e) => {
    [...contacts].searchKeyword(e.target.value);
};


  return (
    <div className="app-container"> 

    <div className="search-wrapper">
      <div className="search-content">
      <button className="submit-btn">
          <i class="fas fa-search"></i>
        </button>
          <input type="text"
          placeholder="Search name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
    </div>


      <form onSubmit={handleEditFormSubmit}>
      <table>
        <thead>
          <tr>
            <th> Id </th>
            <th> First Name </th>
            <th> Last Name </th>
            <th> Age </th>
            <th> Actions </th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
        <Fragment>
            {editContactId === contact.id ? (
              <EditableRow
              editFormData={editFormData} 
              handleEditFormChange={handleEditFormChange}
              handleCancelClick={handleCancelClick}
              />
            ) : (
               <ReadOnlyRow 
               contact={contact}  //contacts={searchTerm.length < 1 ? contacts : searchResults}
               handleEditClick={handleEditClick}
               handleDeleteClick={handleDeleteClick}
               // term={searchTerm}
               // searchKeyword={searchHandler}
               />
            )}
  
        </Fragment>
        

        ))}

        </tbody>
      </table>
      </form>
      <h2> Add new contact </h2>
      <form onSubmit={handleAddFormSubmit}>
        <input type="number" name="id" placeholder="Enter new id..." required="required" onChange={handleAddFormChange}></input>
        <input type="text" placeholder="Enter new First Name..." required="required" onChange={handleAddFormChange}></input>
        <input type="text"  name="lastName" placeholder="Enter new Last Name..." required="required" onChange={handleAddFormChange}></input>
        <input type="number" name="age" placeholder="Enter new age..." required="required" onChange={handleAddFormChange}></input>
        <button type="submit" className="button button--hyperion"> 
        <span><span> Add </span></span>
        </button>
      </form>
    </div>
  );
}

export default App;
