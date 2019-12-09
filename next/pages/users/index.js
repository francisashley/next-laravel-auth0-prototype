import Layout from "../../features/app/layout";
import Link from "next/link";
import fetcher from "../../lib/fetcher";
import withAuth from "../../lib/withAuth";

function Users({ authed, users }) {
  return (
    <Layout authed={authed} title="Users">
      <ul>
        {users.map(user => (
          <li key={user.username}>
            <Link href="/users/[id]" as={`/users/${user.username}`}>
              <a className="text-blue-600 hover:underline text-md">{user.username}</a>
            </Link>
            <span className="text-gray-600 text-sm">{` (${user.posts_count} posts)`}</span>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

Users.getInitialProps = async ({ req, res, query }) => {
  const { data: users } = await fetcher("/api/users").get();

  return { users };
};

export default withAuth(Users);
