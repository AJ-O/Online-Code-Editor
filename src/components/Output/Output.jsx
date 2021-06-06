import React, { useState } from 'react'
import styles from './Output.module.css';

export default function Output({ srcDoc }) {

  return (
    <iframe
      title="Output"
      className={styles.output}
      srcDoc={srcDoc}
    >
    </iframe>
  )
}
