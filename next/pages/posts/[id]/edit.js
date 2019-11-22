import React from "react";
import Layout from "../../../components/layout";
import { useFetchUser } from "../../../lib/user";

function EditPost({ postId }) {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user} loading={loading} title={`Edit post: ${postId}`}>
      {loading && <p>Loading login info...</p>}
    </Layout>
  );
}

EditPost.getInitialProps = ({ query }) => {
  return { postId: query.id };
};

export default Post;
