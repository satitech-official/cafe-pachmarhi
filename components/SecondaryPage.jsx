'use client';
/* eslint-disable @next/next/no-html-link-for-pages -- Direct document links keep hosted navigation reliable. */

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ArrowUpRight, BookOpen, Camera, ChevronLeft, ChevronRight, Coffee, Compass, Heart, Leaf, MapPin, Menu, MessageCircle, Phone, Search, Send, Sparkles, UtensilsCrossed, X } from 'lucide-react';

const PHONE = '+91 62329 53430';
const PHONE_HREF = 'tel:+916232953430';
const WHATSAPP = 'https://wa.me/916232953430';
const MAPS = 'https://maps.app.goo.gl/XgJQ4wM6gzj3ptnY8';

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about', page: 'about' },
  { label: 'Menu', href: '/menu', page: 'menu' },
  { label: 'Signature', href: '/featured', page: 'featured' },
  { label: 'Offers', href: '/offers', page: 'offers' },
  { label: 'Gallery', href: '/gallery', page: 'gallery' },
  { label: 'Reviews', href: '/reviews', page: 'reviews' },
  { label: 'Blog', href: '/blog', page: 'blog' },
  { label: 'Contact', href: '/contact', page: 'contact' },
];

const MENU_ITEMS = [
  { name: 'Coffee', group: 'Warm drinks', note: 'Ask the cafe for today’s coffee selection.', icon: Coffee },
  { name: 'Tea', group: 'Warm drinks', note: 'Ask the cafe for today’s tea selection.', icon: Coffee },
  { name: 'Drinks', group: 'Refreshments', note: 'Ask the cafe for available drinks.', icon: Sparkles },
  { name: 'Dessert', group: 'Sweet bites', note: 'Ask the cafe for today’s desserts.', icon: Heart },
  { name: 'Momos', group: 'Food', note: 'Ask the cafe for current momos availability.', icon: UtensilsCrossed },
  { name: 'Burgers', group: 'Food', note: 'Ask the cafe for current burger availability.', icon: UtensilsCrossed },
  { name: 'South Indian', group: 'Food', note: 'Ask the cafe for current South Indian options.', icon: UtensilsCrossed },
  { name: 'Chinese', group: 'Food', note: 'Ask the cafe for current Chinese options.', icon: UtensilsCrossed },
  { name: 'North Indian', group: 'Food', note: 'Ask the cafe for current North Indian options.', icon: UtensilsCrossed },
  { name: 'Paratha', group: 'Food', note: 'Ask the cafe for current paratha options.', icon: UtensilsCrossed },
];

const GALLERY = [
  { src: '/cafe-pachmarhi/cafe-03.jpg', title: 'The storefront', category: 'Exterior', alt: 'Cafe Pachmarhi storefront' },
  { src: '/cafe-pachmarhi/cafe-01.jpg', title: 'A place to settle in', category: 'Inside', alt: 'Seating and counter inside Cafe Pachmarhi' },
  { src: '/cafe-pachmarhi/hero.jpg', title: 'Tables & conversations', category: 'Inside', alt: 'Guests seated at Cafe Pachmarhi' },
  { src: '/cafe-pachmarhi/cafe-04.jpg', title: 'Warmly lit evenings', category: 'Exterior', alt: 'Cafe Pachmarhi lit in the evening' },
  { src: '/cafe-pachmarhi/cafe-05.jpg', title: 'A welcoming start', category: 'Inside', alt: 'Cafe Pachmarhi welcome graphic' },
];

function Brand({ light = false }) {
  return <a className={`brand ${light ? 'brand-light' : ''}`} href="/" aria-label="Cafe Pachmarhi home"><span className="brand-mark"><Coffee size={17} /></span><span><b>Cafe</b> Pachmarhi</span></a>;
}

