import Layout from "../../../components/layout";
import Panel from "../../../components/panel";
import withUser from "../../../lib/withUser";

function EditPost({ user, id }) {
    return (
        <Layout user={user} title={`Edit post: ${id}`}>
            <Panel title="Edit post" />
        </Layout>
    );
}

EditPost.getInitialProps = ({ query }) => {
    return { id: query.id };
};

export default withUser(EditPost);
