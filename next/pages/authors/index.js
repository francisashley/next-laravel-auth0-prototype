import Link from "next/link";
import Layout from "../../components/layout";
import Panel from "../../components/panel";
import withUser from "../../lib/withUser";

function Authors({ user }) {
    const authors = [
        { username: "bluefish", totalPosts: 4 },
        { username: "cornsilk", totalPosts: 7 },
        { username: "khadia", totalPosts: 9 }
    ];

    return (
        <Layout user={user} title="Authors">
            <Panel title="Authors">
                <ul>
                    {authors.map(user => (
                        <li key={user.username}>
                            <Link href="/authors/[id]" as={`/authors/${user.username}`}>
                                <a className="text-blue-600 hover:underline text-md">
                                    {user.username}
                                </a>
                            </Link>
                            <span className="text-gray-600 text-sm">{` (${user.totalPosts} posts)`}</span>
                        </li>
                    ))}
                </ul>
            </Panel>
        </Layout>
    );
}

export default withUser(Authors);
