import React from "react";
import Layout from "../../../components/layout";
import { useFetchUser } from "../../../lib/user";

function DeletePost({ postId }) {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user} loading={loading} title={`Delete post: ${postId}`}>
      {loading && <p>Loading login info...</p>}
    </Layout>
  );
}

DeletePost.getInitialProps = ({ query }) => {
  return { postId: query.id };
};

export default Post;