function PageHeader({ page }) {
  const [drawer, setDrawer] = useState(false);
  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawer]);
  return <>
    <header className="site-header is-scrolled solid-header page-header">
      <Brand />
      <nav className="desktop-nav" aria-label="Primary navigation">
        {NAV.map((item) => <a key={item.label} className={item.page === page ? 'active' : ''} aria-current={item.page === page ? 'page' : undefined} href={item.href}>{item.label}</a>)}
      </nav>
      <div className="header-actions"><a className="header-call" href={PHONE_HREF}><Phone size={15} /><span>Call / Reserve</span></a><button className="menu-toggle" aria-label="Open navigation" aria-expanded={drawer} onClick={() => setDrawer(true)}><Menu /></button></div>
    </header>
    {drawer && <aside className="mobile-drawer-wrap" onMouseDown={() => setDrawer(false)}><div className="mobile-drawer" onMouseDown={(event) => event.stopPropagation()}><div className="drawer-top"><Brand /><button aria-label="Close navigation" onClick={() => setDrawer(false)}><X /></button></div><nav aria-label="Mobile navigation">{NAV.map((item) => <a key={item.label} className={item.page === page ? 'active' : ''} href={item.href} onClick={() => setDrawer(false)}>{item.label}<ArrowRight /></a>)}</nav><a className="drawer-call" href={PHONE_HREF}><Phone /> Call Cafe Pachmarhi</a></div></aside>}
  </>;
}

function PageFooter() {
  return <footer className="site-footer"><div className="container footer-grid"><div><Brand light /><p>A Single Use Plastic Free Zone</p><p className="footer-note">Good food. Great conversations. Less plastic.</p></div><div className="footer-links"><span>Explore</span><a href="/about">About</a><a href="/menu">Menu</a><a href="/gallery">Gallery</a><a href="/contact">Contact</a></div><div className="footer-links"><span>Find us</span><a href={PHONE_HREF}>{PHONE}</a><a href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp</a><a href={MAPS} target="_blank" rel="noreferrer">Google Maps</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Cafe Pachmarhi</span><span>Pachmarhi, Madhya Pradesh</span></div></footer>;
}

function FloatingActions() {
  return <div className="floating-actions"><a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="WhatsApp Cafe Pachmarhi"><MessageCircle /></a><a href={PHONE_HREF} aria-label="Call Cafe Pachmarhi"><Phone /></a><a href={MAPS} target="_blank" rel="noreferrer" aria-label="Get directions to Cafe Pachmarhi"><MapPin /></a></div>;
}

function QuoteButton({ children = 'Ask on WhatsApp', className = 'button button-primary' }) {
  return <a className={className} href={WHATSAPP} target="_blank" rel="noreferrer">{children}<ArrowUpRight /></a>;
}

function AboutPage() {
  const points = ['Food & refreshments', 'Unhurried conversations', 'A mindful plastic-free identity'];
  return <>
    <section className="about-mast"><div className="container about-mast-grid"><div className="about-mast-copy"><p className="eyebrow">About Cafe Pachmarhi</p><span className="page-number">01 / 08</span><h1>A better kind of <em>pause</em> in Pachmarhi.</h1><p>Not every café moment needs a rush. Cafe Pachmarhi is shaped for a refreshing break, a good meal and time with the people you are travelling with.</p><div className="hero-buttons"><QuoteButton>Plan your visit</QuoteButton><a className="button button-ghost" href="#our-approach">Our approach <ArrowRight /></a></div></div><div className="about-mast-image"><Image src="/cafe-pachmarhi/cafe-01.jpg" alt="Cafe Pachmarhi seating and counter" fill priority sizes="(max-width: 800px) 100vw, 48vw" /><span>01<br /><small>Pachmarhi pace</small></span></div></div></section>
    <section id="our-approach" className="about-approach section container"><div className="about-statement"><p className="eyebrow">The idea</p><h2>Come for the food.<br /><em>Stay for the moment.</em></h2></div><div className="about-points">{points.map((point, index) => <div key={point}><span>{String(index + 1).padStart(2, '0')}</span><p>{point}</p><ArrowUpRight /></div>)}</div></section>
    <section className="about-wide-image"><Image src="/cafe-pachmarhi/hero.jpg" alt="Guests and tables at Cafe Pachmarhi" fill sizes="100vw" /><div><p className="eyebrow">Made for togetherness</p><h2>One table can hold a whole afternoon.</h2></div></section>
    <section className="about-values section container"><div className="about-value-intro"><Leaf /><p className="eyebrow">Responsible cafe culture</p><h2>A Single Use Plastic Free Zone.</h2><p>This is a clear part of Cafe Pachmarhi’s identity: enjoying a cafe break while being more mindful of the surroundings that make Pachmarhi special.</p></div><div className="about-value-card"><span>CAFÉ NOTE</span><p>Good food, refreshing drinks and an easy place to sit together — with a little less single-use plastic in the picture.</p><a href={MAPS} target="_blank" rel="noreferrer">Find the cafe <Compass /><ArrowUpRight /></a></div></section>
  </>;
}

