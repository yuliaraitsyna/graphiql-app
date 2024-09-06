import {Button} from '@mui/material';
import {useTranslation} from 'react-i18next';
import styles from './SendRequestButton.module.css';

interface SendRequestButtonProps {
  handleRequest: React.MouseEventHandler<HTMLButtonElement>;
}

export const SendRequestButton: React.FC<SendRequestButtonProps> = ({handleRequest}) => {
  const {t} = useTranslation();
  return (
    <div className={styles.sendRequestBtnWrap}>
      <Button variant="contained" onClick={handleRequest}>
        {t('page.graphiql.sendButton')}
      </Button>
    </div>
  );
};
