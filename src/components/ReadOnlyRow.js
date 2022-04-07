import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick, term, searchKeyword }) => {
    return (
          <tr>
              <td>{contact.id}</td>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.age}</td>
              <td>
                <button type="button"
                onClick={(event) => handleEditClick(event, contact)}
                className="button button--hyperion">
                     <span><span> Edit </span></span>
                </button>
                <button type="button"
                onClick={() => handleDeleteClick(contact.id)}
                className="button button--hyperion">
                    <span><span> Delete </span></span>
                </button>
              </td>
          </tr>
    );
};

export default ReadOnlyRow