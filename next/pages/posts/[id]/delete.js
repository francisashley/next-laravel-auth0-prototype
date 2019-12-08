import Layout from "../../../features/app/layout";
import withAuth from "../../../lib/withAuth";

function DeletePost({ authed, id }) {
  return <Layout authed={authed} title={`Delete post: ${id}`} title="Delete post"></Layout>;
}

DeletePost.getInitialProps = ({ query, authed }) => {
  if (!authed) return { redirect: "/api/login" };

  return { id: query.id };
};

export default withAuth(DeletePost);
