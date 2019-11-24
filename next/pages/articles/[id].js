import React from "react";
import Layout from "../../components/layout";
import { useFetchUser } from "../../lib/user";

function Article({ articleId }) {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user} loading={loading} title={articleId}>
      {loading && <p>Loading login info...</p>}
    </Layout>
  );
}

Article.getInitialProps = ({ query }) => {
  return { articleId: query.id };
};

export default Article;
