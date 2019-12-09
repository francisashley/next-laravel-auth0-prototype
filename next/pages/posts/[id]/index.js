import Error from "next/error";
import Layout from "../../../features/app/layout";
import Link from "next/link";
import PrimaryButton from "../../../features/app/primary-button";
import fetcher from "../../../lib/fetcher";
import withAuth from "../../../lib/withAuth";

function Post({ authed, post }) {
  if (!post) {
    return <Error statusCode={404} />;
  }

  return (
    <Layout authed={authed} title={post.title}>
      <div className="mb-5 flex">
        <div className="mr-4">
          <strong className="font-semibold">By</strong>{" "}
          <a href={`/users/` + post.author} className="hover:underline">
            {post.author}
          </a>
        </div>
        <div>
          <strong className="font-semibold">Published</strong> {post.date.slice(0, 10)}
        </div>
        {authed && authed.name === post.author && (
          <PrimaryButton
            href={`/posts/${post.id}/edit`}
            className="absolute top-0 right-0 mt-5 mr-5"
          >
            Edit Your Post
          </PrimaryButton>
        )}
      </div>
      <p>{post.content}</p>
    </Layout>
  );
}

Post.getInitialProps = async ({ query }) => {
  const { data: post } = await fetcher("/api/posts/" + query.id).get();

  return { post };
};

export default withAuth(Post);
