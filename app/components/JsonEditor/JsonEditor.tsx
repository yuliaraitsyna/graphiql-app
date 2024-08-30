import '@fontsource/roboto-mono';
import css from './JsonEditor.module.css';
import {useState} from 'react';
import {Box, Button, Typography} from '@mui/material';
import {EditIcon, VisibleIcon} from '../Icons';
import prettifyJson from '~/utils/prettifyJson';

type Props = {
  mode?: 'view' | 'edit';
  type?: 'JSON' | 'text';
  defaultValue?: string;
  onChange?: (v: string) => void;
};

function StrNum({content}: {content: string}) {
  const numStr = Array.from({length: content.split('\n').length}, (_, k) => k + 1).join('\n');
  return <pre className={css.numeration}>{numStr}</pre>;
}

export default function JsonEditor({mode = 'view', type = 'JSON', defaultValue = '', onChange}: Props) {
  const [content, setContent] = useState(prettifyJson(defaultValue));

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    setContent(v);
    if (onChange) {
      onChange(v);
    }
  };

  const formatJson = () => {
    const fC = prettifyJson(content);
    setContent(fC);
    if (onChange) {
      onChange(fC);
    }
  };

  return (
    <Box component="section" className={css.editor}>
      <Box component="div" className={css.marker}>
        {mode === 'view' ? (
          <VisibleIcon style={{width: '12px', height: '12px'}} />
        ) : (
          <EditIcon style={{width: '12px', height: '12px'}} />
        )}
      </Box>
      <Box component="div" className={css.heading}>
        <Typography variant="subtitle1" component="p">
          {type === 'JSON' ? 'JSON ' : 'Text '} Content
        </Typography>
        {type === 'JSON' && (
          <Button size="small" onClick={formatJson}>
            Format
          </Button>
        )}
      </Box>
      <Box component="div" className={css.wrapper}>
        {type === 'JSON' && <StrNum content={content} />}
        <Box>
          <Box component="div" className={css['input-wrapper']} data-replicated-value={content}>
            <textarea value={content} onChange={handleChange} disabled={mode === 'view'}></textarea>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
