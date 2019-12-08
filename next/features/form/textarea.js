import classnames from "classnames";

const Textarea = ({ className, ...props }) => {
  return (
    <textarea
      className={classnames(
        "border w-full p-2 text-gray-700 focus:outline-none focus:shadow-outline border-gray-400 text-sm h-64",
        className
      )}
      {...props}
    />
  );
};

export default Textarea;
