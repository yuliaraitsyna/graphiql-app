import {Button} from '@mui/material';
import {useTranslation} from 'react-i18next';
import styles from './SendRequestButton.module.css';

interface SendRequestButtonProps {
  handleRequest: React.MouseEventHandler<HTMLButtonElement>;
  isDisabled: boolean;
}

export const SendRequestButton: React.FC<SendRequestButtonProps> = ({handleRequest, isDisabled}) => {
  const {t} = useTranslation();
  return (
    <div className={styles.sendRequestBtnWrap}>
      <Button variant="contained" onClick={handleRequest} disabled={isDisabled}>
        {t('page.graphiql.sendButton')}
      </Button>
    </div>
  );
};
