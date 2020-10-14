import React from 'react';

import styles from './index.less';

interface IconTitleProps {
  title: string;
};

const IconTitle: React.FC<IconTitleProps> = ({ title }) => {
  return <div className={styles.iconTitle}>
    <span></span>
    <span>{title}</span>
  </div>;
};

export default IconTitle;