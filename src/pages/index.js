import { GraphQLClient, gql } from 'graphql-request';
import Link from 'next/link';

const CONTENTFUL_SPACE_ID = "c9d8pfbjv17v";
const CONTENTFUL_ACCESS_TOKEN = "1fLjvFcGn3g8sk4a73vzLjsqtfYwmqGkE1QFWcRo9RY";
const CONTENTFUL_GRAPHQL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`;

const graphQLClient = new GraphQLClient(CONTENTFUL_GRAPHQL_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
  },
});

// content type is "seoPage"
// must add "Collection" for Contentful's API
const QUERY = gql`
  query GetAllPages {
    seoPageCollection {
      items {
        slug
        title
      }
    }
  }
`;

// SSR - always runs on the server
export async function getStaticProps() {
  const data = await graphQLClient.request(QUERY);
  const pages = data.seoPageCollection.items;

  return {
    props: {
      pages,
    },
  };
}

export default function Home({ pages }) {
  return (
    <div>
      <h1>Blockchain is the <s>future</s> <span className="present-heading">present</span>.</h1>
      <ol>
        {pages.map((page) => (
          <li key={page.slug}>
            <Link href={`/${page.slug}`}>
              {page.title}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
