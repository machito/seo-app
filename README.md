# Programmatic SEO App

**Objective**: Create an app that dynamically generates web pages with NextJS and Contentful.

**Goals:**
* Use AI to generate sample data
* Get feet wet with Contentful CMS and APIs
* Catch up with NextJS and GraphQL

**Learnings:**
* Contentful content model, content types, and fields
* Contentful API (read) vs Contentful Management API (write)
* CMA tokens (write) vs. API keys (read)
* Contentful has solid support for GraphQL
* NextJS server-side rendering
* getStaticPaths() fetches all slugs from Contentful to dynamically generate pages
* getStaticProps() fetches the page content for a specific slug

**Next Steps:**
* Integrate dotenv to use env variables
* Deploy to Vercel or Netlify
* Consider fully-dynamic content generation workflow (instead of importing data via json file)
* Incorporate SEO meta tags
* Automate content updates with Contentful Webhooks 
