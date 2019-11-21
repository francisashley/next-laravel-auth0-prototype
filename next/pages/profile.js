import React from "react";

// This import is only needed when checking authentication status directly from getInitialProps
// import auth0 from '../lib/auth0'
import { useFetchUser } from "../lib/user";
import Layout from "../components/layout";

function ProfileCard({ user }) {
  return (
    <>
      <img className="float-left mr-4" src={user.picture} alt="user picture" />
      <p className="mb-2">
        <strong>Username:</strong> {user.name}
      </p>
      <p className="mb-2">
        <strong>User id:</strong> {user.sub}
      </p>
      <p className="mb-2">
        <strong>Updated at:</strong> {user.updated_at}
      </p>
    </>
  );
}

function Profile() {
  const { user, loading } = useFetchUser({ required: true });

  return (
    <Layout user={user} loading={loading} title="Profile (client rendered)">
      {loading ? <>Loading...</> : <ProfileCard user={user} />}
    </Layout>
  );
}

export default Profile;
