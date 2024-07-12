import React from 'react';

const NewContactForm = ({ onSubmit, formData, onChange }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  const handleChange = (e) => {
    onChange(e);
  };

  const handleCancel = () => {
    // Implement cancel logic here, e.g., clear form or close popup
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="id"
        placeholder="ID"
        value={formData.id}
        onChange={handleChange}
        className="w-full p-2 mb-4 rounded-lg bg-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="FirstName"
        placeholder="First name"
        value={formData.FirstName}
        onChange={handleChange}
        className="w-full p-2 mb-4 rounded-lg bg-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="LastName"
        placeholder="Last name"
        value={formData.LastName}
        onChange={handleChange}
        className="w-full p-2 mb-4 rounded-lg bg-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="Email"
        placeholder="Email address"
        value={formData.Email}
        onChange={handleChange}
        className="w-full p-2 mb-4 rounded-lg bg-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="Phone"
        placeholder="Phone number"
        value={formData.Phone}
        onChange={handleChange}
        className="w-full p-2 mb-4 rounded-lg bg-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="py-2 px-4 bg-gray-400 text-white rounded-lg hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NewContactForm;
