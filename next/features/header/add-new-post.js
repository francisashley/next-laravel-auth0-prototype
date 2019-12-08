import Link from "next/link";
import classnames from "classnames";

const PrimaryButton = ({ href, ...props }) => {
  return (
    <>
      <Link href={href}>
        <a
          {...props}
          className={classnames(
            "text-white block py-1 px-2 text-xs tracking-wide border border-white",
            props.className || ""
          )}
        />
      </Link>
      <style jsx>{`
        a:hover,
        a:focus {
          border-color: rgba(255, 255, 255, 0.8);
          color: rgba(255, 255, 255, 0.8);
        }
      `}</style>
    </>
  );
};

export default PrimaryButton;
