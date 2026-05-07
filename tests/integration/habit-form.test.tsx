import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HabitForm from '../../src/components/habits/HabitForm';

describe('Habit Form Integration', () => {
  it('should call onSubmit with valid data', () => {
    const handleSubmit = vi.fn();
    render(<HabitForm onSubmit={handleSubmit} onCancel={() => {}} />);

    fireEvent.change(screen.getByTestId('habit-name-input'), { target: { value: 'New Habit' } });
    fireEvent.change(screen.getByTestId('habit-description-input'), { target: { value: 'Description' } });
    
    fireEvent.click(screen.getByTestId('habit-submit-button'));

    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'New Habit',
      description: 'Description',
    });
  });

  it('should show error for invalid habit name', async () => {
    const handleSubmit = vi.fn();
    render(<HabitForm onSubmit={handleSubmit} onCancel={() => {}} />);

    // Empty name
    fireEvent.click(screen.getByTestId('habit-submit-button'));

    expect(await screen.findByText(/habit name is required/i)).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
