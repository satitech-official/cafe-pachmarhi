'use client';
/* eslint-disable @next/next/no-html-link-for-pages -- Direct document links keep navigation reliable in the hosted runtime. */

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Coffee,
  ExternalLink,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Search,
  Sparkles,
  X,
} from 'lucide-react';

const PHONE = '+91 62329 53430';
const PHONE_HREF = 'tel:+916232953430';
const WHATSAPP = 'https://wa.me/916232953430';
const MAPS = 'https://maps.app.goo.gl/XgJQ4wM6gzj3ptnY8';

const nav = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '/about' },
  { label: 'Menu', href: '/menu' },
  { label: 'Signature', href: '/featured' },
  { label: 'Offers', href: '/offers' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const menuCategories = [
  { name: 'Coffee', note: 'Ask the cafe for today’s coffee selection.' },
  { name: 'Tea', note: 'Ask the cafe for today’s tea selection.' },
  { name: 'Momos', note: 'Ask the cafe for current momos availability.' },
  { name: 'Burgers', note: 'Ask the cafe for current burger availability.' },
  { name: 'Drinks', note: 'Ask the cafe for current drinks availability.' },
  { name: 'Dessert', note: 'Ask the cafe for today’s desserts.' },
  { name: 'South Indian', note: 'Ask the cafe for current South Indian options.' },
  { name: 'Chinese', note: 'Ask the cafe for current Chinese options.' },
  { name: 'North Indian', note: 'Ask the cafe for current North Indian options.' },
  { name: 'Paratha', note: 'Ask the cafe for current paratha options.' },
];

const gallery = [
  { src: '/cafe-pachmarhi/cafe-03.jpg', title: 'The storefront', category: 'Exterior' },
  { src: '/cafe-pachmarhi/cafe-01.jpg', title: 'A place to settle in', category: 'Cafe' },
  { src: '/cafe-pachmarhi/hero.jpg', title: 'Tables & conversations', category: 'Cafe' },
  { src: '/cafe-pachmarhi/cafe-04.jpg', title: 'Warmly lit evenings', category: 'Exterior' },
  { src: '/cafe-pachmarhi/cafe-05.jpg', title: 'A welcoming start', category: 'Cafe' },
];

const formSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.'),
  phone: z.string().trim().min(10, 'Please enter a valid phone number.'),
  email: z.union([z.string().trim().email('Please enter a valid email.'), z.literal('')]),
  message: z.string().trim().min(8, 'Please add a short message.'),
});

function CafeMark({ light = false }) {
  return (
    <a className={`brand ${light ? 'brand-light' : ''}`} href="/" aria-label="Cafe Pachmarhi home">
      <span className="brand-mark"><Coffee size={17} strokeWidth={2.4} /></span>
      <span><b>Cafe</b> Pachmarhi</span>
    </a>
  );
}

function ButtonLink({ children, href, variant = 'primary', icon = true, className = '' }) {
  return <a className={`button button-${variant} ${className}`} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}>{children}{icon && <ArrowUpRight />}</a>;
}

function SectionIntro({ eyebrow, title, body, align = '' }) {
  return <div className={`section-intro ${align}`}>
    <p className="eyebrow">{eyebrow}</p>
    <h2>{title}</h2>
    {body && <p className="section-copy">{body}</p>}
  </div>;
}

