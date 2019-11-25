import React from "react";
import Layout from "../../../components/layout";
import { useFetchUser } from "../../../lib/user";

function DeleteArticle({ id }) {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user} loading={loading} title={`Delete article: ${id}`}>
      {loading && <p>Loading login info...</p>}
    </Layout>
  );
}

DeleteArticle.getInitialProps = ({ query }) => {
  return { id: query.id };
};

export default DeleteArticle;
