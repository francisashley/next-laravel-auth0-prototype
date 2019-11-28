import Link from "next/link";
import Layout from "../../components/layout";
import Panel from "../../components/panel";
import { useFetchArticles } from "../../lib/articles";
import withUser from "../../lib/withUser";

function Articles({ user }) {
  const articles = useFetchArticles();

  return (
    <Layout user={user} title="Articles">
      <Panel title="Articles">
        <ul>
          {articles.map(article => (
            <li key={article.id}>
              <Link href="/articles/[id]" as={`/articles/${article.id}`}>
                <a className="text-blue-600 hover:underline text-md">{article.title}</a>
              </Link>
              <span className="text-gray-600 text-sm">
                {" ~ "}
                <Link href="/authors/[id]" as={`/authors/${article.author}`}>
                  <a className="text-gray-600 hover:underline text-sm font-medium">
                    {article.author}
                  </a>
                </Link>
              </span>
            </li>
          ))}
        </ul>
      </Panel>
    </Layout>
  );
}

export default withUser(Articles);
