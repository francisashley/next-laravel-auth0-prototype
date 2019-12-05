import Layout from "../../components/layout";
import Panel from "../../components/panel";
import withAuth from "../../lib/withAuth";

function CreatePost({ authed, postId }) {
    return (
        <Layout authed={authed} title={`Create post`}>
            <Panel title="Create post" />
        </Layout>
    );
}

CreatePost.getInitialProps = async ({ authed }) => {
    if (!authed) return { redirect: "/api/login" };

    return {};
};

export default withAuth(CreatePost);
