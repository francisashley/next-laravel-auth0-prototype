import Layout from "../../../components/layout";
import Panel from "../../../components/panel";
import Error from "next/error";
import { fetchPost } from "../../../lib/posts";
import withAuth from "../../../lib/withAuth";
import Link from "next/link";

function Post({ authed, post }) {
    if (!post) {
        return <Error statusCode={404} />;
    }

    return (
        <Layout authed={authed} title={post ? post.title : ""}>
            {post && (
                <Panel>
                    <div className="mb-5 flex">
                        <div className="mr-4">
                            <strong className="font-semibold">By</strong>{" "}
                            <a href={`/users/` + post.author}>{post.author}</a>
                        </div>
                        <div>
                            <strong className="font-semibold">Published</strong>{" "}
                            {post.date.slice(0, 10)}
                        </div>
                        {authed.name === post.author && (
                            <div className="ml-auto">
                                <Link href={`/posts/${post.id}/edit`}>
                                    <a className="text-xs text-white bg-blue-700 hover:bg-blue-800 block py-1 px-3 rounded">
                                        Edit
                                    </a>
                                </Link>
                            </div>
                        )}
                    </div>

                    <p>{post.content}</p>
                </Panel>
            )}
        </Layout>
    );
}

Post.getInitialProps = async ({ query }) => {
    const post = await fetchPost(query.id);

    return { post };
};

export default withAuth(Post);
