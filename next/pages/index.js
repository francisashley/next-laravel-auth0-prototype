import Link from "next/link";
import Layout from "../components/layout";
import Panel from "../components/panel";
import { useFetchPosts } from "../lib/posts";
import { useFetchUsers } from "../lib/users";
import withAuth from "../lib/withAuth";

function Home({ authed }) {
    const posts = useFetchPosts({ limit: 5 });
    const users = useFetchUsers();

    return (
        <Layout
            authed={authed}
            title={authed ? `Welcome back ${authed.name} 👋!` : `Welcome guest!`}
        >
            <Panel title="Recent posts">
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>
                            👉{" "}
                            <Link href={`/posts/[id]`} as={`/posts/${post.id}`}>
                                <a className="text-blue-600 hover:underline text-md">
                                    {post.title}
                                </a>
                            </Link>
                            <span className="text-gray-600 text-sm">
                                {" ~ "}
                                <Link href="/users/[id]" as={`/users/${post.author}`}>
                                    <a className="text-gray-600 hover:underline text-sm font-medium">
                                        {post.author}
                                    </a>
                                </Link>
                            </span>
                        </li>
                    ))}
                </ul>
            </Panel>
            <Panel title="Popular users">
                <ul>
                    {users.map((user, i) => (
                        <li key={i}>
                            ⚡️{" "}
                            <Link href="users/[id]" as={`users/${user.username}`}>
                                <a className="text-blue-600 hover:underline text-md">
                                    {user.username}
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Panel>
        </Layout>
    );
}

export default withAuth(Home);