export default function CafePachmarhiSite() {
  const rootRef = useRef(null);
  const [loader, setLoader] = useState(true);
  const [drawer, setDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cursor, setCursor] = useState({ x: -80, y: -80, active: false });
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryFilter, setGalleryFilter] = useState('All');

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timeout = window.setTimeout(() => setLoader(false), reduced ? 0 : 1050);
    const onScroll = () => {
      const top = window.scrollY;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(top > 24);
      setProgress(scrollable > 0 ? (top / scrollable) * 100 : 0);
    };
    const onMove = (event) => setCursor({ x: event.clientX, y: event.clientY, active: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMove);
    onScroll();
    return () => { window.clearTimeout(timeout); window.removeEventListener('scroll', onScroll); window.removeEventListener('mousemove', onMove); };
  }, []);

  useEffect(() => {
    if (drawer) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [drawer]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') { setDrawer(false); setSelectedImage(null); setSelectedMenu(null); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !rootRef.current) return undefined;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((element) => {
        gsap.fromTo(element, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.75, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 84%', once: true } });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const visibleMenu = useMemo(() => menuCategories.filter((item) => (activeCategory === 'All' || activeCategory === item.name) && item.name.toLowerCase().includes(search.toLowerCase())), [activeCategory, search]);
  const visibleGallery = gallery.filter((item) => galleryFilter === 'All' || item.category === galleryFilter);
  const menuFilters = ['All', ...menuCategories.map((item) => item.name)];
  const galleryFilters = ['All', ...new Set(gallery.map((item) => item.category))];

  return (
    <main ref={rootRef} className="site-shell" id="home">
      <div className="scroll-progress" style={{ transform: `scaleX(${progress / 100})` }} />
      <div className="custom-cursor" style={{ transform: `translate(${cursor.x}px, ${cursor.y}px) scale(${cursor.active ? 1 : 0})` }} aria-hidden="true"><span /></div>

      <AnimatePresence>
        {loader && <motion.div className="loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
          <motion.div className="loader-card" animate={{ y: [0, -5, 0], rotate: [-1, 1, -1] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>
            <CafeMark />
            <p>Brewing your Pachmarhi experience</p>
            <span className="loader-bar"><i /></span>
          </motion.div>
        </motion.div>}
      </AnimatePresence>

      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <CafeMark light={!scrolled} />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="header-actions">
          <a className="header-call" href={PHONE_HREF}><Phone size={15} /><span>Call / Reserve</span></a>
          <button className="menu-toggle" aria-label="Open navigation" aria-expanded={drawer} onClick={() => setDrawer(true)}><Menu /></button>
        </div>
      </header>

      <AnimatePresence>
        {drawer && <motion.aside className="mobile-drawer-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="mobile-drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', ease: 'easeOut', duration: 0.34 }}>
            <div className="drawer-top"><CafeMark /><button aria-label="Close navigation" onClick={() => setDrawer(false)}><X /></button></div>
            <nav aria-label="Mobile navigation">{nav.map((item, index) => <motion.div key={item.label} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.07 + index * 0.04 }}><a href={item.href} onClick={() => setDrawer(false)}>{item.label}<ArrowRight /></a></motion.div>)}</nav>
            <a className="drawer-call" href={PHONE_HREF}><Phone /> Call Cafe Pachmarhi</a>
          </motion.div>
        </motion.aside>}
      </AnimatePresence>

      <section className="hero" aria-labelledby="hero-title">
        <Image className="hero-image" src="/cafe-pachmarhi/cafe-04.jpg" alt="Cafe Pachmarhi illuminated storefront in the evening" fill priority sizes="100vw" />
        <div className="hero-scrim" />
        <div className="hero-content container">
          <motion.p className="eyebrow hero-eyebrow" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }}>Cafe Pachmarhi · Madhya Pradesh</motion.p>
          <motion.h1 id="hero-title" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.12, duration: 0.6 }}>Experience cafe culture in the <em>heart of Pachmarhi.</em></motion.h1>
          <motion.p className="hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>Good food, refreshing drinks and relaxed conversations surrounded by the charm of Pachmarhi.</motion.p>
          <motion.div className="hero-buttons" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.28 }}>
            <a className="button button-primary" href="/menu">Explore menu <ArrowDownRight /></a>
            <ButtonLink href={PHONE_HREF} variant="light">Call us</ButtonLink>
            <ButtonLink href={MAPS} variant="outline">Directions</ButtonLink>
          </motion.div>
          <motion.div className="hero-pills" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.42 }}>
            <span><Leaf /> A Single Use Plastic Free Zone</span><span><MapPin /> Pachmarhi, Madhya Pradesh</span>
          </motion.div>
        </div>
        <a className="hero-scroll" href="#welcome"><span>Scroll to explore</span><ChevronDown /></a>
      </section>

      <section className="welcome section container" id="welcome">
        <div className="welcome-copy reveal"><SectionIntro eyebrow="Welcome" title="Welcome to Cafe Pachmarhi." body="A relaxed cafe stop for a refreshing break, a good meal and unhurried conversations in Pachmarhi. Come in, settle down and make a little more room in the day for the moment." /><a className="text-link" href="/about">Discover our story <ArrowRight /></a></div>
        <div className="photo-stack reveal" aria-label="Cafe Pachmarhi seating and evening ambience">
          <figure className="stack-image image-a"><Image src="/cafe-pachmarhi/cafe-01.jpg" alt="Seating and counter inside Cafe Pachmarhi" fill sizes="(max-width: 800px) 80vw, 35vw" /></figure>
          <figure className="stack-image image-b"><Image src="/cafe-pachmarhi/hero.jpg" alt="Cafe Pachmarhi tables and evening seating" fill sizes="(max-width: 800px) 52vw, 20vw" /></figure>
          <span className="photo-note"><Sparkles />Warm welcomes,<br />Pachmarhi pace.</span>
        </div>
      </section>

      <section className="category-ribbon container reveal" aria-label="Cafe Pachmarhi highlights">
        {[['01', 'Pachmarhi café experience'], ['02', 'Food & refreshments'], ['03', 'Relaxed seating'], ['04', 'Plastic-free identity']].map(([number, text]) => <div key={number}><b>{number}</b><span>{text}</span><ArrowUpRight /></div>)}
      </section>

      <section className="menu-section section" id="menu">
        <div className="container">
          <div className="menu-heading reveal"><SectionIntro eyebrow="Menu at a glance" title="Made for every kind of cafe break." body="These menu categories are visible at Cafe Pachmarhi. For dishes, prices and today’s availability, please call or message the cafe directly." /><a className="text-link" href="/menu">View menu guide <ArrowRight /></a></div>
          <div className="menu-controls reveal"><div className="search-wrap"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the menu" aria-label="Search the menu categories" /></div><span>Current selection</span></div>
          <div className="filter-row reveal" role="tablist" aria-label="Menu categories">{menuFilters.map((filter) => <button key={filter} className={activeCategory === filter ? 'active' : ''} onClick={() => setActiveCategory(filter)} role="tab" aria-selected={activeCategory === filter}>{filter}</button>)}</div>
          <div className="menu-grid">{visibleMenu.map((item, index) => <motion.article className="menu-card" key={item.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }}><div><span className="menu-index">{String(index + 1).padStart(2, '0')}</span><Coffee /><h3>{item.name}</h3><p>{item.note}</p></div><button aria-label={`Open ${item.name} availability card`} onClick={() => setSelectedMenu(item)}>Ask availability <ArrowRight /></button></motion.article>)}</div>
          {!visibleMenu.length && <div className="empty-state">Nothing matches that search. Try another menu category, or contact the cafe for today’s selection.</div>}
        </div>
      </section>

      <section className="feature-band">
        <div className="container feature-band-inner reveal"><div><p className="eyebrow">Featured from the cafe</p><h2>Come for the food.<br /><em>Stay for the feeling.</em></h2></div><div className="feature-band-copy"><p>From a quick coffee break to a meal with friends, Cafe Pachmarhi brings together food, drinks and a comfortable atmosphere without claiming a menu item before it’s confirmed.</p><a href={WHATSAPP} target="_blank" rel="noreferrer" className="text-link light-link">Ask on WhatsApp <MessageCircle /></a></div></div>
      </section>

      <section className="experience section container">
        <div className="experience-image reveal"><Image src="/cafe-pachmarhi/hero.jpg" alt="Guests seated at Cafe Pachmarhi in the evening" fill sizes="(max-width: 800px) 100vw, 50vw" /><span className="image-caption"><b>Slow down.</b> There’s time for another conversation.</span></div>
        <div className="experience-copy reveal"><SectionIntro eyebrow="The Cafe Pachmarhi experience" title="More than just a quick cafe stop." body="Pachmarhi brings people to pause. Cafe Pachmarhi gives them a place to do exactly that—over a meal, a drink, or an easy catch-up before the next part of the day." /><ul className="experience-list">{['Friends & conversations', 'Family time', 'A travel break', 'Coffee & food'].map((item) => <li key={item}><span>{item}</span><ArrowUpRight /></li>)}</ul></div>
      </section>

      <section className="sustainability section" id="sustainability">
        <div className="sustainability-orb orb-one" /><div className="sustainability-orb orb-two" />
        <div className="container sustainability-inner reveal"><div className="sustainability-icon"><Leaf /></div><SectionIntro eyebrow="Responsible cafe culture" title="A Single Use Plastic Free Zone." body="Cafe Pachmarhi presents its plastic-free-zone identity as part of a more responsible cafe experience—because enjoying Pachmarhi and caring for its surroundings should go together." /><ButtonLink href={MAPS} variant="primary">Visit Cafe Pachmarhi</ButtonLink></div>
      </section>

      <section className="offers-section section container">
        <div className="offers-card reveal"><div><p className="eyebrow">What’s happening</p><h2>Ask about today’s specials.</h2><p>We don’t publish unverified discounts or time-sensitive offers. The cafe can share what’s available today.</p></div><a className="offer-cta" href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle /><span>WhatsApp Cafe Pachmarhi</span><ArrowUpRight /></a></div>
      </section>

      <section className="gallery-section section" id="gallery">
        <div className="container"><div className="gallery-heading reveal"><SectionIntro eyebrow="Gallery" title="Moments from Cafe Pachmarhi." body="A glimpse of the cafe’s real setting, from its warmly lit evenings to its open, easy-going seating." /><a className="text-link" href="/gallery">Open full gallery <ArrowRight /></a></div><div className="filter-row gallery-filter reveal">{galleryFilters.map((filter) => <button key={filter} onClick={() => setGalleryFilter(filter)} className={galleryFilter === filter ? 'active' : ''}>{filter}</button>)}</div><div className="gallery-grid">{visibleGallery.map((item, index) => <motion.button className={`gallery-item gallery-item-${index + 1}`} key={item.src} onClick={() => setSelectedImage(item)} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><Image src={item.src} alt={item.title} fill sizes="(max-width: 640px) 100vw, (max-width: 950px) 50vw, 33vw" /><span className="gallery-overlay"><span><small>{item.category}</small><b>{item.title}</b></span><span className="gallery-plus">+</span></span></motion.button>)}</div><div className="gallery-mobile-carousel"><Swiper modules={[Pagination]} slidesPerView={1.12} spaceBetween={14} pagination={{ clickable: true }}>{visibleGallery.map((item) => <SwiperSlide key={item.src}><button className="mobile-slide" onClick={() => setSelectedImage(item)}><Image src={item.src} alt={item.title} fill sizes="92vw" /><span><small>{item.category}</small><b>{item.title}</b></span></button></SwiperSlide>)}</Swiper></div></div>
      </section>

      <section className="review-section">
        <div className="container review-inner reveal"><div><p className="eyebrow">Guest notes</p><h2>Real feedback deserves<br />a real source.</h2></div><div><p>We haven’t added a review carousel because verified, publishable customer reviews were not supplied. When Cafe Pachmarhi approves a source, genuine feedback can appear here with clear attribution.</p><a href="/reviews" className="text-link light-link">Our reviews approach <ArrowRight /></a></div></div>
      </section>

      <section className="visit-section section container" id="visit">
        <div className="visit-panel reveal"><Image src="/cafe-pachmarhi/cafe-03.jpg" alt="Cafe Pachmarhi storefront" fill sizes="100vw" /><div className="visit-overlay" /><div className="visit-content"><p className="eyebrow">Planning to visit?</p><h2>Find your way to<br />Cafe Pachmarhi.</h2><p>Call Cafe Pachmarhi or get directions to plan your visit.</p><div className="hero-buttons"><ButtonLink href={PHONE_HREF} variant="light">Call cafe</ButtonLink><ButtonLink href={WHATSAPP} variant="outline">WhatsApp</ButtonLink><ButtonLink href={MAPS} variant="outline">Directions</ButtonLink></div></div></div>
      </section>

      <section className="faq-contact section container" id="contact">
        <div className="faq-block reveal"><SectionIntro eyebrow="Questions, answered" title="Before you visit." /><details open><summary>Where is Cafe Pachmarhi located?<ChevronDown /></summary><p>Use the official Google Maps destination to find Cafe Pachmarhi in Pachmarhi.</p><a href={MAPS} target="_blank" rel="noreferrer">Open in Google Maps <ExternalLink /></a></details><details><summary>How can I contact Cafe Pachmarhi?<ChevronDown /></summary><p>Call Cafe Pachmarhi directly at {PHONE}.</p><a href={PHONE_HREF}>Call now <Phone /></a></details><details><summary>Is Cafe Pachmarhi a plastic-free cafe?<ChevronDown /></summary><p>Cafe Pachmarhi identifies itself as “A Single Use Plastic Free Zone.”</p></details></div>
        <EnquiryForm />
      </section>

      <footer className="site-footer"><div className="container footer-grid"><div><CafeMark light /><p>A Single Use Plastic Free Zone</p><p className="footer-note">Good food. Great conversations. Less plastic.</p></div><div className="footer-links"><span>Explore</span><a href="/about">About</a><a href="/menu">Menu</a><a href="/gallery">Gallery</a><a href="/contact">Contact</a></div><div className="footer-links"><span>Find us</span><a href={PHONE_HREF}>{PHONE}</a><a href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp</a><a href={MAPS} target="_blank" rel="noreferrer">Google Maps</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Cafe Pachmarhi</span><span>Pachmarhi, Madhya Pradesh</span></div></footer>

      <div className="floating-actions"><a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="WhatsApp Cafe Pachmarhi"><MessageCircle /></a><a href={PHONE_HREF} aria-label="Call Cafe Pachmarhi"><Phone /></a><a href={MAPS} target="_blank" rel="noreferrer" aria-label="Get directions to Cafe Pachmarhi"><MapPin /></a></div>

      <AnimatePresence>{selectedMenu && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setSelectedMenu(null)}><motion.article className="menu-modal" initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.98 }} onMouseDown={(event) => event.stopPropagation()}><button className="close-modal" aria-label="Close menu detail" onClick={() => setSelectedMenu(null)}><X /></button><Coffee className="modal-icon" /><p className="eyebrow">Cafe Pachmarhi menu</p><h2>{selectedMenu.name}</h2><p>{selectedMenu.note} Prices and exact dishes are confirmed directly by the cafe.</p><div className="modal-buttons"><ButtonLink href={PHONE_HREF}>Call to ask</ButtonLink><ButtonLink href={WHATSAPP} variant="outline">WhatsApp</ButtonLink></div></motion.article></motion.div>}</AnimatePresence>
      <AnimatePresence>{selectedImage && <motion.div className="modal-backdrop image-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setSelectedImage(null)}><motion.div className="lightbox" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} onMouseDown={(event) => event.stopPropagation()}><button className="close-modal" aria-label="Close gallery image" onClick={() => setSelectedImage(null)}><X /></button><div className="lightbox-image"><Image src={selectedImage.src} alt={selectedImage.title} fill sizes="90vw" /></div><div><p className="eyebrow">{selectedImage.category}</p><h2>{selectedImage.title}</h2></div></motion.div></motion.div>}</AnimatePresence>
    </main>
  );
}

function EnquiryForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(formSchema), defaultValues: { name: '', phone: '', email: '', message: '' } });
  const submit = (values) => {
    const lines = [`Hello Cafe Pachmarhi,`, `Name: ${values.name}`, `Phone: ${values.phone}`, values.email ? `Email: ${values.email}` : '', `Message: ${values.message}`].filter(Boolean).join('\n');
    window.open(`${WHATSAPP}?text=${encodeURIComponent(lines)}`, '_blank', 'noopener,noreferrer');
  };
  return <div className="contact-form reveal"><p className="eyebrow">Visit enquiry</p><h2>Start a conversation.</h2><p>Your message opens in WhatsApp so the cafe can respond directly. It is not sent until you confirm it there.</p><form onSubmit={handleSubmit(submit)} noValidate><label>Name<input {...register('name')} placeholder="Your name" />{errors.name && <small>{errors.name.message}</small>}</label><label>Phone<input {...register('phone')} inputMode="tel" placeholder="Your phone number" />{errors.phone && <small>{errors.phone.message}</small>}</label><label>Email <em>optional</em><input {...register('email')} inputMode="email" placeholder="Email address" />{errors.email && <small>{errors.email.message}</small>}</label><label>Message<textarea {...register('message')} placeholder="How can Cafe Pachmarhi help?" rows="4" />{errors.message && <small>{errors.message.message}</small>}</label><button className="button button-primary" type="submit" disabled={isSubmitting}>Continue to WhatsApp <MessageCircle /></button></form></div>;
}
