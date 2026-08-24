export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://satitech-official.github.io/cafe-pachmarhi/sitemap.xml',
  };
}
