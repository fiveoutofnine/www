const P: React.FC<React.HtmlHTMLAttributes<HTMLParagraphElement>> = (props) => {
  return (
    <p
      className="font-normal not-italic text-gray-11 before:content-none after:content-none group-[.mdx--callout]:my-0 group-[.mdx--callout]:text-inherit"
      {...props}
    />
  );
};

export default P;
