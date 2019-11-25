import React from "react";
import Layout from "../../components/layout";
import { useFetchUser } from "../../lib/user";

function CreateArticle({ articleId }) {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user} loading={loading} title={`Create article`}>
      {loading && <p>Loading login info...</p>}
    </Layout>
  );
}

export default CreateArticle;
