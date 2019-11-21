import React from "react";

// This import is only needed when checking authentication status directly from getInitialProps
// import auth0 from '../lib/auth0'
import { useFetchUser } from "../lib/user";
import Layout from "../components/layout";

function ProfileCard({ user }) {
  return (
    <>
      <h1>Profile</h1>

      <div>
        <h3>Profile (client rendered)</h3>
        <p>
          <strong>Avatar:</strong>
          <br />
          <img src={user.picture} alt="user picture" />
        </p>
        <p>
          <strong>User id:</strong> {user.sub}
        </p>
        <p>
          <strong>Username:</strong> {user.name}
        </p>
        <p>
          <strong>Updated at:</strong> {user.updated_at}
        </p>
      </div>
    </>
  );
}

function Profile() {
  const { user, loading } = useFetchUser({ required: true });

  return (
    <Layout user={user} loading={loading}>
      {loading ? <>Loading...</> : <ProfileCard user={user} />}
    </Layout>
  );
}

export default Profile;
