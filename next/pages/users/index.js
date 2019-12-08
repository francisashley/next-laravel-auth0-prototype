import Layout from "../../features/app/layout";
import Link from "next/link";
import { fetchUsers } from "../../lib/users";
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
  const users = await fetchUsers();

  return { users };
};

export default withAuth(Users);
