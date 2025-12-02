import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PortraitMode from './PortraitMode';

test('renders portrait mode message', () => {
  render(<PortraitMode />);
  const linkElement = screen.getByText(/Please Rotate Your Device/i);
  expect(linkElement).toBeInTheDocument();
});
