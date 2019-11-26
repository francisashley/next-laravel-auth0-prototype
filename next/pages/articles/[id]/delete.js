import React from "react";
import Layout from "../../../components/layout";
import withUser from "../../../lib/withUser";

function DeleteArticle({ user, id }) {
  return (
    <Layout user={user} title={`Delete article: ${id}`}>
      {loading && <p>Loading login info...</p>}
    </Layout>
  );
}

DeleteArticle.getInitialProps = ({ query }) => {
  return { id: query.id };
};

export default withUser(DeleteArticle);
