import React, { useState, useEffect } from 'react';
import './tailwind.css';
import SearchContacts from './SearchContacts';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Avatar } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { HashLoader } from 'react-spinners';

const OutlookClone = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: '',
    avatar: ''
  });
  const [message, setMessage] = useState('');
  const [contacts, setContacts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [showContacts, setShowContacts] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [editContactId, setEditContactId] = useState(null);
  const [errors, setErrors] = useState({
    id: '',
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: ''
  });
  const [loading, setLoading] = useState(false); // State for controlling spinner

  useEffect(() => {
    if (editContactId) {
      const contactToEdit = contacts.find(contact => contact._id === editContactId);
      if (contactToEdit) {
        setFormData({
          id: contactToEdit.id,
          FirstName: contactToEdit.FirstName,
          LastName: contactToEdit.LastName,
          Email: contactToEdit.Email,
          Phone: contactToEdit.Phone,
          avatar: contactToEdit.avatar
        });
      }
    }
  }, [editContactId, contacts]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        avatar: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setMessage('');
    if (!showPopup) {
      setFormData({
        id: '',
        FirstName: '',
        LastName: '',
        Email: '',
        Phone: '',
        avatar: ''
      });
      setEditContactId(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let errorMessage = '';
    switch (fieldName) {
      case 'id':
        if (!/^\d*$/.test(value)) {
          errorMessage = 'Please enter only numbers';
        }
        break;
      case 'FirstName':
      case 'LastName':
        if (!/^[A-Za-z\s]*$/.test(value)) {
          errorMessage = 'Please enter only alphabetic characters';
        }
        break;
      case 'Email':
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          errorMessage = 'Please enter a valid email address';
        }
        break;
      case 'Phone':
        if (!/^\d{0,10}$/.test(value)) {
          errorMessage = 'Please enter a 10-digit phone number';
        }
        break;
      default:
        break;
    }
    setErrors({
      ...errors,
      [fieldName]: errorMessage
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Adding a delay to simulate loading tried adding the spinner time delay 
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating a 2-second delay
  
    if (Object.values(errors).some(error => error !== '')) {
      setMessage('Please fix validation errors before saving.');
      setLoading(false);
      return;
    }
    try {
      const response = await fetch('http://localhost:4000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          id: parseInt(formData.id, 10)
        }),
      });
      if (response.ok) {
        setMessage('Contact saved successfully');
        setFormData({
          id: '',
          FirstName: '',
          LastName: '',
          Email: '',
          Phone: '',
          avatar: ''
        });
        fetchContacts();
      } else {
        const errorData = await response.json();
        setMessage(`Failed to save contact: ${errorData.message}`);
      }
    } catch (error) {
      setMessage('Error: Failed to save contact');
    } finally {
      setLoading(false);
    }
  };
  

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner
    if (Object.values(errors).some(error => error !== '')) {
      setMessage('Please fix validation errors before saving.');
      setLoading(false); // Hide spinner
      return;
    }
    try {
      const response = await fetch(`http://localhost:4000/contact/${editContactId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setMessage('Contact updated successfully');
        setFormData({
          id: '',
          FirstName: '',
          LastName: '',
          Email: '',
          Phone: '',
          avatar: ''
        });
        setEditContactId(null);
        fetchContacts();
      } else {
        const errorData = await response.json();
        setMessage(`Failed to update contact: ${errorData.message}`);
      }
    } catch (error) {
      setMessage('Error: Failed to update contact');
    }
    setLoading(false); // Hide spinner after API call completes
  };

  const fetchContacts = async (page = 1) => {
    try {
      const response = await fetch(`http://localhost:4000/contact?page=${page}&limit=10`);
      const data = await response.json();
      if (page === 1) {
        setContacts(data);
      } else {
        setContacts(prevContacts => [...prevContacts, ...data]);
      }
      setHasMore(data.length > 0);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const fetchMoreContacts = () => {
    setPage(prevPage => prevPage + 1);
    fetchContacts(page + 1);
  };

  const toggleContacts = async () => {
    if (!showContacts) {
      await fetchContacts();
    }
    setShowContacts(!showContacts);
    setShowSearch(false);
  };

  const handleEdit = (contact) => {
    setEditContactId(contact._id);
    setShowPopup(true);
  };

  const handleDelete = async (contactId) => {
    try {
      const response = await fetch(`http://localhost:4000/contact/${contactId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessage('Contact deleted successfully');
        fetchContacts();
      } else {
        const errorData = await response.json();
        setMessage(`Failed to delete contact: ${errorData.message}`);
      }
    } catch (error) {
      setMessage('Error: Failed to delete contact');
    }
  };

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    setShowContacts(false);
  };

  const [showDashboard, setShowDashboard] = useState(false);

  const toggleDashboard = () => {
    setShowDashboard(!showDashboard);
  };

  const handleCancel = () => {
    setShowPopup(false);
    setMessage('');
    setFormData({
      id: '',
      FirstName: '',
      LastName: '',
      Email: '',
      Phone: '',
      avatar: ''
    });
    setEditContactId(null);
  };

  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <div className="flex flex-grow">
        <div className="w-1/6 bg-gray-200 p-4">
          <button
            onClick={toggleDashboard}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg mb-4 hover:bg-blue-700"
          >
            Dashboard
          </button>
          <button
            onClick={togglePopup}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg mb-4 hover:bg-blue-700"
          >
            New Contact
          </button>
          <button
            onClick={toggleContacts}
            className="w-full py-2 px-4 bg-green-500 text-white rounded-lg mb-4 hover:bg-green-700"
          >
            All Contacts
          </button>
          <button
            onClick={handleSearchToggle}
            className="w-full py-2 px-4 bg-yellow-500 text-white rounded-lg mb-4 hover:bg-yellow-700"
          >
            Search Contacts
          </button>
        </div>
        <div className="w-5/6 p-4 flex-grow bg-gray-100 overflow-y-auto">
          {showDashboard && (
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
              {/* Add your dashboard content here */}
            </div>
          )}
          {showContacts && (
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h2 className="text-2xl font-bold mb-4">All Contacts</h2>
              <TableContainer component={Paper} className="max-h-96 overflow-y-auto">
                <InfiniteScroll
                  dataLength={contacts.length}
                  next={fetchMoreContacts}
                  hasMore={hasMore}
                  loader={<h4>Loading...</h4>}
                  scrollableTarget="scrollableDiv"
                >
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Avatar</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {contacts.map((contact) => (
                        <TableRow key={contact._id}>
                          <TableCell>{contact.id}</TableCell>
                          <TableCell>{contact.FirstName}</TableCell>
                          <TableCell>{contact.LastName}</TableCell>
                          <TableCell>{contact.Email}</TableCell>
                          <TableCell>{contact.Phone}</TableCell>
                          <TableCell>
                            {contact.avatar && (
                              <Avatar
                                src={contact.avatar}
                                alt="Avatar"
                                style={{ width: 100, height: 100 }}
                              />
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => handleEdit(contact)}
                              className="mr-2"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => handleDelete(contact._id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </InfiniteScroll>
              </TableContainer>
            </div>
          )}
          {showSearch && <SearchContacts />}
        </div>
      </div>
      <BottomBar />
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-96">
            <h2 className="text-2xl font-bold mb-4">
              {editContactId ? 'Edit Contact' : 'New Contact'}
            </h2>
            <form onSubmit={editContactId ? handleEditSubmit : handleSubmit}>
              <div className="flex justify-center mb-4">
                {formData.avatar && (
                  <Avatar
                    src={formData.avatar}
                    alt="Avatar"
                    style={{ width: 100, height: 100 }}
                  />
                )}
              </div>
              <div className="mb-4">
                <TextField
                  label="ID"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.id}
                  helperText={errors.id}
                  inputProps={{ maxLength: 10 }}
                />
              </div>
              <div className="mb-4">
                <TextField
                  label="First Name"
                  name="FirstName"
                  value={formData.FirstName}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.FirstName}
                  helperText={errors.FirstName}
                  inputProps={{ maxLength: 50 }}
                />
              </div>
              <div className="mb-4">
                <TextField
                  label="Last Name"
                  name="LastName"
                  value={formData.LastName}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.LastName}
                  helperText={errors.LastName}
                  inputProps={{ maxLength: 50 }}
                />
              </div>
              <div className="mb-4">
                <TextField
                  label="Email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.Email}
                  helperText={errors.Email}
                />
              </div>
              <div className="mb-4">
                <TextField
                  label="Phone"
                  name="Phone"
                  value={formData.Phone}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.Phone}
                  helperText={errors.Phone}
                  inputProps={{ maxLength: 10 }}
                />
              </div>
              <div className="mb-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="avatar-upload"
                />
                <label htmlFor="avatar-upload" className="cursor-pointer text-blue-500 underline">
                  Upload Avatar
                </label>
              </div>
              <div className="flex justify-between">
                <Button variant="contained" color="primary" type="submit">
                  {editContactId ? 'Save Changes' : 'Add Contact'}
                </Button>
                <Button variant="contained" color="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
              {message && (
                <p className="mt-4 text-red-500">
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <HashLoader color="#6B46C1" loading={loading} size={50} />
        </div>
      )}
    </div>
  );
};

export default OutlookClone;