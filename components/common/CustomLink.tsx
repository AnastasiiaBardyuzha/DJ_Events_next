import { NextPage } from 'next';
import { ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  children: ReactNode,
  href: string,
  className?: string,
}

const CustomLink: NextPage<Props> = ({
  children,
  href,
  className,
  ...props
}) => (
    <Link href={href} {...props}>
      <a className={className}>{children}</a>
    </Link>
  );

export default CustomLink;
