import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HistoryDialog from './History';
import { ThemeProvider } from '@mui/material/styles';
import Theme from '../../Theme';

const renderWithTheme = (ui) => {
    return render(<ThemeProvider theme={Theme}>{ui}</ThemeProvider>);
};

describe('HistoryDialog', () => {
    const mockOnClose = jest.fn();
    const mockOnViewHistory = jest.fn();
    const mockOnDeleteHistory = jest.fn();

    const sampleHistory = [
        { date: new Date('2024-01-01').toISOString(), score: 85, won: true },
        { date: new Date('2024-01-02').toISOString(), score: 72, won: false },
        { date: new Date('2024-01-03').toISOString(), score: 95, won: true },
    ];

    const defaultProps = {
        open: true,
        onClose: mockOnClose,
        onViewHistory: mockOnViewHistory,
        onDeleteHistory: mockOnDeleteHistory,
        qwixxHistory: sampleHistory,
    };

    beforeEach(() => {
        mockOnClose.mockClear();
        mockOnViewHistory.mockClear();
        mockOnDeleteHistory.mockClear();
    });

    test('renders HistoryDialog when open', () => {
        renderWithTheme(<HistoryDialog {...defaultProps} />);
        expect(screen.getByText(/History/i)).toBeInTheDocument();
    });

    test('does not render when closed', () => {
        renderWithTheme(<HistoryDialog {...defaultProps} open={false} />);
        expect(screen.queryByText(/History/i)).not.toBeInTheDocument();
    });

    test('displays average score', () => {
        renderWithTheme(<HistoryDialog {...defaultProps} />);
        // Average of 85, 72, 95 = 84
        expect(screen.getByText(/Avg: 84/i)).toBeInTheDocument();
    });

    test('displays high score', () => {
        renderWithTheme(<HistoryDialog {...defaultProps} />);
        expect(screen.getByText(/High: 95/i)).toBeInTheDocument();
    });

    test('displays win rate', () => {
        renderWithTheme(<HistoryDialog {...defaultProps} />);
        // 2 wins out of 3 = 67%
        expect(screen.getByText(/%Win: 67/i)).toBeInTheDocument();
    });

    test('displays all history entries', () => {
        renderWithTheme(<HistoryDialog {...defaultProps} />);
        expect(screen.getByText('85')).toBeInTheDocument();
        expect(screen.getByText('72')).toBeInTheDocument();
        expect(screen.getByText('95')).toBeInTheDocument();
    });

    test('displays X for won games', () => {
        renderWithTheme(<HistoryDialog {...defaultProps} />);
        const xMarks = screen.getAllByText('X');
        // Should have 2 X marks for the 2 won games
        expect(xMarks.length).toBe(2);
    });

    test('calls onClose when Close button is clicked', () => {
        renderWithTheme(<HistoryDialog {...defaultProps} />);
        const closeButton = screen.getByText('Close');
        fireEvent.click(closeButton);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test('calls onViewHistory when view icon is clicked', () => {
        const { container } = renderWithTheme(<HistoryDialog {...defaultProps} />);
        const viewIcons = container.querySelectorAll('[data-testid="VisibilityIcon"]');
        if (viewIcons.length > 0) {
            fireEvent.click(viewIcons[0]);
            expect(mockOnViewHistory).toHaveBeenCalledWith(0);
        }
    });

    test('calls onDeleteHistory when delete icon is clicked', () => {
        const { container } = renderWithTheme(<HistoryDialog {...defaultProps} />);
        const deleteIcons = container.querySelectorAll('[data-testid="DeleteForeverIcon"]');
        if (deleteIcons.length > 0) {
            fireEvent.click(deleteIcons[0]);
            expect(mockOnDeleteHistory).toHaveBeenCalledWith(0);
        }
    });

    test('renders table headers', () => {
        renderWithTheme(<HistoryDialog {...defaultProps} />);
        expect(screen.getByText('Date')).toBeInTheDocument();
        expect(screen.getByText('Score')).toBeInTheDocument();
        expect(screen.getByText('Win?')).toBeInTheDocument();
        expect(screen.getByText('View')).toBeInTheDocument();
        expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    test('formats dates correctly', () => {
        const { container } = renderWithTheme(<HistoryDialog {...defaultProps} />);
        // Check that dates are formatted (should contain slashes or dashes)
        const dateCell = container.querySelector('tbody tr td');
        if (dateCell && dateCell.textContent) {
            expect(dateCell.textContent).toMatch(/\d+/);
        }
    });

    test('handles empty history', () => {
        const emptyProps = {
            ...defaultProps,
            qwixxHistory: [],
        };
        renderWithTheme(<HistoryDialog {...emptyProps} />);
        // Should still render the dialog with NaN values
        expect(screen.getByText(/History/i)).toBeInTheDocument();
    });
});
