import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OutlookClone from './OutlookClone';

describe('OutlookClone Component', () => {
  test('renders the Dashboard by default', () => {
    render(<OutlookClone />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  test('opens New Contact form when New Contact button is clicked', () => {
    render(<OutlookClone />);
    fireEvent.click(screen.getByText('New Contact'));
    expect(screen.getByText('New Contact')).toBeInTheDocument();
  });

  test('displays validation error for invalid email', () => {
    render(<OutlookClone />);
    fireEvent.click(screen.getByText('New Contact'));
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalid-email' } });
    fireEvent.submit(screen.getByText('Save Contact'));
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
  });
});
