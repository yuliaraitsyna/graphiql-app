import {Button} from '@mui/material';
import {useTranslation} from 'react-i18next';

interface UrlProps {
  endpointUrl: string;
  body: string;
  headers: object;
}

interface SendRequestButtonProps {
  url: UrlProps;
}

export const SendRequestButton: React.FC<SendRequestButtonProps> = ({url}) => {
  const {t} = useTranslation();
  const sendGraphqlRequest = () => {
    console.log(url);
    //handle result and save to ls
  };
  return (
    <Button variant="contained" onClick={sendGraphqlRequest}>
      {t('page.graphiql.sendButton')}
    </Button>
  );
};
