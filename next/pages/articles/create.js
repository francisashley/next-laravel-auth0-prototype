import React from "react";
import Layout from "../../components/layout";
import { useFetchUser } from "../../lib/user";

function Article({ articleId }) {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user} loading={loading} title={`Create article`}>
      {loading && <p>Loading login info...</p>}
    </Layout>
  );
}

export default Article;
