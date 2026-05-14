export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/private/'],
    },
    sitemap: 'https://waloo-academy.vercel.app/sitemap.xml',
    host: 'https://waloo-academy.vercel.app',
  };
}