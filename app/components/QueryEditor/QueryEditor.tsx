import CodeMirror, {ReactCodeMirrorRef} from '@uiw/react-codemirror';
import {useTranslation} from 'react-i18next';
import {Box, Button, Typography} from '@mui/material';
import {formatting} from './utils/formattingJson';
import styles from './QueryEditor.module.css';
import {useRef} from 'react';
import {GraphQLSchema} from 'graphql';
import {styleOverrides, basicSetup, myTheme} from './QueryEditorSettings';

interface QueryEditorProps {
  schema: GraphQLSchema;
  value: string;
  onChange: (value: string) => void;
}

export const QueryEditor: React.FC<QueryEditorProps> = ({value, onChange}) => {
  const {t} = useTranslation();
  const queryRef = useRef<ReactCodeMirrorRef | null>(null);

  const handleChange = (value: string) => {
    onChange(value);
  };

  const handleFormatQuery = () => {
    onChange(formatting(value));
  };

  const extensionsArray = [styleOverrides];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{marginBottom: 1}}>
        <Typography component={'h6'} variant="h6">
          {t('page.graphiql.queryEditor')}
        </Typography>
        <Button size="small" onClick={handleFormatQuery}>
          {t('page.graphiql.format')}
        </Button>
      </Box>
      <CodeMirror
        ref={queryRef}
        className={styles.queryEditor}
        height="200px"
        theme={myTheme}
        value={value}
        onChange={handleChange}
        extensions={extensionsArray}
        basicSetup={basicSetup}
      />
    </Box>
  );
};
