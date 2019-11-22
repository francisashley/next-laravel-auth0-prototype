import React from "react";
import Layout from "../../components/layout";
import { useFetchUser } from "../../lib/user";

function User({ userId }) {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user} loading={loading} title={`User: ${userId}`}>
      {loading && <p>Loading login info...</p>}
    </Layout>
  );
}

User.getInitialProps = ({ query }) => {
  return { userId: query.id };
};

export default User;
