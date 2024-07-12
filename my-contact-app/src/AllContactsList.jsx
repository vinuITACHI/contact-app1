import React from 'react';

const AllContactsList = ({ contacts, onEdit, onDelete }) => {
  const handleEdit = (contact) => {
    onEdit(contact);
  };

  const handleDelete = (contactId) => {
    onDelete(contactId);
  };

  return (
    <div className="contacts-list">
      {contacts.length > 0 ? (
        contacts.map(contact => (
          <div key={contact._id} className="bg-gray-200 p-4 mb-4 rounded-lg">
            <p><strong>ID:</strong> {contact.id}</p>
            <p><strong>First Name:</strong> {contact.FirstName}</p>
            <p><strong>Last Name:</strong> {contact.LastName}</p>
            <p><strong>Email:</strong> {contact.Email}</p>
            <p><strong>Phone:</strong> {contact.Phone}</p>
            <div className="flex mt-4">
              <button
                onClick={() => handleEdit(contact)}
                className="py-1 px-2 bg-blue-500 text-white rounded-lg mr-2 hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(contact._id)}
                className="py-1 px-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No contacts available</p>
      )}
    </div>
  );
};

export default AllContactsList;
