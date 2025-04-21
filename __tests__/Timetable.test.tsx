// __tests__/Timetable.test.tsx
jest.mock('react-to-print', () => ({
    useReactToPrint: () => jest.fn(),
}));

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Timetable from '../app/page'; // Adjust path as needed

describe('Timetable component', () => {
    it('renders title inputs', () => {
        render(<Timetable />);
        expect(screen.getByDisplayValue('Ders Programı')).toBeInTheDocument();
        expect(screen.getByDisplayValue('1. Grup Hz. Fatima Dershanesi')).toBeInTheDocument();
    });

    it('allows changing title text', () => {
        render(<Timetable />);
        const titleInput = screen.getByTestId('page-title');
        fireEvent.change(titleInput, { target: { value: 'Yeni Başlık' } });
        expect(titleInput).toHaveValue('Yeni Başlık');
    });

    it('adds a new row when "Satır Ekle" is clicked', () => {
        render(<Timetable />);
        const addButton = screen.getByTestId('add-row-btn');
        fireEvent.click(addButton);

        const rows = screen.getAllByTestId('row');
        expect(rows.length).toBeGreaterThan(1); // Starts with 1 row
    });

    it('lets you type a student name', () => {
        render(<Timetable />);
        const studentInput = screen.getAllByTestId('student-input')[0];
        fireEvent.change(studentInput, { target: { value: 'Husniye' } });
        expect(studentInput).toHaveValue('Husniye');
    });

    it('renders hour dropdowns with correct options', () => {
        render(<Timetable />);
        const options = screen.getAllByRole('option');
        const hasEarlyHour = options.some((opt) => opt.textContent === '07:00');
        expect(hasEarlyHour).toBe(true);
    });
});
