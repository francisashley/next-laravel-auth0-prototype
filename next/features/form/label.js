import classnames from "classnames";

const Label = props => {
  return (
    <label {...props} className={classnames("text-sm font-medium mb-2 block", props.className)} />
  );
};

export default Label;
