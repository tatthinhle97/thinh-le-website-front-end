// generate-sitemap.mjs
import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

// Helper to resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

// Your app's static routes
const routes = [
  '/',
  '/about-me',
  '/projects',
  '/projects/sale-and-rental-listings',
];

export async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: 'https://yourdomain.com' });
  const writeStream = createWriteStream(resolve(__dirname, 'public', 'sitemap.xml'));

  sitemap.pipe(writeStream);

  for (const url of routes) {
    sitemap.write({ url });
  }

  sitemap.end();

  await streamToPromise(sitemap);
}

// Run the function if the file is executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateSitemap();
}