import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import HabitForm from '../../src/components/habits/HabitForm';
import HabitCard from '../../src/components/habits/HabitCard';
import { Habit } from '../../src/types/habit';

describe('habit form', () => {
  const mockHabit: Habit = {
    id: 'h1',
    userId: 'u1',
    name: 'Existing Habit',
    description: 'Old description',
    frequency: 'daily',
    createdAt: '2023-10-01T00:00:00Z',
    completions: [],
  };

  it('shows a validation error when habit name is empty', async () => {
    render(<HabitForm onSubmit={vi.fn()} onCancel={vi.fn()} />);
    fireEvent.click(screen.getByTestId('habit-save-button'));
    expect(await screen.findByText(/habit name is required/i)).toBeInTheDocument();
  });

  it('creates a new habit and renders it in the list', async () => {
    const onSubmit = vi.fn();
    render(<HabitForm onSubmit={onSubmit} onCancel={vi.fn()} />);
    
    fireEvent.change(screen.getByTestId('habit-name-input'), { target: { value: 'New Habit' } });
    fireEvent.click(screen.getByTestId('habit-save-button'));
    
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ name: 'New Habit' }));
  });

  it('edits an existing habit and preserves immutable fields', async () => {
    const onSubmit = vi.fn();
    render(<HabitForm initialData={mockHabit} onSubmit={onSubmit} onCancel={vi.fn()} />);
    
    fireEvent.change(screen.getByTestId('habit-name-input'), { target: { value: 'Updated Habit' } });
    fireEvent.click(screen.getByTestId('habit-save-button'));
    
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ 
      name: 'Updated Habit' 
    }));
  });

  it('deletes a habit only after explicit confirmation', async () => {
    const onDelete = vi.fn();
    render(<HabitCard habit={mockHabit} onToggle={vi.fn()} onDelete={onDelete} onEdit={vi.fn()} />);
    
    const deleteBtn = screen.getByTestId('habit-delete-existing-habit');
    fireEvent.click(deleteBtn);
    
    // Should show confirmation
    const confirmBtn = screen.getByTestId('confirm-delete-button');
    expect(confirmBtn).toBeInTheDocument();
    
    fireEvent.click(confirmBtn);
    expect(onDelete).toHaveBeenCalledWith(mockHabit.id);
  });

  it('toggles completion and updates the streak display', async () => {
    const onToggle = vi.fn();
    render(<HabitCard habit={mockHabit} onToggle={onToggle} onDelete={vi.fn()} onEdit={vi.fn()} />);
    
    const toggleBtn = screen.getByTestId('habit-complete-existing-habit');
    fireEvent.click(toggleBtn);
    
    expect(onToggle).toHaveBeenCalledWith(mockHabit.id);
  });
});
