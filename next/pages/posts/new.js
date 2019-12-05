import Layout from "../../components/layout";
import Panel from "../../components/panel";
import withAuth from "../../lib/withAuth";

function CreatePost({ user, postId }) {
    return (
        <Layout user={user} title={`Create post`}>
            <Panel title="Create post" />
        </Layout>
    );
}

export default withAuth(CreatePost, ({ user }) => Boolean(user));
