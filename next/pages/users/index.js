import Link from "next/link";
import Layout from "../../components/layout";
import Panel from "../../components/panel";
import withAuth from "../../lib/withAuth";

function Users({ user }) {
    const users = [
        { username: "bluefish", totalPosts: 4 },
        { username: "cornsilk", totalPosts: 7 },
        { username: "khadia", totalPosts: 9 }
    ];

    return (
        <Layout user={user} title="Users">
            <Panel title="Users">
                <ul>
                    {users.map(user => (
                        <li key={user.username}>
                            <Link href="/users/[id]" as={`/users/${user.username}`}>
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

export default withAuth(Users);
