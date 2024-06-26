import type { ReactNode } from 'react';
import type { FunctionComponent } from '@/common/types';
import Breadcrumbs from './Breadcrumbs/Breadcrumbs';
import BackButton from './Breadcrumbs/BackButton';

interface LayoutProps {
  title: string;
  subtitle?: string;
  backButton?: ReactNode;
  breadcrumbs?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}

const Layout = ({ title, subtitle, actions, backButton, breadcrumbs, children }: LayoutProps): FunctionComponent => {
  return (
    <>
      <header className='container py-4'>
        <div className='flex flex-col gap-1 text-gray-400'>
          {breadcrumbs || <Breadcrumbs />}
          <h1 className='text-3xl font-bold tracking-tight text-gray-900 flex flex-row gap-3 items-center'>
            {backButton || <BackButton />}
            {title}
          </h1>
          {subtitle ?? <h3 className='text-lg font-light'>{subtitle}</h3>}

          {!!actions && <div className='flex shrink-0'>{actions}</div>}
        </div>
      </header>
      <main className='container flex flex-col flex-1'>{children}</main>
    </>
  );
};

export default Layout;
