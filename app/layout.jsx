import './globals.css';

export const metadata = {
  metadataBase: new URL('https://cafe-pachmarhi.www-satitechinfo.chatgpt.site'),
  title: 'Cafe Pachmarhi | Cafe Experience in Pachmarhi, Madhya Pradesh',
  description:
    'Discover Cafe Pachmarhi — food, beverages and relaxed cafe moments in Pachmarhi. A Single Use Plastic Free Zone. Call +91 62329 53430 or get directions on Google Maps.',
  openGraph: {
    title: 'Cafe Pachmarhi | A Single Use Plastic Free Zone',
    description: 'Food, beverages and relaxed cafe moments in Pachmarhi.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
