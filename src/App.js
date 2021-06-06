import { useState, useEffect } from 'react';
import './App.css';
import Editor from './components/Editor/Editor';
import Output from './components/Output/Output';

function App() {

  let [htmlTemplate, setHtmlTemplate] = useState('');
  let [css, setCss] = useState('');
  let [jsCode, setJsCode] = useState('');

  let srcDoc = `
      <html>
      <body>${htmlTemplate}</body>
      <style>${css}</style>
      <script>${jsCode}</script>
      </html>
    `;

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //   }, 1000);
  //   return () => clearTimeout(timeout);
  // }, [htmlTemplate, css, jsCode]);

  function setCodeTemplate(code, mode) {
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
        console.log('unknown language specified');
    }
  }

  return (
    <div className="App">
      <div className="pane top-pane">
        <Editor mode="xml" onCodeUpdate={setCodeTemplate} />
        <Editor mode="css" onCodeUpdate={setCodeTemplate} />
        <Editor mode="javascript" onCodeUpdate={setCodeTemplate} />
      </div>
      <div className="bottom-pane">
        <Output srcDoc={srcDoc} />
      </div>
    </div>
  );
}

export default App;
