import Layout from "../../../components/layout";
import Panel from "../../../components/panel";
import { useFetchPost } from "../../../lib/posts";
import withAuth from "../../../lib/withAuth";

function Post({ authed, id }) {
    const post = useFetchPost(id);

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
                    </div>

                    <p>{post.content}</p>
                </Panel>
            )}
        </Layout>
    );
}

Post.getInitialProps = ({ query }) => {
    return { id: query.id };
};

export default withAuth(Post);
