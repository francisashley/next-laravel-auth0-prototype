import React from "react";
import Layout from "../../../components/layout";
import { useFetchUser } from "../../../lib/user";

function EditArticle({ id }) {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user} loading={loading} title={`Edit article: ${id}`}>
      {loading && <p>Loading login info...</p>}
    </Layout>
  );
}

EditArticle.getInitialProps = ({ query }) => {
  return { id: query.id };
};

export default EditArticle;
