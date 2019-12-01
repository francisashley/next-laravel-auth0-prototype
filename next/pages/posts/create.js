import Layout from "../../components/layout";
import Panel from "../../components/panel";
import withUser from "../../lib/withUser";

function CreatePost({ user, postId }) {
    return (
        <Layout user={user} title={`Create post`}>
            <Panel title="Create post" />
        </Layout>
    );
}

export default withUser(CreatePost);
