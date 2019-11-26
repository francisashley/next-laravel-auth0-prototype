import Layout from "../../../components/layout";
import Panel from "../../../components/panel";
import withUser from "../../../lib/withUser";

function DeleteArticle({ user, id }) {
  return (
    <Layout user={user} title={`Delete article: ${id}`}>
      <Panel title="Delete article" />
    </Layout>
  );
}

DeleteArticle.getInitialProps = ({ query }) => {
  return { id: query.id };
};

export default withUser(DeleteArticle);
