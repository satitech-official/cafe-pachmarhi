import './globals.css';
import BasePathFix from '../components/BasePathFix';

const SITE_URL = 'https://satitech-official.github.io/cafe-pachmarhi/';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Cafe Pachmarhi | Cafe Experience in Pachmarhi, Madhya Pradesh',
  description:
    'Discover Cafe Pachmarhi — food, beverages and relaxed cafe moments in Pachmarhi. A Single Use Plastic Free Zone. Call +91 62329 53430 or get directions on Google Maps.',
  openGraph: {
    title: 'Cafe Pachmarhi | A Single Use Plastic Free Zone',
    description: 'Food, beverages and relaxed cafe moments in Pachmarhi.',
    type: 'website',
    url: SITE_URL,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <BasePathFix />
        {children}
      </body>
    </html>
  );
}
