import Layout from "../../components/layout";
import { useFetchUser } from "../../lib/user";
import Link from "next/link";

function About() {
  const { user, loading } = useFetchUser();

  const users = [
    { username: "bluefish", totalPosts: 4 },
    { username: "cornsilk", totalPosts: 7 },
    { username: "khadia", totalPosts: 9 }
  ];

  return (
    <Layout user={user} loading={loading} title="Users">
      <ul>
        {users.map(user => (
          <li>
            <Link href="/users/[id]" as={`/users/${user.username}`}>
              <a className="text-blue-600 hover:underline text-lg">{user.username}</a>
            </Link>
            <span className="text-gray-600 text-sm">{` (${user.totalPosts} posts)`}</span>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export default About;
