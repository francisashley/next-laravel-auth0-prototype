import Head from "next/head";
import Header from "./header";

function Layout({ user, title = "", children }) {
    return (
        <div className="max-w-3xl m-auto px-3">
            <Head>
                <title>Next.js with Auth0</title>
            </Head>

            <Header user={user} />

            <main className="mx-auto max-w-3xl mb-24">
                {title && <h1 className="text-3xl font-semibold my-10 text-white">{title}</h1>}
                {children}
            </main>
        </div>
    );
}

export default Layout;
