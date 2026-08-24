import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="missing-page">
      <p className="eyebrow">Cafe Pachmarhi</p>
      <h1>This path wandered off into the hills.</h1>
      <p>Let’s bring you back to the cafe.</p>
      <Link className="button button-primary" href="/">Return home</Link>
    </main>
  );
}