function MenuPage() {
  const [activeGroup, setActiveGroup] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const groups = ['All', ...new Set(MENU_ITEMS.map((item) => item.group))];
  const visible = useMemo(() => MENU_ITEMS.filter((item) => (activeGroup === 'All' || item.group === activeGroup) && item.name.toLowerCase().includes(search.trim().toLowerCase())), [activeGroup, search]);
  return <>
    <section className="menu-mast"><div className="container menu-mast-inner"><div><p className="eyebrow">Menu guide</p><span className="page-number">02 / 08</span><h1>Find your kind of <em>cafe break.</em></h1><p>These categories are visible at Cafe Pachmarhi. For the exact dishes, prices and availability today, please ask the cafe directly.</p></div><div className="menu-sign-image"><Image src="/cafe-pachmarhi/cafe-04.jpg" alt="Cafe Pachmarhi exterior and menu sign" fill priority sizes="(max-width: 800px) 100vw, 42vw" /><span>Today’s selection<br /><b>confirmed by the cafe</b></span></div></div></section>
    <section className="menu-catalogue section"><div className="container"><div className="menu-catalogue-top"><div><p className="eyebrow">Browse the menu</p><h2>Simple choices. <em>Good possibilities.</em></h2></div><div className="menu-search"><Search /><input value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Search menu categories" placeholder="Search a category" /></div></div><div className="menu-group-tabs" role="tablist" aria-label="Menu groups">{groups.map((group) => <button type="button" key={group} className={activeGroup === group ? 'active' : ''} onClick={() => setActiveGroup(group)}>{group}</button>)}</div><div className="menu-guide-grid">{visible.map((item, index) => { const Icon = item.icon; return <button type="button" className="menu-guide-card" key={item.name} onClick={() => setSelected(item)}><span>{String(index + 1).padStart(2, '0')}</span><Icon /><h3>{item.name}</h3><p>{item.note}</p><b>See availability <ArrowRight /></b></button>; })}</div>{!visible.length && <div className="menu-empty">No category matches that search. Try another word, or message the cafe for today’s selection.</div>}</div></section>
    <section className="menu-contact-strip"><div className="container"><div><p className="eyebrow">Before you order</p><h2>No stale prices.<br />No guessing.</h2></div><p>Availability can change throughout the day. Call or WhatsApp Cafe Pachmarhi for the current menu and a direct answer.</p><div className="menu-strip-actions"><a href={PHONE_HREF}><Phone /> Call cafe</a><a href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a></div></div></section>
    {selected && <div className="menu-detail-backdrop" role="dialog" aria-modal="true" aria-label={`${selected.name} availability`} onMouseDown={() => setSelected(null)}><article className="menu-detail-sheet" onMouseDown={(event) => event.stopPropagation()}><button className="close-modal" aria-label="Close menu detail" onClick={() => setSelected(null)}><X /></button><Coffee /><p className="eyebrow">Cafe Pachmarhi menu</p><h2>{selected.name}</h2><p>{selected.note} The cafe confirms dishes and prices directly, so you always have the latest information.</p><div><a className="button button-primary" href={PHONE_HREF}>Call to ask <Phone /></a><QuoteButton className="button button-ghost">Message the cafe</QuoteButton></div></article></div>}
  </>;
}

