import { ReactNode } from "react";

declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}
// declare module 'classnames';

interface AnyObject {
  [key: string]: any;
}

interface FormItemType {
  label: string;
  name: string;
  component: ReactNode;
}

declare const API_BASE: string;
