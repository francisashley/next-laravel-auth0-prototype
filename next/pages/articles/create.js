import React from "react";
import Layout from "../../components/layout";
import withUser from "../../lib/withUser";

function CreateArticle({ user, articleId }) {
  return (
    <Layout user={user} title={`Create article`}>
      {loading && <p>Loading login info...</p>}
    </Layout>
  );
}

export default withUser(CreateArticle);
