import classnames from "classnames";

const Group = ({ className, ...props }) => {
  return <div className={classnames("flex flex-col mb-6", className)} {...props}></div>;
};

export default Group;
