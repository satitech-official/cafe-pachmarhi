const pages = ['', '/about/', '/menu/', '/featured/', '/offers/', '/gallery/', '/reviews/', '/blog/', '/contact/'];

export default function sitemap() {
  const base = 'https://satitech-official.github.io/cafe-pachmarhi';
  return pages.map((path) => ({
    url: `${base}${path || '/'}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: path ? 0.7 : 1,
  }));
}
