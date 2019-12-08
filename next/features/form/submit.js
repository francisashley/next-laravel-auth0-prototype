import classnames from "classnames";

const Submit = props => {
  return (
    <button
      type="submit"
      className={classnames(
        "bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-3 focus:outline-none focus:shadow-outline leading-tight",
        props.className
      )}
    >
      {props.children}
    </button>
  );
};

export default Submit;
