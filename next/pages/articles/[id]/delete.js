import React from "react";
import Layout from "../../../components/layout";
import { useFetchUser } from "../../../lib/user";

function DeleteArticle({ articleId }) {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user} loading={loading} title={`Delete article: ${articleId}`}>
      {loading && <p>Loading login info...</p>}
    </Layout>
  );
}

DeleteArticle.getInitialProps = ({ query }) => {
  return { articleId: query.id };
};

export default DeleteArticle;
