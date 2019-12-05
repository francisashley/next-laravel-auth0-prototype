import Link from "next/link";
import Layout from "../../components/layout";
import Panel from "../../components/panel";
import { useFetchPosts } from "../../lib/posts";
import withAuth from "../../lib/withAuth";

function Posts({ user }) {
    const posts = useFetchPosts();

    return (
        <Layout user={user} title="Posts">
            <Panel title="Posts">
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>
                            <Link href="/posts/[id]" as={`/posts/${post.id}`}>
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
        </Layout>
    );
}

export default withAuth(Posts);
