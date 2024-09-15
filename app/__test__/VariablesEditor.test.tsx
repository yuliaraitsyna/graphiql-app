import '@testing-library/jest-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import VariablesEditor from '~/components/VariablesEditor/VariablesEditor';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string | Record<number, {name: string}>> = {
        'editors.headersTitle': 'Headers',
        'editors.variablesTitle': 'Variables',
        'editors.keyTitle': 'Key',
        'editors.valueTitle': 'Value',
        'editors.nameTitle': 'Name',
        'editors.add': 'Add',
      };
      return translations[key] || key;
    },
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

describe('VariablesEditor tests', () => {
  beforeAll(() => {
    localStorage.clear();
  });

  it('should render component', () => {
    render(<VariablesEditor decodedVariables={[]} setStoredVariables={() => {}} />);

    expect(screen.getByText('Variables')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it("should add a variable when clicking the 'Add' button", () => {
    render(<VariablesEditor decodedVariables={[]} setStoredVariables={() => {}} />);

    const addButton = screen.getByText('Add');
    fireEvent.click(addButton);

    let textboxes = screen.getAllByRole('textbox');
    expect(textboxes.length).toBe(2);

    fireEvent.click(addButton);
    textboxes = screen.getAllByRole('textbox');
    expect(textboxes.length).toBe(4);
  });

  it("should allow editing a variable when clicking the 'Edit' button", () => {
    render(<VariablesEditor decodedVariables={[]} setStoredVariables={() => {}} />);

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

  it("should allow deleting a variable when clicking the 'Delete' button", () => {
    render(<VariablesEditor decodedVariables={[]} setStoredVariables={() => {}} />);

    const addButton = screen.getByText('Add');
    fireEvent.click(addButton);

    let rows = screen.getAllByRole('row');
    expect(rows.length).toBe(2);

    const deleteButton = screen.getAllByRole('button', {name: /delete/i})[0];
    fireEvent.click(deleteButton);

    rows = screen.getAllByRole('row');
    expect(rows.length).toBe(1);
  });

  it('should toggle the checkbox state when clicking it', () => {
    render(<VariablesEditor decodedVariables={[]} setStoredVariables={() => {}} />);

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
