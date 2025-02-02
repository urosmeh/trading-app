import { PropsWithChildren } from 'react';
import classes from './PageContainer.module.css';
import classNames from 'classnames';

type PageContainerProps = PropsWithChildren & {
  className?: string;
};

const PageContainer = ({ children, className }: PageContainerProps) => {
  return <div className={classNames(classes.page, className)}>{children}</div>;
};

export default PageContainer;
