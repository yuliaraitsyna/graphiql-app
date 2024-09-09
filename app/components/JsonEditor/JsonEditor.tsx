/* eslint-disable import/no-unresolved */
import '@fontsource/roboto-mono';
import styles from './JsonEditor.module.css';
import {useEffect, useState} from 'react';
import {Box, Button, Typography} from '@mui/material';
import {EditIcon, VisibleIcon} from '../Icons';
import prettifyJson from '~/utils/prettifyJson';

type EditorProps = {
  mode: 'view' | 'edit';
  type: 'JSON' | 'text';
  defaultValue: string;
  onChange: (v: string) => void;
};

function StrNum({content}: {content: string}) {
  const numStr = Array.from({length: content.split('\n').length}, (_, k) => k + 1).join('\n');
  return <pre className={styles.numeration}>{numStr}</pre>;
}

export default function JsonEditor({mode = 'view', type = 'JSON', defaultValue = '', onChange}: Partial<EditorProps>) {
  const [content, setContent] = useState(type === 'JSON' ? prettifyJson(defaultValue) : defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    setContent(v);
    if (onChange) {
      onChange(v);
    }
  };

  useEffect(() => {
    setContent(prettifyJson(defaultValue));
  }, [defaultValue]);

  const formatJson = () => {
    const fC = prettifyJson(content);
    setContent(fC);
    if (onChange) {
      onChange(fC);
    }
  };

  return (
    <Box component="section" className={styles.editor}>
      <Box component="div" className={styles.marker}>
        {mode === 'view' ? (
          <VisibleIcon style={{width: '12px', height: '12px'}} />
        ) : (
          <EditIcon style={{width: '12px', height: '12px'}} />
        )}
      </Box>
      <Box component="div" className={styles.heading}>
        <Typography variant="subtitle1" component="p">
          {type === 'JSON' ? 'JSON ' : 'Text '} Content
        </Typography>
        {type === 'JSON' && (
          <Button size="small" onClick={formatJson}>
            Format
          </Button>
        )}
      </Box>
      <Box component="div" className={styles.wrapper}>
        {type === 'JSON' && <StrNum content={content} />}
        <Box>
          <Box component="div" className={styles.inputWrapper} data-replicated-value={content}>
            <textarea value={content} onChange={handleChange} disabled={mode === 'view'}></textarea>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
