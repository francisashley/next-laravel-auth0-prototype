import Layout from "../../components/layout";
import { useFetchUser } from "../../lib/user";
import Link from "next/link";

function About() {
  const { user, loading } = useFetchUser();

  const articles = [
    {
      title: "10 Facts Nobody Told You About Horses",
      slug: "10-facts-nobody-told-you-about-horses",
      user: "cornsilk"
    },
    {
      title: "How To Start An Orchestra With Less Than $100",
      slug: "how-to-start-an-orchestra-with-less-than-$100",
      user: "bluefish"
    },
    {
      title: "What I Wish Everyone Knew About Coffee",
      slug: "What I Wish Everyone Knew About Coffee",
      user: "khadia"
    },
    {
      title: "Learn How To Make More Money With Bill Gates",
      slug: "learn-how-to-make-more-money-with-bill-gates",
      user: "cornsilk"
    },
    {
      title: "Seven Doubts You Should Clarify About Ducks",
      slug: "seven-doubts-you-should-clarify-about-ducks",
      user: "khadia"
    },
    {
      title: "5 Secrets Kung Fu Masters Don't Want You To Know",
      slug: "5-secrets-kung-fu-masters-dont-want-you-to-know",
      user: "khadia"
    },
    {
      title: "How To Fast Track Your Archery Skills",
      slug: "How To Fast Track Your Archery Skills",
      user: "bluefish"
    },
    {
      title: "Clear And Unbiased Facts About Cooking (Without All the Hype)",
      slug: "Clear And Unbiased Facts About Cooking (Without All the Hype)",
      user: "cornsilk"
    },
    {
      title: "Running: What A Mistake!",
      slug: "running-what-a-mistake",
      user: "khadia"
    },
    {
      title: "SuperEasy Ways To Learn Everything About Cucumbers",
      slug: "supereasy-ways-to-learn-everything-about-cucumbers",
      user: "cornsilk"
    },
    {
      title: "How Paper Will Change Your Business Strategy",
      slug: "what-i-wish-everyone-knew-about-coffee",
      user: "bluefish"
    },
    {
      title: "Top 25 Tips On Strength",
      slug: "Top 25 Tips On Strength",
      user: "cornsilk"
    },
    {
      title: "A Surprising Tip To Help You Mature",
      slug: "a-surprising-tip-to-help-you-mature",
      user: "khadia"
    },
    {
      title: "How To Take the Headache Out Of Dinner",
      slug: "How To Take the Headache Out Of Dinner",
      user: "khadia"
    },
    {
      title: "What Alberto Savoia Can Teach You About Computer Viruses",
      slug: "What Alberto Savoia Can Teach You About Computer Viruses",
      user: "cornsilk"
    },
    {
      title: "Top 3 Ways To Buy A Used Jeep",
      slug: "Top 3 Ways To Buy A Used Jeep",
      user: "khadia"
    },
    {
      title: "The Ultimate Guide To The Environment",
      slug: "The Ultimate Guide To The Environment",
      user: "khadia"
    },
    {
      title: "Clear And Unbiased Facts About Chocolate",
      slug: "Clear And Unbiased Facts About Chocolate",
      user: "khadia"
    },
    {
      title: "The A - Z Guide Of Mechanics",
      slug: "The A - Z Guide Of Mechanics",
      user: "cornsilk"
    },
    {
      title: "The Lazy Man's Guide To Fashion",
      slug: "The Lazy Man's Guide To Fashion",
      user: "bluefish"
    }
  ];

  return (
    <Layout user={user} loading={loading} title="Articles">
      <ul>
        {articles.map(article => (
          <li>
            <Link href="/articles/[id]" as={`/articles/${article.slug}`}>
              <a className="text-blue-600 hover:underline text-lg">{article.title}</a>
            </Link>
            <span className="text-gray-600 text-sm">
              {" ~ "}
              <Link href="/users/[id]" as={`/users/${article.user}`}>
                <a className="text-gray-600 hover:underline text-sm font-medium">{article.user}</a>
              </Link>
            </span>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export default About;