function FeaturedPage() {
  return <>
    <section className="signature-mast"><div className="signature-photo"><Image src="/cafe-pachmarhi/hero.jpg" alt="Cafe Pachmarhi guests and tables in the evening" fill priority sizes="100vw" /></div><div className="signature-shade" /><div className="container signature-copy"><p className="eyebrow">The Cafe Pachmarhi experience</p><span className="page-number">03 / 08</span><h1>Good food.<br /><em>Great conversations.</em></h1><p>Whatever brings you in — a travel break, family time or an easy catch-up — the best part is making room for the moment.</p><a className="button button-light" href="#ways-to-enjoy">Explore the experience <ArrowRight /></a></div></section>
    <section id="ways-to-enjoy" className="signature-ways section container"><div className="signature-ways-head"><p className="eyebrow">Ways to enjoy it</p><h2>Pick your pace.<br /><em>We’ll set the scene.</em></h2></div><div className="signature-way-grid">{[{ num: '01', title: 'A travel break', text: 'Pause between Pachmarhi plans with food and refreshments.' }, { num: '02', title: 'Time together', text: 'A simple place to settle into a conversation with family or friends.' }, { num: '03', title: 'A cafe moment', text: 'Choose the menu category that suits the time of day, then ask what is available.' }].map((item) => <article key={item.num}><span>{item.num}</span><h3>{item.title}</h3><p>{item.text}</p><ArrowUpRight /></article>)}</div></section>
    <section className="signature-collage"><div className="signature-collage-a"><Image src="/cafe-pachmarhi/cafe-01.jpg" alt="Cafe Pachmarhi interior seating" fill sizes="(max-width: 800px) 100vw, 55vw" /></div><div className="signature-collage-copy"><p className="eyebrow">The feeling</p><h2>Slow down.<br />There’s time for <em>another conversation.</em></h2><a href="/gallery" className="text-link">See the cafe gallery <ArrowRight /></a></div><div className="signature-collage-b"><Image src="/cafe-pachmarhi/cafe-05.jpg" alt="Cafe Pachmarhi welcome detail" fill sizes="(max-width: 800px) 78vw, 30vw" /></div></section>
    <section className="signature-cta container"><Sparkles /><div><p className="eyebrow">Make it a cafe stop</p><h2>Find Cafe Pachmarhi in Pachmarhi.</h2></div><a href={MAPS} target="_blank" rel="noreferrer">Get directions <ArrowUpRight /></a></section>
  </>;
}

