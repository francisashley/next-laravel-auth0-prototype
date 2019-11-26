import React from "react";
import Layout from "../../../components/layout";
import withUser from "../../../lib/withUser";

function EditArticle({ user, id }) {
  return (
    <Layout user={user} title={`Edit article: ${id}`}>
      {loading && <p>Loading login info...</p>}
    </Layout>
  );
}

EditArticle.getInitialProps = ({ query }) => {
  return { id: query.id };
};

export default withUser(EditArticle);
