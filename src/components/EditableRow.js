import React from 'react'

const EditableRow = ({editFormData, handleEditFormChange, handleCancelClick}) => {
    return (
        <tr>
            <td>
                <input 
                    type="number"
                    required="required"
                    placeholder="Enter new id..."
                    name="id"
                    value={editFormData.id}
                    onChange={handleEditFormChange}
                    >
                </input>
            </td>
            <td>
                <input 
                    type="text"
                    required="required"
                    placeholder="Enter new first name..."
                    name="firstName"
                    value={editFormData.firstName}
                    onChange={handleEditFormChange}>
                    
                </input>
            </td>
            <td>
                <input 
                    type="text"
                    required="required"
                    placeholder="Enter new last name..."
                    name="lastName"
                    value={editFormData.lastName}
                    onChange={handleEditFormChange}
                    >
                </input>
            </td>
            <td>
                <input 
                    type="number"
                    required="required"
                    placeholder="Enter new age..."
                    name="age"
                    value={editFormData.age}
                    onChange={handleEditFormChange}
                    >
                </input>
            </td>
            <td>
                <button type="submit"
                className="button button--hyperion">
                    <span><span> Save </span></span>
                </button>
                <button type="button"
                className="button button--hyperion"
                onClick={handleCancelClick}>
                    <span><span> Cancel </span></span>
                </button>
            </td>
        </tr>
    )
}

export default EditableRow