function OffersPage() {
  const options = [
    { label: 'Today’s menu', title: 'Ask what’s available today.', text: 'The cafe can tell you the exact dishes and drinks currently being served.', image: '/cafe-pachmarhi/cafe-04.jpg' },
    { label: 'A travel break', title: 'Plan a refreshing stop.', text: 'Call or WhatsApp before your visit to ask the cafe what works for your group.', image: '/cafe-pachmarhi/cafe-03.jpg' },
    { label: 'Cafe timing', title: 'Confirm before you come.', text: 'A direct message is the best way to confirm current timing and availability.', image: '/cafe-pachmarhi/cafe-03.jpg' },
  ];
  const [selected, setSelected] = useState(0);
  const item = options[selected];
  return <>
    <section className="offers-mast"><div className="container"><p className="eyebrow">What’s happening</p><span className="page-number">04 / 08</span><h1>Fresh information beats <em>old offers.</em></h1><p>We do not publish made-up discounts, crossed-out prices or time-sensitive claims that might no longer be true.</p></div></section>
    <section className="offers-selector section container"><div className="offers-selector-list"><p className="eyebrow">Choose what you need</p>{options.map((option, index) => <button type="button" key={option.label} className={selected === index ? 'active' : ''} onClick={() => setSelected(index)}><span>0{index + 1}</span><b>{option.label}</b><ArrowRight /></button>)}</div><article className="offers-live-card"><Image src={item.image} alt="Cafe Pachmarhi" fill sizes="(max-width: 800px) 100vw, 55vw" /><div /><div className="offers-live-content"><span className="live-badge">Live answer from the cafe</span><h2>{item.title}</h2><p>{item.text}</p><QuoteButton>Ask Cafe Pachmarhi</QuoteButton></div></article></section>
    <section className="offers-promise"><div className="container"><div><Heart /><h2>Always useful.<br />Never made up.</h2></div><p>For a current special, group visit or menu question, message Cafe Pachmarhi directly. You will get the cafe’s answer, not a stale promotional card.</p><a href={WHATSAPP} target="_blank" rel="noreferrer">Start on WhatsApp <ArrowUpRight /></a></div></section>
  </>;
}

function GalleryPage() {
  const [filter, setFilter] = useState('All');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const filters = ['All', ...new Set(GALLERY.map((item) => item.category))];
  const visible = GALLERY.filter((item) => filter === 'All' || item.category === filter);
  const selected = selectedIndex === null ? null : visible[selectedIndex];
  const cycle = (direction) => setSelectedIndex((current) => (current + direction + visible.length) % visible.length);
  return <>
    <section className="gallery-mast"><div className="container"><p className="eyebrow">Cafe Pachmarhi gallery</p><span className="page-number">05 / 08</span><h1>See the cafe in <em>its own light.</em></h1><p>Real Cafe Pachmarhi photos, collected here as one full gallery.</p></div><div className="gallery-mast-strip"><Image src="/cafe-pachmarhi/cafe-03.jpg" alt="Cafe Pachmarhi storefront" fill priority sizes="100vw" /></div></section>
    <section className="gallery-showcase section container"><div className="gallery-showcase-top"><div><p className="eyebrow">Browse moments</p><h2>Inside, outside<br />and after dark.</h2></div><div className="gallery-filter-tabs">{filters.map((item) => <button type="button" key={item} className={filter === item ? 'active' : ''} onClick={() => { setFilter(item); setSelectedIndex(null); }}>{item}</button>)}</div></div><div className="full-gallery-grid">{visible.map((item, index) => <button type="button" className={`full-gallery-item full-gallery-item-${(index % 6) + 1}`} key={item.src} onClick={() => setSelectedIndex(index)}><Image src={item.src} alt={item.alt} fill sizes="(max-width: 800px) 100vw, 50vw" /><span><small>{item.category}</small><b>{item.title}</b><Camera /></span></button>)}</div></section>
    <section className="gallery-note"><div className="container"><Camera /><p>Every frame comes from Cafe Pachmarhi’s real business listing — a gallery for seeing the place before you arrive.</p><a href={MAPS} target="_blank" rel="noreferrer">Visit the cafe <ArrowUpRight /></a></div></section>
    {selected && <div className="gallery-lightbox-backdrop" role="dialog" aria-modal="true" aria-label={selected.title} onMouseDown={() => setSelectedIndex(null)}><div className="gallery-lightbox-panel" onMouseDown={(event) => event.stopPropagation()}><button className="close-modal" aria-label="Close gallery image" onClick={() => setSelectedIndex(null)}><X /></button><button className="gallery-arrow gallery-arrow-left" aria-label="Previous image" onClick={() => cycle(-1)}><ChevronLeft /></button><div className="gallery-lightbox-image"><Image src={selected.src} alt={selected.alt} fill sizes="90vw" /></div><button className="gallery-arrow gallery-arrow-right" aria-label="Next image" onClick={() => cycle(1)}><ChevronRight /></button><div className="gallery-lightbox-caption"><span>{selected.category}</span><h2>{selected.title}</h2><small>{selectedIndex + 1} / {visible.length}</small></div></div></div>}
  </>;
}

