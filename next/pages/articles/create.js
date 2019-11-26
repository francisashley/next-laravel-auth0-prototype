import Layout from "../../components/layout";
import Panel from "../../components/panel";
import withUser from "../../lib/withUser";

function CreateArticle({ user, articleId }) {
  return (
    <Layout user={user} title={`Create article`}>
      <Panel title="Create article" />
    </Layout>
  );
}

export default withUser(CreateArticle);
