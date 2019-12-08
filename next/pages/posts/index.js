import Layout from "../../features/app/layout";
import Link from "next/link";
import PrimaryButton from "../../features/app/primary-button";
import { fetchPosts } from "../../lib/posts";
import withAuth from "../../lib/withAuth";

function Posts({ authed, posts }) {
  return (
    <Layout authed={authed} title="Posts">
      {authed && (
        <PrimaryButton href="/posts/new" className="absolute top-0 right-0 mt-5 mr-5">
          Add New Post
        </PrimaryButton>
      )}
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link href="/posts/[id]" as={`/posts/${post.id}`}>
              <a className="text-blue-600 hover:underline text-md">{post.title}</a>
            </Link>
            <span className="text-gray-600 text-sm">
              {" ~ "}
              <Link href="/users/[id]" as={`/users/${post.author}`}>
                <a className="text-gray-600 hover:underline text-sm font-medium">{post.author}</a>
              </Link>
            </span>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

Posts.getInitialProps = async ({ req, res, query }) => {
  const posts = await fetchPosts();

  return { posts };
};

export default withAuth(Posts);
