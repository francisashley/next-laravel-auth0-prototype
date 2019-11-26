import Head from "next/head";
import Header from "./header";

function Layout({ user, title = "", children }) {
  return (
    <>
      <Head>
        <title>Next.js with Auth0</title>
      </Head>

      <Header user={user} />

      <main className="mx-auto max-w-3xl">
        {title && <h1 className="text-3xl font-semibold my-10 text-white">{title}</h1>}
        {children}
      </main>
    </>
  );
}

export default Layout;
