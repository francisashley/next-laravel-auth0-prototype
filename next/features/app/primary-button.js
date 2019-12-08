import Link from "next/link";
import classnames from "classnames";

const PrimaryButton = ({ href, ...props }) => {
  return (
    <Link href={href}>
      <a
        {...props}
        className={classnames(
          "text-white bg-blue-700 hover:bg-blue-800 block py-1 px-2 text-xs  tracking-wide",
          props.className || ""
        )}
      />
    </Link>
  );
};

export default PrimaryButton;
