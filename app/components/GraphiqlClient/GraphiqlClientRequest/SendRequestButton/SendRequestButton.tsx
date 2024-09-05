import {Button} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {GraphqlRequestState} from '../../models';
import styles from './SendRequestButton.module.css';

interface SendRequestButtonProps {
  url: GraphqlRequestState;
}

export const SendRequestButton: React.FC<SendRequestButtonProps> = ({url}) => {
  const {t} = useTranslation();
  const sendGraphqlRequest = () => {
    console.log(url);
  };
  return (
    <div className={styles.sendRequestBtnWrap}>
      <Button variant="contained" onClick={sendGraphqlRequest}>
        {t('page.graphiql.sendButton')}
      </Button>
    </div>
  );
};
