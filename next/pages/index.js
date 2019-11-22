import React from "react";
import Layout from "../components/layout";
import { useFetchUser } from "../lib/user";
import Link from "next/link";

function Home() {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user} loading={loading} title="Next.js and Auth0 Example">
      {loading && <p>Loading login info...</p>}

      {!loading && !user && (
        <p>
          You are logged out. Would you like to{" "}
          <Link href="/api/login">
            <a>log in</a>
          </Link>
          ?
        </p>
      )}

      {user && (
        <>
          <p>
            You are logged in as <strong>{user.name}</strong>. Would you like to{" "}
            <Link href="/api/logout">
              <a>log out</a>
            </Link>
            ?
          </p>
        </>
      )}
    </Layout>
  );
}

export default Home;
