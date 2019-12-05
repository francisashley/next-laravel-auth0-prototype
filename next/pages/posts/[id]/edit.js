import Layout from "../../../components/layout";
import Panel from "../../../components/panel";
import withAuth from "../../../lib/withAuth";
import { fetchPost } from "../../../lib/posts";

function EditPost({ authed, id }) {
    return (
        <Layout authed={authed} title={`Edit post: ${id}`}>
            <Panel title="Edit post" />
        </Layout>
    );
}

EditPost.getInitialProps = async ({ query, authed }) => {
    if (!authed) return { redirect: "/api/login" };

    const post = await fetchPost(query.id);

    if (post.author !== authed.name) return { redirect: "/api/login" };

    return { id: query.id };
};

export default withAuth(EditPost);
