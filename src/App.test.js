import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
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
        get matches() {
          if (typeof matches === 'function') {
            return matches();
          }
          return matches;
        },
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

  test('renders PortraitMode component in portrait orientation', async () => {
    mockMatchMedia(true);
    renderWithTheme(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Please Rotate Your Device/i)).toBeInTheDocument();
    });
  });

  test('renders the game in landscape orientation', () => {
    mockMatchMedia(false);
    renderWithTheme(<App />);
    expect(screen.queryByText(/Please Rotate Your Device/i)).not.toBeInTheDocument();
  });

  test('does not render PortraitMode on initial load if orientation corrects itself', async () => {
    let isPortrait = true;
    mockMatchMedia(() => isPortrait);

    renderWithTheme(<App />);

    // After the component mounts, simulate the browser correcting itself
    isPortrait = false;

    // With the setTimeout fix, the component should re-check and re-render.
    // We need to wait for this to happen.
    await waitFor(() => {
      expect(screen.queryByText(/Please Rotate Your Device/i)).not.toBeInTheDocument();
    });
  });
});
