import Layout from "../../../components/layout";
import Panel from "../../../components/panel";
import withUser from "../../../lib/withUser";

function DeletePost({ user, id }) {
    return (
        <Layout user={user} title={`Delete post: ${id}`}>
            <Panel title="Delete post" />
        </Layout>
    );
}

DeletePost.getInitialProps = ({ query }) => {
    return { id: query.id };
};

export default withUser(DeletePost);
