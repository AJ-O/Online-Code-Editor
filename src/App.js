import { useState, useRef, useEffect } from 'react';
import './App.css';
import Editor from './components/Editor/Editor';
import Output from './components/Output/Output';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

function App() {

  let [htmlTemplate, setHtmlTemplate] = useState('');
  let [css, setCss] = useState('');
  let [jsCode, setJsCode] = useState('');
  const htmlRef = useRef();
  const cssRef = useRef();
  const jsRef = useRef();

  let srcDoc = `
      <html>
      <body>${htmlTemplate}</body>
      <style>${css}</style>
      <script>${jsCode}</script>
      </html>
    `;

  const setCodeTemplate = (code, mode) => {
    switch (mode) {
      case 'xml':
        setHtmlTemplate(code);
        break;

      case 'css':
        setCss(code);
        break;

      case 'javascript':
        setJsCode(code);
        break;

      default:
        console.log('Unknown language');
    }
  }

  const setCodeOnReload = () => {

    for (let i = 0; i < localStorage.length; i++) {
      setCodeTemplate(localStorage.getItem(localStorage.key(i)), localStorage.key(i));
    }
    htmlRef.current.setCodeOnReload(localStorage.getItem('xml'));
    cssRef.current.setCodeOnReload(localStorage.getItem('css'));
    jsRef.current.setCodeOnReload(localStorage.getItem('javascript'));

  }

  const resetCodeState = () => {
    setHtmlTemplate('');
    setCss('');
    setJsCode('');
  }

  const resetEditor = () => {
    htmlRef.current.resetCode();
    cssRef.current.resetCode();
    jsRef.current.resetCode();
  }

  const resetLocalStorage = () => {
    localStorage.removeItem('xml');
    localStorage.removeItem('css');
    localStorage.removeItem('javascript');
  }

  const clearAllCode = () => {
    resetCodeState();
    resetEditor();
    resetLocalStorage();
  }

  useEffect(() => {
    setCodeOnReload();
  }, []);

  return (
    <div className="App">
      <div className="header">
        <div>
          <h2 className="header-data">
            <FontAwesomeIcon className="icon" icon={faCode} />
            Code Editor
          </h2>
        </div>
        <div className="refresh">
          <FontAwesomeIcon
            className="icon"
            icon={faSyncAlt}
            onClick={clearAllCode}
          />
        </div>
      </div>
      <div className="pane top-pane">
        <Editor
          mode="xml"
          onCodeUpdate={setCodeTemplate}
          ref={htmlRef}
        />
        <Editor
          mode="css"
          onCodeUpdate={setCodeTemplate}
          ref={cssRef}
        />
        <Editor
          mode="javascript"
          onCodeUpdate={setCodeTemplate}
          ref={jsRef}
        />
      </div>
      <div className="bottom-pane">
        <Output srcDoc={srcDoc} />
      </div>
    </div>
  );
}

export default App;
