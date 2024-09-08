import '@testing-library/jest-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import HeadersEditor from '~/components/HeadersEditor/HeadersEditor';

describe('HeadersEditor tests', () => {
  beforeAll(() => {
    localStorage.clear();
  });

  it('should render component', () => {
    render(<HeadersEditor />);

    expect(screen.getByText('Headers')).toBeInTheDocument();
    expect(screen.getByText('Key')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it("should add a header when clicking the 'Add' button", () => {
    render(<HeadersEditor />);

    const addButton = screen.getByText('Add');
    fireEvent.click(addButton);

    let textboxes = screen.getAllByRole('textbox');
    expect(textboxes.length).toBe(2);

    fireEvent.click(addButton);
    textboxes = screen.getAllByRole('textbox');
    expect(textboxes.length).toBe(4);
  });

  it("should allow editing a header when clicking the 'Edit' button", () => {
    render(<HeadersEditor />);

    const addButton = screen.getByText('Add');
    fireEvent.click(addButton);

    const keyInput = screen.getAllByRole('textbox')[0] as HTMLInputElement;
    expect(keyInput).toBeDisabled();

    const editButton = screen.getAllByRole('button', {name: /edit/i})[0];
    fireEvent.click(editButton);

    expect(keyInput).not.toBeDisabled();

    fireEvent.change(keyInput, {target: {value: 'Authorization'}});
    expect(keyInput.value).toBe('Authorization');

    fireEvent.keyDown(keyInput, {key: 'Enter', code: 'Enter'});
    expect(keyInput).toBeDisabled();
  });

  it("should allow deleting a header when clicking the 'Delete' button", () => {
    render(<HeadersEditor />);

    const addButton = screen.getByText('Add');
    fireEvent.click(addButton);

    let rows = screen.getAllByRole('row');
    expect(rows.length).toBe(5);

    const deleteButton = screen.getAllByRole('button', {name: /delete/i})[0];
    fireEvent.click(deleteButton);

    rows = screen.getAllByRole('row');
    expect(rows.length).toBe(4);
  });

  it('should toggle the checkbox state when clicking it', () => {
    render(<HeadersEditor />);

    const addButton = screen.getByText('Add');
    fireEvent.click(addButton);

    const checkbox = screen.getAllByRole('checkbox')[0] as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });
});
