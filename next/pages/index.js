import Link from "next/link";
import Layout from "../components/layout";
import Panel from "../components/panel";
import { useFetchPosts } from "../lib/posts";
import withUser from "../lib/withUser";

function Home({ user }) {
    const posts = useFetchPosts({ limit: 5 });

    const users = [
        { href: "/authors/bluefish", username: "bluefish" },
        { href: "/authors/cornsilk", username: "cornsilk" },
        { href: "/authors/khadia", username: "khadia" }
    ];

    return (
        <Layout user={user} title={user ? `Welcome back ${user.name} 👋!` : `Welcome guest!`}>
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
            <Panel title="Popular authors">
                <ul>
                    {users.map((user, i) => (
                        <li key={i}>
                            ⚡️{" "}
                            <Link href="authors/[id]" as={user.href}>
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

export default withUser(Home);