function ReviewsPage() {
  return <>
    <section className="reviews-mast"><div className="container"><p className="eyebrow">Guest notes</p><span className="page-number">06 / 08</span><h1>Reviews should be <em>real.</em></h1><p>That is why we have not added copied testimonials or anonymous five-star quotes to Cafe Pachmarhi’s website.</p><div className="reviews-mark">“</div></div></section>
    <section className="reviews-principles section container"><div><p className="eyebrow">Our standard</p><h2>Real feedback deserves a <em>real source.</em></h2></div><div className="reviews-rule-list">{[{ n: '01', t: 'No copied reviews', d: 'Nothing appears here unless Cafe Pachmarhi can verify where it came from.' }, { n: '02', t: 'No invented ratings', d: 'We will not manufacture a score or a guest quote to fill a section.' }, { n: '03', t: 'Clear attribution', d: 'Approved feedback can be added later with an honest source and context.' }].map((item) => <article key={item.n}><span>{item.n}</span><h3>{item.t}</h3><p>{item.d}</p></article>)}</div></section>
    <section className="reviews-empty"><div className="reviews-empty-image"><Image src="/cafe-pachmarhi/cafe-01.jpg" alt="Cafe Pachmarhi seating" fill sizes="(max-width: 800px) 100vw, 50vw" /></div><div><p className="eyebrow">For now</p><h2>Experience it for yourself.</h2><p>The best way to decide if Cafe Pachmarhi is right for your plan is to call, ask a question, or visit the cafe directly.</p><div className="hero-buttons"><a className="button button-primary" href={PHONE_HREF}>Call the cafe <Phone /></a><a className="button button-ghost" href={MAPS} target="_blank" rel="noreferrer">Get directions <MapPin /></a></div></div></section>
  </>;
}

function BlogPage() {
  const stories = [
    { title: 'Make room for a real travel break.', eyebrow: 'Pachmarhi pace', text: 'A good break is not about packing in more. It can be as simple as food, a drink and a table where nobody needs to hurry.', image: '/cafe-pachmarhi/cafe-04.jpg', tag: 'Travel note' },
    { title: 'A cafe moment can be a little more mindful.', eyebrow: 'Responsible cafe culture', text: 'Cafe Pachmarhi’s Single Use Plastic Free Zone identity keeps a small but valuable idea in view: enjoy the place, and respect its surroundings too.', image: '/cafe-pachmarhi/cafe-05.jpg', tag: 'Cafe note' },
    { title: 'The best conversations take their time.', eyebrow: 'At the table', text: 'Pachmarhi has its own rhythm. A comfortable cafe table gives friends and families one more reason to slow down together.', image: '/cafe-pachmarhi/hero.jpg', tag: 'Moment' },
  ];
  const [active, setActive] = useState(0);
  const story = stories[active];
  return <>
    <section className="journal-mast"><div className="container"><BookOpen /><p className="eyebrow">Pachmarhi notes</p><span className="page-number">07 / 08</span><h1>Small pauses make the best <em>travel memories.</em></h1><p>Short, intentional notes about cafe culture, unhurried breaks and the Pachmarhi pace.</p></div></section>
    <section className="journal-reader section container"><div className="journal-index"><p className="eyebrow">Choose a note</p>{stories.map((item, index) => <button type="button" className={active === index ? 'active' : ''} key={item.title} onClick={() => setActive(index)}><span>0{index + 1}</span><b>{item.tag}</b><ArrowRight /></button>)}</div><article className="journal-feature"><div className="journal-feature-image"><Image src={story.image} alt="Cafe Pachmarhi" fill sizes="(max-width: 800px) 100vw, 60vw" /></div><div className="journal-feature-copy"><p className="eyebrow">{story.eyebrow}</p><h2>{story.title}</h2><p>{story.text}</p><a href="/contact" className="text-link">Plan a cafe stop <ArrowRight /></a></div></article></section>
    <section className="journal-footnote"><div className="container"><span>CAFÉ PACHMARHI</span><p>More thoughtful stories can live here when the cafe has a local update to share.</p><a href={WHATSAPP} target="_blank" rel="noreferrer">Share a question <MessageCircle /></a></div></section>
  </>;
}

