import Link from 'next/link';

const A: React.FC<JSX.IntrinsicElements['a']> = ({ href, children, ...rest }) => {
  if (href && href.startsWith('/')) {
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
