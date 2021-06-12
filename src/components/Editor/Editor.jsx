import React, { useState, useImperativeHandle } from 'react';
import styles from './Editor.module.css';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons'
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { forwardRef } from 'react/cjs/react.production.min';
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/css/css');


const Editor = forwardRef(({ mode, onCodeUpdate }, ref) => {

  const [code, setCode] = useState('');
  const [isFullScreen, setisFullScreen] = useState(true);

  useImperativeHandle(
    ref,
    () => ({
      resetCode() {
        setCode('');
      },
      setCodeOnReload(code) {
        setCode(code);
      }
    }));

  const setCodeInLocalStorage = (mode, code) => {
    localStorage.setItem(mode, code);
  }

  return (
    <div className={isFullScreen ? styles.wrapper : 'wrapper-min'}>
      <div className={styles.header}>
        <div className={styles.heading}>
          {mode === 'xml' ? 'html' : mode}
        </div>
        <FontAwesomeIcon
          className={styles.icon}
          icon={isFullScreen ? faCompressAlt : faExpandAlt}
          onClick={() => {
            setisFullScreen(!isFullScreen);
          }}
          data-tool-tip="reset"
        />
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
            setCodeInLocalStorage(mode, code);

          }, 2000);
          return () => clearTimeout(timeout);
        }}
      />
    </div>
  )
});

export default Editor;
