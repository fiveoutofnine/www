const Hr: React.FC<React.HTMLAttributes<HTMLHRElement>> = (props) => {
  return (
    <hr
      className="my-5 h-px w-full rounded-full border-[0.5px] border-gray-6 md:my-6"
      role="separator"
      {...props}
    />
  );
};

export default Hr;
