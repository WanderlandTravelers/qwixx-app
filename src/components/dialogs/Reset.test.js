import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResetDialog from './Reset';
import { ThemeProvider } from '@mui/material/styles';
import Theme from '../../Theme';

const renderWithTheme = (ui) => {
    return render(<ThemeProvider theme={Theme}>{ui}</ThemeProvider>);
};

describe('ResetDialog', () => {
    const mockOnClose = jest.fn();
    const mockOnReset = jest.fn();

    const defaultProps = {
        open: true,
        onClose: mockOnClose,
        onReset: mockOnReset,
    };

    beforeEach(() => {
        mockOnClose.mockClear();
        mockOnReset.mockClear();
    });

    test('renders ResetDialog when open', () => {
        renderWithTheme(<ResetDialog {...defaultProps} />);
        expect(screen.getByText('Reset')).toBeInTheDocument();
    });

    test('does not render when closed', () => {
        renderWithTheme(<ResetDialog {...defaultProps} open={false} />);
        expect(screen.queryByText('Reset')).not.toBeInTheDocument();
    });

    test('displays confirmation message', () => {
        renderWithTheme(<ResetDialog {...defaultProps} />);
        expect(screen.getByText(/Are you sure you want to reset the card\?/i)).toBeInTheDocument();
    });

    test('calls onClose when No button is clicked', () => {
        renderWithTheme(<ResetDialog {...defaultProps} />);
        const noButton = screen.getByText('No');
        fireEvent.click(noButton);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test('calls onReset when Yes button is clicked', () => {
        renderWithTheme(<ResetDialog {...defaultProps} />);
        const yesButton = screen.getByText('Yes!');
        fireEvent.click(yesButton);
        expect(mockOnReset).toHaveBeenCalledTimes(1);
    });

    test('renders both buttons', () => {
        renderWithTheme(<ResetDialog {...defaultProps} />);
        expect(screen.getByText('No')).toBeInTheDocument();
        expect(screen.getByText('Yes!')).toBeInTheDocument();
    });
});
