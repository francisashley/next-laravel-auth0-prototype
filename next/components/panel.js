import classnames from "classnames";

const Panel = props => {
  return (
    <div className={classnames("shadow bg-white p-5 mb-8 rounded", props.className)}>
      {props.title && <h3 className="mb-3 text-2xl">{props.title}</h3>}
      {props.children}
    </div>
  );
};

Panel.defaultProps = {
  title: ""
};

export default Panel;
