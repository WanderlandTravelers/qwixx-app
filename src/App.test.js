import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import Theme from './Theme';

const renderWithTheme = (ui) => {
  return render(<ThemeProvider theme={Theme}>{ui}</ThemeProvider>);
};

describe('App', () => {
  const mockMatchMedia = (matches) => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  };

  test('renders PortraitMode component in portrait orientation', () => {
    mockMatchMedia(true);
    renderWithTheme(<App />);
    expect(screen.getByText(/Please Rotate Your Device/i)).toBeInTheDocument();
  });

  test('renders the game in landscape orientation', () => {
    mockMatchMedia(false);
    renderWithTheme(<App />);
    expect(screen.queryByText(/Please Rotate Your Device/i)).not.toBeInTheDocument();
  });
});
