import React from 'react'
import { Link } from 'umi'

import styles from './MenuHeader.less'

interface MenuHeaderProps {
  logoDom: any;
  titleDom: any
}

const MenuHeader: React.FC<MenuHeaderProps> = ({ logoDom, titleDom }) => {
  return (
    <Link to="/">
      <div className={styles.logo}>
        <img src={require("../../assets/logo.png")} alt="" />
      </div>
      {titleDom}
    </Link>
  )
}

export default MenuHeader