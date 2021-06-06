import React, { useState } from 'react';
import styles from './Editor.module.css';
import { Controlled as CodeMirror } from 'react-codemirror2';
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/css/css');


export default function Editor({ mode, onCodeUpdate }) {

  const [code, setCode] = useState('');

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        {mode === 'xml' ? 'html' : mode}
      </div>
      <CodeMirror
        className={styles.editor}
        value={code}
        options={
          {
            mode,
            theme: "material",
            lineNumbers: true,
          }
        }
        onBeforeChange={(editor, data, value) => {
          setCode(value);
        }}
        onChange={(editor, data, value) => {
          const timeout = setTimeout(() => {
            onCodeUpdate(value, mode);
          }, 2000);
          return () => clearTimeout(timeout);
        }}
      />
    </div>
  )
}
