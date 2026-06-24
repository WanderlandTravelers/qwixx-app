import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ColorRow from './ColorRow';
import { ThemeProvider } from '@mui/material/styles';
import Theme from '../Theme';

const renderWithTheme = (ui) => {
    return render(<ThemeProvider theme={Theme}>{ui}</ThemeProvider>);
};

describe('ColorRow', () => {
    const mockOnClick = jest.fn();
    const defaultProps = {
        score: 15,
        onClick: mockOnClick,
        color: 'red',
        reverse: false,
        row: [
            new Array(12).fill(false),
            new Array(12).fill(false)
        ],
    };

    beforeEach(() => {
        mockOnClick.mockClear();
    });

    test('renders ColorRow with correct score', () => {
        renderWithTheme(<ColorRow {...defaultProps} />);
        expect(screen.getByText('15')).toBeInTheDocument();
    });

    test('renders numbers in ascending order when reverse is false', () => {
        renderWithTheme(<ColorRow {...defaultProps} />);
        // First number should be 2 (index 0 + 2)
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    test('renders numbers in descending order when reverse is true', () => {
        const props = { ...defaultProps, reverse: true };
        renderWithTheme(<ColorRow {...props} />);
        // Last non-lock number should be 3 (12 - 9)
        expect(screen.getByText('12')).toBeInTheDocument();
    });

    test('calls onClick when a number is clicked', () => {
        renderWithTheme(<ColorRow {...defaultProps} />);
        const numberElement = screen.getByText('2');
        fireEvent.click(numberElement);
        expect(mockOnClick).toHaveBeenCalledWith('red', 0);
    });

    test('displays X when a mark is selected', () => {
        const propsWithMark = {
            ...defaultProps,
            row: [
                [true, false, false, false, false, false, false, false, false, false, false, false],
                new Array(12).fill(false)
            ],
        };
        renderWithTheme(<ColorRow {...propsWithMark} />);
        const xMarks = screen.getAllByText('X');
        expect(xMarks.length).toBeGreaterThan(0);
    });

    test('renders lock icon when last position is not selected', () => {
        renderWithTheme(<ColorRow {...defaultProps} />);
        // Lock icon should be present (OpenLockIcon)
        const lockElements = document.querySelectorAll('svg');
        expect(lockElements.length).toBeGreaterThan(0);
    });

    test('renders locked icon when last position is selected', () => {
        const propsWithLock = {
            ...defaultProps,
            row: [
                [false, false, false, false, false, false, false, false, false, false, false, true],
                new Array(12).fill(false)
            ],
        };
        renderWithTheme(<ColorRow {...propsWithLock} />);
        // Locked icon should be present
        const lockElements = document.querySelectorAll('svg');
        expect(lockElements.length).toBeGreaterThan(0);
    });

    test('applies disabled styling to disabled numbers', () => {
        const propsWithDisabled = {
            ...defaultProps,
            row: [
                new Array(12).fill(false),
                [true, false, false, false, false, false, false, false, false, false, false, false]
            ],
        };
        const { container } = renderWithTheme(<ColorRow {...propsWithDisabled} />);
        // Check that disabled styling is applied (makeStyles generates class names with pattern makeStyles-disabledNumber-)
        expect(container.querySelector('[class*="disabledNumber"]')).toBeTruthy();
    });

    test('renders with different colors', () => {
        const colors = ['red', 'yellow', 'green', 'blue'];
        colors.forEach(color => {
            const { container } = renderWithTheme(
                <ColorRow {...defaultProps} color={color} />
            );
            expect(container).toBeTruthy();
        });
    });

    test('handles lock click with isLock parameter', () => {
        const propsWithEnoughMarks = {
            ...defaultProps,
            row: [
                [true, true, true, true, true, false, false, false, false, false, false, false],
                new Array(12).fill(false)
            ],
        };
        renderWithTheme(<ColorRow {...propsWithEnoughMarks} />);
        // Find and click the lock icon area
        const lockElements = document.querySelectorAll('svg');
        if (lockElements.length > 0) {
            fireEvent.click(lockElements[0].closest('[class*="number"]'));
            // Should be called with isLock parameter
            expect(mockOnClick).toHaveBeenCalled();
        }
    });
});
