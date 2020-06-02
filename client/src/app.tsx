import React from 'react';
import { MenuHeader } from '@/components/GlobalSider';
import GlobalHeader from '@/components/GlobalHeader'

export const layout = {
  menuHeaderRender: (logoDom: any, titleDom: any) => <MenuHeader logoDom={logoDom} titleDom={titleDom} />,
  logout: () => { },
  headerRender: ({ breadcrumb }: any) => {
    const title = breadcrumb[location.pathname] ? breadcrumb[location.pathname].name : ''
    return <GlobalHeader title={title} />
  }
};


export async function getInitialState() {
  const data = {};
  return data;
}
