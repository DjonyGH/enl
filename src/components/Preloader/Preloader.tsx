import React from 'react';
import { Spinner } from '@ff/ui-kit';

import styles from './Preloader.module.scss';

const Preloader = () => (
  <div className={styles.container}>
    <Spinner size="large" className={styles.spinner} />
  </div>
);

export default Preloader;
