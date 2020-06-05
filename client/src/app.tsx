import React from 'react';

import { MenuHeader } from '@/components/GlobalSider';
import GlobalHeader from '@/components/GlobalHeader'
import configrRoutes from '@/../config/route.config'
import { findPathname } from './utils/utils'

export const layout = {
  menuHeaderRender: (logoDom: any, titleDom: any) => <MenuHeader logoDom={logoDom} titleDom={titleDom} />,
  logout: () => { },
  headerRender: ({ breadcrumb }: any) => {
    return <GlobalHeader title={findPathname(configrRoutes, location.pathname)} />
  }
};


export async function getInitialState() {
  const data = {};
  return data;
}
