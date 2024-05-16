const Code: React.FC<JSX.IntrinsicElements['code']> = (props) => {
  return (
    <code
      className="rounded border border-gray-6 bg-gray-3 px-1 py-0.5 text-sm font-normal text-gray-12 before:content-none after:content-none group-[.mdx--link]:text-blue-9"
      {...props}
    />
  );
};

export default Code;
