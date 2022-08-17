import React from 'react';
import styles from './style.module.scss';

const Wrapper = (props) => {
	return <div className={styles.wrapper}>{props.children}</div>;
};

export default Wrapper;
