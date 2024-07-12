import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import OutlookClone from './OutlookClone';

// Mock the fetch function
global.fetch = jest.fn();

describe('OutlookClone', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Set up a default mock for fetch
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    });
  });

  test('handleChange should update formData and validate field', async () => {
    render(<OutlookClone />);
    const newContactButton = screen.getByText('New Contact');
    fireEvent.click(newContactButton);
  
    const firstNameInput = screen.getByLabelText('First Name');
    fireEvent.change(firstNameInput, { target: { value: 'John123' } });
  
    await waitFor(() => {
      expect(firstNameInput).toHaveValue('John123');
      expect(screen.getByText('Please enter only alphabetic characters')).toBeInTheDocument();
    });
  });

});