import {ToggleButton, ToggleButtonGroup} from '@mui/material';
import {useNavigate} from '@remix-run/react';
import {useState} from 'react';

export default function LanguageToggler() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const handleChange = (event: React.MouseEvent<HTMLElement>, newLanguage: string) => {
    if (newLanguage != null) {
      setLanguage(newLanguage);
      navigate(`?lng=${newLanguage}`, {replace: true});
    }
  };
  return (
    <>
      <ToggleButtonGroup
        color="primary"
        value={language}
        exclusive
        onChange={handleChange}
        aria-label="Language"
        size="small">
        <ToggleButton value="en">EN</ToggleButton>
        <ToggleButton value="es">ES</ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}
