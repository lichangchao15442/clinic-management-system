import { ReactNode } from 'react';

declare const API_BASE: string;

interface FormItemType {
  label: string;
  name: string;
  component: ReactNode;
}
