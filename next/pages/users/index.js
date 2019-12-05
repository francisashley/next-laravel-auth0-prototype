import Link from "next/link";
import Layout from "../../components/layout";
import Panel from "../../components/panel";
import withAuth from "../../lib/withAuth";
import { useFetchUsers } from "../../lib/users";

function Users({ authed }) {
    const users = useFetchUsers();

    return (
        <Layout authed={authed} title="Users">
            <Panel title="Users">
                <ul>
                    {users.map(user => (
                        <li key={user.username}>
                            <Link href="/users/[id]" as={`/users/${user.username}`}>
                                <a className="text-blue-600 hover:underline text-md">
                                    {user.username}
                                </a>
                            </Link>
                            <span className="text-gray-600 text-sm">{` (${user.posts_count} posts)`}</span>
                        </li>
                    ))}
                </ul>
            </Panel>
        </Layout>
    );
}

export default withAuth(Users);
