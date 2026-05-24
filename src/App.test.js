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
      configurable: true,
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

  beforeEach(() => {
    // Default to landscape
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 600 });
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 800 });
  });

  test('renders PortraitMode component in portrait orientation', async () => {
    mockMatchMedia(true);
    Object.defineProperty(window, 'innerHeight', { value: 800 });
    Object.defineProperty(window, 'innerWidth', { value: 600 });

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
    Object.defineProperty(window, 'innerHeight', { writable: true, value: 800 });
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 600 });

    renderWithTheme(<App />);

    // After the component mounts, simulate the browser correcting itself
    isPortrait = false;
    window.innerHeight = 600;
    window.innerWidth = 800;

    // With the setTimeout fix, the component should re-check and re-render.
    // We need to wait for this to happen.
    await waitFor(() => {
      expect(screen.queryByText(/Please Rotate Your Device/i)).not.toBeInTheDocument();
    });
  });

  test('updates orientation when orientationchange event is fired', async () => {
    let isPortrait = true;
    mockMatchMedia(() => isPortrait);
    Object.defineProperty(window, 'innerHeight', { writable: true, value: 800 });
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 600 });

    renderWithTheme(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Please Rotate Your Device/i)).toBeInTheDocument();
    });

    isPortrait = false;
    window.innerHeight = 600;
    window.innerWidth = 800;

    window.dispatchEvent(new Event('orientationchange'));

    await waitFor(() => {
      expect(screen.queryByText(/Please Rotate Your Device/i)).not.toBeInTheDocument();
    });
  });
});
