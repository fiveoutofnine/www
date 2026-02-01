import Link from 'next/link';

const A: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({ href, children, ...rest }) => {
  if (href && (href.startsWith('/') || href.startsWith('#'))) {
    return (
      <Link
        className="mdx--link group font-medium text-blue-9 no-underline hover:underline has-[code]:focus-visible:ring-0"
        href={href}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      className="mdx--link group w-fit font-medium text-blue-9 no-underline hover:underline has-[code]:focus-visible:ring-0"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      {children}
    </a>
  );
};

export default A;
