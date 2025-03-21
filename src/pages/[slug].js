import { GraphQLClient, gql } from 'graphql-request';
import { useRouter } from 'next/router';

const CONTENTFUL_SPACE_ID = "c9d8pfbjv17v";
const CONTENTFUL_ACCESS_TOKEN = "1fLjvFcGn3g8sk4a73vzLjsqtfYwmqGkE1QFWcRo9RY";
const CONTENTFUL_GRAPHQL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`;

const graphQLClient = new GraphQLClient(CONTENTFUL_GRAPHQL_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
  },
});

const QUERY = gql`
  query GetPageBySlug($slug: String!) {
    seoPageCollection(where: { slug: $slug }, limit: 1) {
      items {
        slug
        title
        metaDescription
      }
    }
  }
`;

export async function getStaticPaths() {
  const query = gql`
    query {
      seoPageCollection {
        items {
          slug
        }
      }
    }
  `;

  const data = await graphQLClient.request(query);
  const paths = data.seoPageCollection.items.map((item) => ({
    params: { slug: item.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const data = await graphQLClient.request(QUERY, { slug: params.slug });
  const page = data.seoPageCollection.items[0];

  return { props: { page } };
}

export default function Page({ page }) {
  const router = useRouter();
  if (router.isFallback) return <div>Loading...</div>;

  return (
    <div>
      <h1>{page.title}</h1>
      <p>{page.metaDescription || 'No content available.'}</p>
    </div>
  );
}
