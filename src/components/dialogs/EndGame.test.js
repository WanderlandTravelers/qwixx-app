import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EndGameDialog from './EndGame';
import { ThemeProvider } from '@mui/material/styles';
import Theme from '../../Theme';

const renderWithTheme = (ui) => {
    return render(<ThemeProvider theme={Theme}>{ui}</ThemeProvider>);
};

describe('EndGameDialog', () => {
    const mockOnClose = jest.fn();
    const mockOnLoss = jest.fn();
    const mockOnWin = jest.fn();

    const defaultProps = {
        open: true,
        onClose: mockOnClose,
        onLoss: mockOnLoss,
        onWin: mockOnWin,
        score: 85,
    };

    beforeEach(() => {
        mockOnClose.mockClear();
        mockOnLoss.mockClear();
        mockOnWin.mockClear();
    });

    test('renders EndGameDialog when open', () => {
        renderWithTheme(<EndGameDialog {...defaultProps} />);
        expect(screen.getByText('Game Over')).toBeInTheDocument();
    });

    test('does not render when closed', () => {
        renderWithTheme(<EndGameDialog {...defaultProps} open={false} />);
        expect(screen.queryByText('Game Over')).not.toBeInTheDocument();
    });

    test('displays the score', () => {
        renderWithTheme(<EndGameDialog {...defaultProps} />);
        expect(screen.getByText(/Your score: 85/i)).toBeInTheDocument();
    });

    test('displays "Did you win?" question', () => {
        renderWithTheme(<EndGameDialog {...defaultProps} />);
        expect(screen.getByText(/Did you win\?/i)).toBeInTheDocument();
    });

    test('calls onClose when Close button is clicked', () => {
        renderWithTheme(<EndGameDialog {...defaultProps} />);
        const closeButton = screen.getByText('Close');
        fireEvent.click(closeButton);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test('calls onLoss when No button is clicked', () => {
        renderWithTheme(<EndGameDialog {...defaultProps} />);
        const noButton = screen.getByText('No');
        fireEvent.click(noButton);
        expect(mockOnLoss).toHaveBeenCalledTimes(1);
    });

    test('calls onWin when Yes button is clicked', () => {
        renderWithTheme(<EndGameDialog {...defaultProps} />);
        const yesButton = screen.getByText('Yes!');
        fireEvent.click(yesButton);
        expect(mockOnWin).toHaveBeenCalledTimes(1);
    });

    test('renders all three buttons', () => {
        renderWithTheme(<EndGameDialog {...defaultProps} />);
        expect(screen.getByText('Close')).toBeInTheDocument();
        expect(screen.getByText('No')).toBeInTheDocument();
        expect(screen.getByText('Yes!')).toBeInTheDocument();
    });
});
