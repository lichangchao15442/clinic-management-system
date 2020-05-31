import { defineConfig } from 'umi';

import routes from './route.config';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  layout: {
    name: '诊所管理系统',
  },
  theme: {
    '@primary-color': '#666EE8',
  },
  define: {
    API_BASE: 'http://127.0.0.1:7001',
  },
});
