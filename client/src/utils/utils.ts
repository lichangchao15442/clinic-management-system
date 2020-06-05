// 查找当前路由对应的name
let name = '';
const findPathname = (routes: any, pathname: string) => {
  routes.some((item: any) => {
    if (item.path === pathname) {
      name = item.name;
      return true;
    } else if (item.routes) {
      findPathname(item.routes, pathname);
    }
  });
  return name;
};

export { findPathname };
