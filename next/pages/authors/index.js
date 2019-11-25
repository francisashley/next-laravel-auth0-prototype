import Layout from "../../components/layout";
import { useFetchUser } from "../../lib/user";
import Link from "next/link";

function Authors() {
  const { user, loading } = useFetchUser();

  const authors = [
    { username: "bluefish", totalArticles: 4 },
    { username: "cornsilk", totalArticles: 7 },
    { username: "khadia", totalArticles: 9 }
  ];

  return (
    <Layout user={user} loading={loading} title="Authors">
      <div className="flex-1 shadow bg-white p-5 mb-5 rounded">
        <ul>
          {authors.map(user => (
            <li key={user.username}>
              <Link href="/authors/[id]" as={`/authors/${user.username}`}>
                <a className="text-blue-600 hover:underline text-lg">{user.username}</a>
              </Link>
              <span className="text-gray-600 text-sm">{` (${user.totalArticles} articles)`}</span>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export default Authors;
