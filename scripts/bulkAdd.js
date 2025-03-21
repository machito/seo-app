// Import required modules
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENTFUL_SPACE_ID = "c9d8pfbjv17v";
const CONTENTFUL_ACCESS_TOKEN = "CFPAT-AbVwHMbO8JOnG6AZT6rb2aXfQpX1D5gjoN_9zk1wRCI"; // personal access token
const CONTENTFUL_ENVIRONMENT = "master"; // default contentful env name
const CONTENTFUL_CONTENT_TYPE = "seoPage"; // used as a request header

const JSON_FILE_PATH = path.join(__dirname, 'bulkData.json');

async function importDataToContentful() {
  try {
    const rawData = fs.readFileSync(JSON_FILE_PATH, 'utf8');
    const entries = JSON.parse(rawData);
    
    for (const entry of entries) {
      await createContentfulEntry(entry);
    }
    
    console.log('Data import complete.');
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

async function createContentfulEntry(entry) {
  const url = `https://api.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/entries`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
      'Content-Type': 'application/vnd.contentful.management.v1+json',
      'X-Contentful-Content-Type': CONTENTFUL_CONTENT_TYPE,
    },
    body: JSON.stringify({
      fields: {
        title: { 'en-US': entry.title },
        metaDescription: { 'en-US': entry.metaDescription },
        slug: { 'en-US': entry.slug },
      },
    }),
  });

  if (!response.ok) {
    console.error('Failed to create entry:', await response.text());
  } else {
    console.log(`Entry created: ${entry.title}`);
  }
}

importDataToContentful();
