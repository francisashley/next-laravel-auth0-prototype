import Layout from "../features/app/layout";
import Link from "next/link";
import fetcher from "../lib/fetcher";
import withAuth from "../lib/withAuth";

function Home({ authed, posts }) {
  return (
    <Layout authed={authed} title={authed ? `Welcome back ${authed.name} 👋!` : `Welcome guest!`}>
      <p className="mb-3">Check out some recent posts:</p>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            👉{" "}
            <Link href={`/posts/[id]`} as={`/posts/${post.id}`}>
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

Home.getInitialProps = async ({ req, res, query }) => {
  let { data: posts } = await fetcher("/api/posts?limit=5").get();

  return { posts };
};

export default withAuth(Home);
