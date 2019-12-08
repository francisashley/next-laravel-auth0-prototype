import Head from "next/head";
import Header from "../header";
import classnames from "classnames";

const Layout = ({ authed, title = "", className, children }) => {
  return (
    <div className="max-w-3xl m-auto px-3">
      <Head>
        <title>Next.js with Auth0</title>
      </Head>

      <Header authed={authed} />

      <main className="mx-auto max-w-3xl mb-24">
        <div className={classnames("shadow bg-white p-10 mb-5 relative", className)}>
          {title && <h1 className="text-3xl font-semibold mb-5">{title}</h1>}
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
