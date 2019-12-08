import classnames from "classnames";

const Input = props => {
  return (
    <input
      className={classnames(
        "border w-full p-2 text-gray-700 focus:outline-none focus:shadow-outline border-gray-400 text-sm",
        props.className
      )}
      {...props}
    />
  );
};

export default Input;
