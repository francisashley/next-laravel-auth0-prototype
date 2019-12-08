import React, { Children } from "react";

import Link from "next/link";
import classnames from "classnames";
import { useRouter } from "next/router";

const ActiveLink = ({ children, ...props }) => {
  const { pathname } = useRouter();
  const child = Children.only(children);

  const isActive = pathname === props.href;
  const className = classnames(child.props.className, isActive && "active");

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

export default ActiveLink;
