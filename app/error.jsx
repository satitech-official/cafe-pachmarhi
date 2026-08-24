'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ reset }) {
  useEffect(() => console.error('Cafe Pachmarhi page error'), []);
  return (
    <main className="missing-page">
      <p className="eyebrow">Cafe Pachmarhi</p>
      <h1>Something interrupted the experience.</h1>
      <p>Please try again, or head back to the cafe home page.</p>
      <div className="button-row">
        <button className="button button-primary" onClick={reset}>Try again</button>
        <Link className="button button-ghost" href="/">Home</Link>
      </div>
    </main>
  );
}
