import React from "react";
import Layout from "../../components/layout";
import { useFetchUser } from "../../lib/user";

function Post({ postId }) {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user} loading={loading} title={postId}>
      {loading && <p>Loading login info...</p>}
    </Layout>
  );
}

Post.getInitialProps = ({ query }) => {
  return { postId: query.id };
};

export default Post;
