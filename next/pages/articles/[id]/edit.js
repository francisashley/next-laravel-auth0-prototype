import Layout from "../../../components/layout";
import Panel from "../../../components/panel";
import withUser from "../../../lib/withUser";

function EditArticle({ user, id }) {
  return (
    <Layout user={user} title={`Edit article: ${id}`}>
      <Panel title="Edit article" />
    </Layout>
  );
}

EditArticle.getInitialProps = ({ query }) => {
  return { id: query.id };
};

export default withUser(EditArticle);
