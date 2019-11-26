import react, { useState, useEffect } from "react";
import Layout from "../../../components/layout";
import { useFetchArticle } from "../../../lib/articles";
import withUser from "../../../lib/withUser";

function Article({ user, id }) {
  const article = useFetchArticle(id);

  return (
    <Layout user={user} title={article ? article.title : ""}>
      {article && (
        <div className="shadow bg-white p-5 mb-5 rounded ">
          <div className="mb-5 flex">
            <div className="mr-4">
              <strong className="font-semibold">By</strong>{" "}
              <a href={`/authors/` + article.author}>{article.author}</a>
            </div>
            <div>
              <strong className="font-semibold">Published</strong> {article.date.slice(0, 10)}
            </div>
          </div>

          <p>{article.content}</p>
        </div>
      )}
    </Layout>
  );
}

Article.getInitialProps = ({ query }) => {
  return { id: query.id };
};

export default withUser(Article);
