import classnames from "classnames";

const Error = ({ className, ...props }) => {
  return (
    <div {...props} className={classnames("text-sm text-red-600 font-medium mb-2", className)} />
  );
};

export default Error;