function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [error, setError] = useState('');
  const submit = (event) => {
    event.preventDefault();
    if (form.name.trim().length < 2 || form.phone.trim().length < 10 || form.message.trim().length < 5) { setError('Please add your name, phone number and a short message.'); return; }
    const text = [`Hello Cafe Pachmarhi,`, `Name: ${form.name.trim()}`, `Phone: ${form.phone.trim()}`, `Message: ${form.message.trim()}`].join('\n');
    window.open(`${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };
  return <>
    <section className="contact-mast"><div className="container contact-mast-grid"><div><p className="eyebrow">Contact Cafe Pachmarhi</p><span className="page-number">08 / 08</span><h1>Let’s make the plan <em>simple.</em></h1><p>Call, WhatsApp or open the official Google Maps destination to plan your visit to Cafe Pachmarhi.</p></div><div className="contact-mast-card"><MapPin /><span>PACHMARHI</span><b>Ready when you are.</b><a href={MAPS} target="_blank" rel="noreferrer">Open directions <ArrowUpRight /></a></div></div></section>
    <section className="contact-actions container"><a href={PHONE_HREF}><span><Phone /></span><div><small>Call Cafe Pachmarhi</small><b>{PHONE}</b></div><ArrowUpRight /></a><a href={WHATSAPP} target="_blank" rel="noreferrer"><span><MessageCircle /></span><div><small>Message directly</small><b>WhatsApp the cafe</b></div><ArrowUpRight /></a><a href={MAPS} target="_blank" rel="noreferrer"><span><MapPin /></span><div><small>Find the cafe</small><b>Google Maps</b></div><ArrowUpRight /></a></section>
    <section className="contact-conversation section container"><div className="contact-copy"><p className="eyebrow">Start a conversation</p><h2>Your message goes <em>straight to WhatsApp.</em></h2><p>We do not store your enquiry on this website. Once you continue, WhatsApp opens so you can confirm the message directly with Cafe Pachmarhi.</p><div className="contact-photo"><Image src="/cafe-pachmarhi/cafe-03.jpg" alt="Cafe Pachmarhi entrance" fill sizes="(max-width: 800px) 100vw, 42vw" /></div></div><form className="contact-page-form" onSubmit={submit} noValidate><p className="eyebrow">Visit enquiry</p><label>Your name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your name" /></label><label>Phone number<input inputMode="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="Your phone number" /></label><label>Your message<textarea rows="5" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="How can Cafe Pachmarhi help?" /></label>{error && <small>{error}</small>}<button className="button button-primary" type="submit">Continue to WhatsApp <Send /></button></form></section>
  </>;
}

function Content({ page }) {
  if (page === 'about') return <AboutPage />;
  if (page === 'menu') return <MenuPage />;
  if (page === 'featured') return <FeaturedPage />;
  if (page === 'offers') return <OffersPage />;
  if (page === 'gallery') return <GalleryPage />;
  if (page === 'reviews') return <ReviewsPage />;
  if (page === 'blog') return <BlogPage />;
  return <ContactPage />;
}

export default function SecondaryPage({ page }) {
  return <main className={`secondary-page page-${page}`}><PageHeader page={page} /><Content page={page} /><PageFooter /><FloatingActions /></main>;
}
