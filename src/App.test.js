import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

  describe('6-7 Rule', () => {
    beforeEach(() => {
      mockMatchMedia(false); // Ensure landscape mode for these tests
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('should not auto-check 8 if the 6-7 rule is disabled', () => {
      renderWithTheme(<App />);
      // First, disable the rule
      fireEvent.click(screen.getByTestId('SettingsIcon')); // Assuming you add a test-id to your settings icon
      fireEvent.click(screen.getByLabelText(/Enable "6-7" Rule/i));
      fireEvent.click(screen.getByText(/Close/i));

      // Click 6 and 7 in the red row
      fireEvent.click(screen.getByTestId('red-4')); // 6
      fireEvent.click(screen.getByTestId('red-5')); // 7

      // The 8 should not be checked
      expect(screen.getByTestId('red-6')).not.toBeChecked();
    });

    test('should auto-check 8 when 6 and 7 are clicked consecutively', () => {
      renderWithTheme(<App />);
      // Ensure the rule is enabled by default

      // Click 6 and 7 in the red row
      fireEvent.click(screen.getByTestId('red-4')); // 6
      jest.advanceTimersByTime(500); // less than 2 seconds
      fireEvent.click(screen.getByTestId('red-5')); // 7

      // The 8 should be checked
      expect(screen.getByTestId('red-6')).toBeChecked();
    });

    test('should show the meme when the 6-7 rule is triggered', async () => {
      renderWithTheme(<App />);

      fireEvent.click(screen.getByTestId('red-4')); // 6
      jest.advanceTimersByTime(500);
      fireEvent.click(screen.getByTestId('red-5')); // 7

      expect(await screen.findByRole('img', { name: /6-7 Meme/i })).toBeInTheDocument();
    });

    test('should auto-check 8 in descending rows (green)', () => {
      renderWithTheme(<App />);

      fireEvent.click(screen.getByTestId('green-6')); // 7
      jest.advanceTimersByTime(500);
      fireEvent.click(screen.getByTestId('green-5')); // 6

      expect(screen.getByTestId('green-4')).toBeChecked();
    });

    test('should not trigger the rule if clicks are too far apart', () => {
      renderWithTheme(<App />);

      fireEvent.click(screen.getByTestId('red-4')); // 6
      jest.advanceTimersByTime(2500); // More than 2 seconds
      fireEvent.click(screen.getByTestId('red-5')); // 7

      expect(screen.getByTestId('red-6')).not.toBeChecked();
    });

    test('should not re-check 8 if it is already checked', () => {
      renderWithTheme(<App />);

      // First, manually check the 8
      fireEvent.click(screen.getByTestId('red-6'));
      expect(screen.getByTestId('red-6')).toBeChecked();

      // Now, trigger the rule
      fireEvent.click(screen.getByTestId('red-4')); // 6
      jest.advanceTimersByTime(500);
      fireEvent.click(screen.getByTestId('red-5')); // 7

      // The 8 should remain checked, and no errors should occur.
      // We can't directly test for "no error," but if the test passes, we're good.
      expect(screen.getByTestId('red-6')).toBeChecked();
    });
  });
});
