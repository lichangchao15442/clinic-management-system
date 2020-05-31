import React from 'react'

import styles from './index.less'

interface GlobalHeaderProps {
  title: string; // 当前选中的菜单项名称
}

const GlobalHeader: React.FC<GlobalHeaderProps> = ({ title }) => {
  return <div className={styles.header}>
    <span className={styles.title}>{title}</span>
  </div>
}

export default GlobalHeader