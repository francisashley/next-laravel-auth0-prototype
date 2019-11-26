import Link from "next/link";
import Layout from "../../components/layout";
import Panel from "../../components/panel";
import withUser from "../../lib/withUser";

function Authors({ user }) {
  const authors = [
    { username: "bluefish", totalArticles: 4 },
    { username: "cornsilk", totalArticles: 7 },
    { username: "khadia", totalArticles: 9 }
  ];

  return (
    <Layout user={user} title="Authors">
      <Panel title="Authors">
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
      </Panel>
    </Layout>
  );
}

export default withUser(Authors);
