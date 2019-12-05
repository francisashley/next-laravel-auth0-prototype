import Layout from "../../../components/layout";
import Panel from "../../../components/panel";
import withAuth from "../../../lib/withAuth";

function DeletePost({ authed, id }) {
    return (
        <Layout authed={authed} title={`Delete post: ${id}`}>
            <Panel title="Delete post" />
        </Layout>
    );
}

DeletePost.getInitialProps = ({ query }) => {
    return { id: query.id };
};

export default withAuth(DeletePost, ({ user }) => Boolean(user));
