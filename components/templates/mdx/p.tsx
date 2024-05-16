const P: React.FC<JSX.IntrinsicElements['p']> = (props) => {
  return (
    <p
      className="font-light not-italic text-gray-11 before:content-none after:content-none group-[.mdx--blockquote]:my-0 group-[.mdx--blockquote]:text-blue-12"
      {...props}
    />
  );
};

export default P;
