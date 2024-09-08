import '@testing-library/jest-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import {MobileMenu} from '../components/MobileMenu';
import {useTranslation} from 'react-i18next';
import {pages} from '../constants';

jest.mock('@remix-run/react', () => ({
  Link: jest.fn(),
}));
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));
interface WhiteButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}
jest.mock('../components/UI/WhiteButton', () => {
  const MockedWhiteButton: React.FC<WhiteButtonProps> = ({children, onClick}) => {
    return <button onClick={onClick}>{children}</button>;
  };

  return MockedWhiteButton;
});

describe('Test MobileMenu component', () => {
  const mockClose = jest.fn();

  beforeEach(() => {
    mockClose.mockClear();

    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key,
    });
  });

  test('Check if renders the menu when open', () => {
    render(<MobileMenu anchorEl={document.createElement('div')} open={true} onClose={mockClose} />);

    expect(screen.getByText(pages.main.translationKey)).toBeInTheDocument();
    expect(screen.getByText(pages.signOut.translationKey)).toBeInTheDocument();
    expect(screen.getByText(pages.signIn.translationKey)).toBeInTheDocument();
    expect(screen.getByText(pages.signUp.translationKey)).toBeInTheDocument();
  });

  test('Check if does not render the menu when not open', () => {
    render(<MobileMenu anchorEl={null} open={false} onClose={mockClose} />);

    expect(screen.queryByText(pages.main.translationKey)).not.toBeInTheDocument();
    expect(screen.queryByText(pages.signOut.translationKey)).not.toBeInTheDocument();
  });

  test('Check if calls onClose when menu items are clicked', () => {
    render(<MobileMenu anchorEl={document.createElement('div')} open={true} onClose={mockClose} />);

    fireEvent.click(screen.getByText(pages.main.translationKey));
    expect(mockClose).toHaveBeenCalled();

    fireEvent.click(screen.getByText(pages.signOut.translationKey));
    expect(mockClose).toHaveBeenCalledTimes(2);

    fireEvent.click(screen.getByText(pages.signIn.translationKey));
    expect(mockClose).toHaveBeenCalledTimes(3);

    fireEvent.click(screen.getByText(pages.signUp.translationKey));
    expect(mockClose).toHaveBeenCalledTimes(4);
  });
});
