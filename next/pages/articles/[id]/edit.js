import React from "react";
import Layout from "../../../components/layout";
import { useFetchUser } from "../../../lib/user";

function EditArticle({ articleId }) {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user} loading={loading} title={`Edit article: ${articleId}`}>
      {loading && <p>Loading login info...</p>}
    </Layout>
  );
}

EditArticle.getInitialProps = ({ query }) => {
  return { articleId: query.id };
};

export default EditArticle;
