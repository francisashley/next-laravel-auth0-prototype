import React from "react";
import Layout from "../components/layout";
import { useFetchUser } from "../lib/user";

function Home() {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user} loading={loading} title="Next.js and Auth0 Example">
      {loading && <p>Loading login info...</p>}

      {!loading && !user && (
        <>
          <p>
            To test the login click in <i>Login</i>
          </p>
          <p>
            Once you have logged in you should be able to click in <i>Profile</i> and <i>Logout</i>
          </p>
        </>
      )}

      {user && (
        <>
          <h4 className="mb-4">Rendered user info on the client</h4>
          <img src={user.picture} alt="user picture" className="mb-4" />
          <p className="mb-2">
            <strong>Name</strong>: {user.name}
          </p>
        </>
      )}
    </Layout>
  );
}

export default Home;
