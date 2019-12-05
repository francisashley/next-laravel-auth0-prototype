import Link from "next/link";
import Layout from "../components/layout";
import Panel from "../components/panel";
import { useFetchPosts } from "../lib/posts";
import withAuth from "../lib/withAuth";

function Home({ authed }) {
    const posts = useFetchPosts({ limit: 5 });

    const users = [
        { href: "/users/bluefish", username: "bluefish" },
        { href: "/users/cornsilk", username: "cornsilk" },
        { href: "/users/khadia", username: "khadia" }
    ];

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
                        </li>
                    ))}
                </ul>
            </Panel>
            <Panel title="Popular users">
                <ul>
                    {users.map((user, i) => (
                        <li key={i}>
                            ⚡️{" "}
                            <Link href="users/[id]" as={user.href}>
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
