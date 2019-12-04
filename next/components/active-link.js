import { useRouter } from "next/router";
import Link from "next/link";
import React, { Children } from "react";

const ActiveLink = ({ children, ...props }) => {
    const { pathname } = useRouter();
    const child = Children.only(children);

    const className =
        pathname === props.href ? `${child.props.className} active` : child.props.className;

    return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

export default ActiveLink;
