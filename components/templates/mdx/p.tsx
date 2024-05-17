const P: React.FC<JSX.IntrinsicElements['p']> = (props) => {
  return (
    <p
      className="font-light not-italic text-gray-11 before:content-none after:content-none group-[.mdx--callout]:my-0 group-[.mdx--callout]:text-blue-12"
      {...props}
    />
  );
};

export default P;
