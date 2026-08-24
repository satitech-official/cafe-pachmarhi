const pages = ['', '/about', '/menu', '/featured', '/offers', '/gallery', '/reviews', '/blog', '/contact'];

export default function sitemap() {
  const base = 'https://cafe-pachmarhi.www-satitechinfo.chatgpt.site';
  return pages.map((path) => ({
    url: `${base}${path || '/'}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: path ? 0.7 : 1,
  }));
}
