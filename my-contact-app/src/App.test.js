import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import OutlookClone from './OutlookClone';

describe('OutlookClone Component', () => {
  test('toggles New Contact pop-up', async () => {
    render(<OutlookClone />);

    // Click on "New Contact" button to open the pop-up
    fireEvent.click(screen.getByText('New Contact'));
    console.log("Clicked on New Contact button");

    // Wait for the pop-up to appear
    await waitFor(() => {
      screen.debug(); // Output the current DOM structure for debugging
      const newContactPopUp = screen.getByText('New Contact'); // Adjust text as needed
      expect(newContactPopUp).toBeInTheDocument();
    }, { timeout: 3000 });

    // Click on the close button (assuming there's a button with text 'Close' to close the pop-up)
    fireEvent.click(screen.getByText('Close')); // Adjust text as needed
    console.log("Clicked on Close button");

    // Wait for the pop-up to disappear
    await waitFor(() => {
      screen.debug(); // Output the current DOM structure for debugging
      expect(screen.queryByText('New Contact')).not.toBeInTheDocument(); // Adjust text as needed
    });
  });
});
