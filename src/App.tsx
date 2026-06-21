import { useState, useEffect, useRef, Fragment } from 'react';
import { motion, useInView, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, ChevronLeft, ChevronRight, Menu, X, Star, ArrowRight, Sparkles, Award, ShieldCheck, UserCheck, Check } from 'lucide-react';
import heroImage from './assets/hero.png';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-2.5 mx-auto" aria-hidden="true">
      <span className="block h-px w-10 bg-gradient-to-r from-transparent to-gold/60" />
      <span className="block w-1.5 h-1.5 rotate-45 bg-gold-gradient" />
      <span className="block h-[3px] w-16 rounded-full bg-gold-gradient" />
      <span className="block w-1.5 h-1.5 rotate-45 bg-gold-gradient" />
      <span className="block h-px w-10 bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  );
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Process', href: '#process' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const linkColorClass = isScrolled
    ? 'text-charcoal/80 hover:text-gold'
    : 'text-white hover:text-gold-light hero-text-shadow';

  const logoColorClass = isScrolled ? 'text-charcoal' : 'text-white hero-text-shadow';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass-effect shadow-luxury' : 'bg-transparent'
      }`}
    >
      <div className="container-padding max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-20 md:h-24">
          <a
            href="#home"
            className={`flex items-center gap-2 font-serif text-2xl md:text-3xl tracking-wide transition-colors ${logoColorClass}`}
          >
            <span className="gold-gradient-text text-3xl md:text-4xl">&#10038;</span> Velora
          </a>

          <div className="hidden lg:flex items-center flex-1 justify-evenly mx-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`nav-link text-sm tracking-wide ${linkColorClass}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <a href="#contact" className="hidden lg:inline-block btn-gold-cta shrink-0">
            Book Now
          </a>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${isScrolled ? 'text-charcoal' : 'text-white hero-text-shadow'}`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-effect border-t border-gold/15"
          >
            <div className="container-padding py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm tracking-wide text-charcoal/80 hover:text-charcoal py-2"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-gold-cta text-center mt-2"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: shouldReduceMotion ? '0%' : parallaxY }}
          className="absolute -top-[10%] left-0 right-0 h-[120%] will-change-transform"
        >
          <img
            src={heroImage}
            alt="Luxury spa treatment room"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0)_22%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-10 md:h-12 bg-gradient-to-b from-transparent to-cream" />
      </div>

      <div className="relative z-10 text-center container-padding max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: 'easeOut' }}
        >
          <span className="gold-gradient-text hero-text-shadow text-2xl">&#10038;</span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-off-white mt-4 mb-6 font-light">
            Beauty, <em className="italic gold-gradient-text">Elevated</em>
          </h1>
          <GoldDivider />
          <p className="text-lg md:text-xl text-off-white/90 mt-6 mb-10 font-light tracking-wide">
            Where medical precision meets aesthetic artistry
          </p>
          <a href="#services" className="btn-outline-gold inline-block border-off-white/50 text-off-white hover:bg-gold hover:text-off-white hover:border-gold">
            Explore Treatments
          </a>
        </motion.div>
      </div>
    </section>
  );
}

type Service = {
  num: string;
  title: string;
  tagline?: string;
  desc: string;
  duration: string;
  price: string;
  image: string;
  alt: string;
  cta: string;
  highlights?: string[];
  bestFor?: string;
  benefits?: string[];
};

const services: Service[] = [
  {
    num: '01',
    title: 'Signature Facial',
    tagline: 'Most Requested',
    desc: 'Our bespoke facial ritual unfolds over a luxurious session — deep cleansing, gentle extractions, and layered nourishing serums tailored to your skin, finishing with a luminous, deeply hydrated glow you can feel for weeks.',
    duration: '75 min',
    price: 'From $250',
    image: 'https://images.pexels.com/photos/37229301/pexels-photo-37229301.jpeg?auto=compress&cs=tinysrgb&w=1000&q=80',
    alt: 'Woman receiving a soothing luxury facial treatment at the spa',
    cta: 'Reserve This Ritual',
    highlights: [
      'Deep cleansing & gentle exfoliation',
      'Customized serum infusion',
      'Relaxing facial & lymphatic massage',
      'Luminous, deeply hydrated finish',
    ],
    bestFor: 'Dull, dehydrated, or stressed skin',
    benefits: ['Visible glow', 'Zero downtime', 'Results last weeks'],
  },
  {
    num: '02',
    title: 'Botox',
    desc: 'Smooth fine lines and wrinkles with precision-administered neurotoxin treatments for a refreshed, naturally youthful expression.',
    duration: '30 min',
    price: 'From $350',
    image: 'https://images.pexels.com/photos/7581590/pexels-photo-7581590.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
    alt: 'Close-up of a cosmetic forehead injection procedure',
    cta: 'Reserve Your Session',
  },
  {
    num: '03',
    title: 'Dermal Fillers',
    desc: 'Restore volume and refine contour with premium hyaluronic acid fillers for soft, natural-looking enhancement.',
    duration: '45 min',
    price: 'From $600',
    image: 'https://images.pexels.com/photos/7446681/pexels-photo-7446681.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
    alt: 'Aesthetician performing a lip filler treatment on a relaxed client',
    cta: 'Book Appointment',
  },
  {
    num: '04',
    title: 'Microneedling',
    desc: 'Stimulate collagen production with advanced microneedling for smoother, firmer, more even skin texture.',
    duration: '60 min',
    price: 'From $400',
    image: 'https://images.pexels.com/photos/29648626/pexels-photo-29648626.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
    alt: 'Woman receiving a professional microneedling facial treatment',
    cta: 'Schedule Now',
  },
  {
    num: '05',
    title: 'Laser Resurfacing',
    desc: 'Rejuvenate your complexion with state-of-the-art fractional laser technology for visibly dramatic, lasting results.',
    duration: '90 min',
    price: 'From $800',
    image: 'https://images.pexels.com/photos/3985356/pexels-photo-3985356.jpeg?auto=compress&cs=tinysrgb&w=900&q=80',
    alt: 'Cosmetologist performing a laser resurfacing treatment on a client wearing safety glasses',
    cta: 'Book Consultation',
  },
  {
    num: '06',
    title: 'Skin Rejuvenation',
    desc: 'Advanced IPL and LED therapies target pigmentation, redness, and dullness to restore radiant, vital skin.',
    duration: '60 min',
    price: 'From $300',
    image: 'https://images.pexels.com/photos/3762756/pexels-photo-3762756.jpeg?auto=compress&cs=tinysrgb&w=900&q=80',
    alt: 'Woman with radiant, glowing rejuvenated skin',
    cta: 'Begin Your Journey',
  },
];

function BookLink({ label = 'Book Consultation' }: { label?: string }) {
  return (
    <a
      href="#contact"
      className="group/link mt-auto inline-flex items-center gap-2 text-sm uppercase tracking-ultrawide font-medium text-gold hover:text-gold-deep transition-colors"
    >
      {label}
      <ArrowRight
        size={15}
        className="transition-transform duration-300 will-change-transform group-hover/link:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/link:translate-x-0"
      />
    </a>
  );
}

function FeaturedServiceCard({ service }: { service: typeof services[0] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: 'easeOut' }}
      className="card-luxury group cursor-pointer overflow-hidden flex flex-col lg:flex-row will-change-transform"
    >
      <div className="relative lg:w-1/2 overflow-hidden">
        <img
          src={service.image}
          alt={service.alt}
          loading="lazy"
          className="w-full h-72 sm:h-80 lg:h-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <span className="absolute top-5 left-5 inline-flex items-center gap-2 bg-charcoal/90 text-off-white text-xs uppercase tracking-ultrawide font-medium py-2 px-4 rounded-sm border border-gold/40">
          <span className="gold-gradient-text">&#10038;</span> {service.tagline}
        </span>
      </div>

      <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-off-white to-champagne/50 lg:border-l lg:border-gold/20">
        <div className="flex items-center gap-4 mb-4">
          <span className="gold-gradient-text font-serif text-3xl leading-none">{service.num}</span>
          <span className="h-px flex-1 bg-gold-gradient" />
        </div>
        <h3 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">{service.title}</h3>
        <p className="text-stone font-light leading-relaxed mb-6 max-w-md">{service.desc}</p>
        <div className="flex items-center gap-6 text-sm mb-6">
          <span className="inline-flex items-center gap-2 text-stone">
            <Clock size={16} className="text-gold" /> {service.duration}
          </span>
          <span className="w-px h-4 bg-gold/40" />
          <span className="font-medium text-charcoal">{service.price}</span>
        </div>

        {service.highlights && (
          <div className="border-t border-gold/25 pt-6 mb-6">
            <p className="section-eyebrow mb-4">Treatment Highlights</p>
            <ul className="space-y-2.5 max-w-md">
              {service.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-charcoal/80">
                  <Check size={16} strokeWidth={2.5} className="text-gold mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {service.bestFor && (
          <p className="text-sm text-stone mb-5">
            <span className="gold-gradient-text font-medium uppercase tracking-wide text-xs">Best for</span>
            <span className="mx-2 text-gold/50">—</span>
            {service.bestFor}
          </p>
        )}

        {service.benefits && (
          <div className="flex flex-wrap gap-2 mb-5">
            {service.benefits.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-charcoal/80 border border-gold/35 rounded-full py-1.5 px-3 bg-off-white/70"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold-gradient" />
                {b}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2.5 text-sm text-stone mb-6">
          <ShieldCheck size={16} strokeWidth={1.75} className="text-gold shrink-0" />
          <span>Performed by our board-certified aesthetic specialists</span>
        </div>

        <div className="border-t border-gold/25 pt-6">
          <BookLink label={service.cta} />
        </div>
      </div>
    </motion.div>
  );
}

function ServiceCard({ service, index, wide = false }: { service: typeof services[0]; index: number; wide?: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.6,
        delay: shouldReduceMotion ? 0 : 0.1 + index * 0.1,
        ease: 'easeOut',
      }}
      className="card-luxury group cursor-pointer flex flex-col overflow-hidden will-change-transform"
    >
      <div className="relative overflow-hidden">
        <img
          src={service.image}
          alt={service.alt}
          loading="lazy"
          className={`w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${
            wide ? 'h-64 lg:h-72' : 'h-56'
          }`}
        />
        <span className="absolute top-4 left-4 font-serif text-2xl gold-gradient-text drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
          {service.num}
        </span>
        <span className="absolute top-4 right-4 gold-gradient-text text-sm drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">&#10038;</span>
      </div>
      <div className="p-7 flex flex-col flex-1">
        <h3 className="font-serif text-2xl text-charcoal mb-2">{service.title}</h3>
        <span className="block w-10 h-px bg-gold-gradient mb-4" />
        <p className="text-stone font-light text-sm leading-relaxed mb-5">{service.desc}</p>
        <div className="flex items-center justify-between text-sm mb-6">
          <span className="inline-flex items-center gap-2 text-stone">
            <Clock size={15} className="text-gold" /> {service.duration}
          </span>
          <span className="font-medium text-charcoal">{service.price}</span>
        </div>
        <BookLink label={service.cta} />
      </div>
    </motion.div>
  );
}

const trustStats = [
  { icon: Sparkles, primary: '6 Treatments', caption: 'Signature & curated' },
  { icon: Award, primary: 'Board-Certified', caption: 'Expert specialists' },
  { icon: ShieldCheck, primary: 'FDA-Approved', caption: 'Medical technology' },
  { icon: UserCheck, primary: 'Personalized', caption: 'Bespoke plans' },
];

function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const shouldReduceMotion = useReducedMotion();

  const [featured, ...rest] = services;
  const trio = rest.slice(0, 3);
  const pair = rest.slice(3);

  return (
    <section id="services" className="pt-8 md:pt-12 pb-24 md:pb-32 lg:pb-40 bg-cream">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
          className="text-center mb-12 md:mb-14"
        >
          <span className="gold-gradient-text text-xl">&#10038;</span>
          <p className="section-eyebrow mt-3">What We Offer</p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal mt-2 mb-4 font-normal">
            Our <em className="italic gold-gradient-text">Treatments</em>
          </h2>
          <GoldDivider />
          <p className="text-stone font-light leading-relaxed max-w-2xl mx-auto mt-6">
            At Velora, every treatment begins with intention. Our specialists pair medical precision
            with an artist's eye — designing each protocol around your unique anatomy, goals, and skin.
            The result is refined, natural, and unmistakably you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.2 }}
          className="max-w-4xl mx-auto mb-16 md:mb-20 border-y border-gold/25 py-8"
        >
          <div className="flex flex-wrap items-center justify-center gap-y-8">
            {trustStats.map((stat, i) => (
              <Fragment key={stat.primary}>
                <div className="flex flex-col items-center text-center gap-2 px-6 sm:px-8 basis-1/2 sm:basis-0 sm:flex-1">
                  <stat.icon size={24} strokeWidth={1.5} className="text-gold" />
                  <span className="font-serif text-lg md:text-xl text-charcoal leading-tight">
                    {stat.primary}
                  </span>
                  <span className="text-[11px] uppercase tracking-ultrawide text-stone">
                    {stat.caption}
                  </span>
                </div>
                {i < trustStats.length - 1 && (
                  <span className="hidden sm:block w-px h-12 bg-gold/30" aria-hidden="true" />
                )}
              </Fragment>
            ))}
          </div>
        </motion.div>

        <div className="space-y-8 lg:space-y-10">
          <FeaturedServiceCard service={featured} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trio.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pair.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} wide />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const team = [
  {
    name: 'Dr. Sophia Chen',
    title: 'Medical Director',
    bio: 'Board-certified dermatologist with over 15 years specializing in aesthetic medicine.',
    image: 'https://images.pexels.com/photos/5452292/pexels-photo-5452292.jpeg?auto=compress&cs=tinysrgb&w=400&q=80',
  },
  {
    name: 'Marissa Delacroix',
    title: 'Lead Aesthetician',
    bio: 'Master aesthetician certified in advanced laser therapies and skin rejuvenation.',
    image: 'https://images.pexels.com/photos/5672401/pexels-photo-5672401.jpeg?auto=compress&cs=tinysrgb&w=400&q=80',
  },
  {
    name: 'Dr. James Morrison',
    title: 'Injection Specialist',
    bio: 'Expert injector specializing in facial anatomy and natural-looking enhancements.',
    image: 'https://images.pexels.com/photos/4173285/pexels-photo-4173285.jpeg?auto=compress&cs=tinysrgb&w=400&q=80',
  },
];

function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding bg-off-white">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="gold-gradient-text text-xl">&#10038;</span>
          <p className="section-eyebrow mt-3">Our Story</p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal mt-2 mb-4 font-normal">
            About <em className="italic gold-gradient-text">Velora</em>
          </h2>
          <GoldDivider />
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20"
        >
          <div className="relative">
            <div className="border border-gold/40 p-2 bg-off-white shadow-luxury inline-block">
              <img
                src="https://images.pexels.com/photos/16151060/pexels-photo-16151060.jpeg?auto=compress&cs=tinysrgb&w=900&q=80"
                alt="Velora's serene, warmly lit aesthetic treatment room with modern premium interior"
                loading="lazy"
                className="w-full h-80 md:h-96 object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 md:-right-10 bg-charcoal text-off-white py-4 px-6 rounded-sm shadow-luxury border border-gold/30">
              <span className="block text-2xl font-serif gold-gradient-text">Est.</span>
              <span className="text-3xl font-serif">2019</span>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-3xl text-charcoal mb-6 font-normal">
              Where Science Meets <em className="italic gold-gradient-text">Beauty</em>
            </h3>
            <p className="text-stone leading-relaxed mb-6">
              Founded in 2019, Velora emerged from a vision to create a sanctuary where advanced medical aesthetics
              blend seamlessly with the tranquility of a luxury spa. Our founders, recognizing the gap between
              clinical effectiveness and spa-like comfort, established Velora to offer both.
            </p>
            <p className="text-stone leading-relaxed mb-6">
              Today, we stand as a beacon of excellence in aesthetic medicine, having transformed thousands of
              lives through our personalized approach to beauty. Every treatment is a collaboration between our
              experts and you, ensuring results that enhance rather than alter your natural beauty.
            </p>
            <p className="text-stone leading-relaxed">
              Our commitment to safety, artistry, and individualized care has made us the trusted choice for
              discerning clients seeking the highest standard in aesthetic treatments.
            </p>
          </div>
        </motion.div>

        <div className="mt-24">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-serif text-2xl text-charcoal mb-12 text-center font-normal"
          >
            Meet <em className="italic gold-gradient-text">Our Team</em>
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="card-luxury text-center p-6"
              >
                <div className="w-32 h-32 mx-auto mb-5 rounded-full overflow-hidden border-2 border-gold/40">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-serif text-xl text-charcoal mb-1">{member.name}</h4>
                <p className="text-gold text-sm tracking-wide uppercase mb-3">{member.title}</p>
                <p className="text-stone text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    num: '01',
    title: 'Consultation',
    desc: 'Begin with a comprehensive assessment where we discuss your goals, analyze your skin, and create a personalized treatment roadmap.',
    icon: 'S',
  },
  {
    num: '02',
    title: 'Custom Plan',
    desc: 'Receive a tailored treatment plan designed specifically for your unique needs, timeline, and desired outcomes.',
    icon: 'P',
  },
  {
    num: '03',
    title: 'Treatment',
    desc: 'Experience your treatment in our serene, state-of-the-art facility administered by our expert practitioners.',
    icon: 'T',
  },
  {
    num: '04',
    title: 'Aftercare',
    desc: 'Enjoy dedicated follow-up care with personalized instructions and ongoing support for optimal, lasting results.',
    icon: 'A',
  },
];

function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="process" className="section-padding bg-champagne relative overflow-hidden">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="gold-gradient-text text-xl">&#10038;</span>
          <p className="section-eyebrow mt-3">How It Works</p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal mt-2 mb-4 font-normal">
            Your <em className="italic gold-gradient-text">Journey</em>
          </h2>
          <GoldDivider />
        </motion.div>

        <div ref={ref} className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gold-gradient -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="text-center"
              >
                <div className="relative inline-block mb-6">
                  <span className="font-serif text-7xl text-gold/25 absolute -top-2 -left-4">
                    {step.num}
                  </span>
                  <div className="w-20 h-20 rounded-full border border-gold/50 flex items-center justify-center bg-champagne relative z-10 shadow-luxury">
                    <span className="text-gold text-2xl font-serif">{step.icon}</span>
                  </div>
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-3">{step.title}</h3>
                <p className="text-stone text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: 'Alexandra M.',
    detail: 'Botox & Fillers',
    quote: "Velora has transformed my entire approach to skincare. Dr. Chen's expertise is unmatched, and the results speak for themselves. I've never felt more confident.",
    stars: 5,
  },
  {
    name: 'Rebecca T.',
    detail: 'Microneedling',
    quote: "After years of struggling with acne scars, the microneedling treatments at Velora have given me skin I finally love. The team's care and professionalism made all the difference.",
    stars: 5,
  },
  {
    name: 'Jennifer L.',
    detail: 'Signature Facial',
    quote: "Every visit to Velora feels like a true retreat. The Signature Facial is heavenly, and I always leave with a radiant glow. Simply the best spa experience I've ever had.",
    stars: 5,
  },
  {
    name: 'Megan K.',
    detail: 'Laser Resurfacing',
    quote: "The laser treatment results exceeded all my expectations. Dr. Morrison explained everything thoroughly and the aftercare was exceptional. My skin has never looked better.",
    stars: 5,
  },
];

function Testimonials() {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const next = () => setCurrent((p) => (p + 1) % testimonials.length);
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="section-padding bg-off-white">
      <div className="max-w-4xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="gold-gradient-text text-xl">&#10038;</span>
          <p className="section-eyebrow mt-3">Testimonials</p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal mt-2 mb-4 font-normal">
            Client <em className="italic gold-gradient-text">Stories</em>
          </h2>
          <GoldDivider />
        </motion.div>

        <div ref={ref} className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="card-luxury p-8 md:p-12 text-center relative"
            >
              <div className="decorative-corner top-4 left-4" />
              <div className="decorative-corner-tr top-4 right-4" />
              <div className="decorative-corner-bl bottom-4 left-4" />
              <div className="decorative-corner-br bottom-4 right-4" />

              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[current].stars }).map((_, i) => (
                  <Star key={i} size={18} className="text-gold fill-gold" />
                ))}
              </div>

              <blockquote className="font-serif text-xl md:text-2xl text-charcoal italic leading-relaxed mb-8">
                "{testimonials[current].quote}"
              </blockquote>

              <div className="divider-line mb-6 w-16 mx-auto" />

              <p className="text-charcoal font-medium">{testimonials[current].name}</p>
              <p className="text-gold text-sm tracking-wide">{testimonials[current].detail}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 border border-gold/40 flex items-center justify-center text-gold hover:bg-gold hover:text-off-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 border border-gold/40 flex items-center justify-center text-gold hover:bg-gold hover:text-off-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? 'bg-gold w-8' : 'bg-gold/30'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    treatment: '',
    date: '',
    time: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', phone: '', treatment: '', date: '', time: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="gold-gradient-text text-xl">&#10038;</span>
          <p className="section-eyebrow mt-3">Get In Touch</p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal mt-2 mb-4 font-normal">
            Book Your <em className="italic gold-gradient-text">Visit</em>
          </h2>
          <GoldDivider />
        </motion.div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="card-luxury p-8 md:p-10 relative">
              <div className="decorative-corner top-4 left-4" />
              <div className="decorative-corner-tr top-4 right-4" />
              <div className="decorative-corner-bl bottom-4 left-4" />
              <div className="decorative-corner-br bottom-4 right-4" />

              <h3 className="font-serif text-2xl text-charcoal mb-6">Request an Appointment</h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <span className="gold-gradient-text text-4xl block mb-4">&#10038;</span>
                  <p className="font-serif text-xl text-charcoal">Thank you!</p>
                  <p className="text-stone mt-2">We'll contact you shortly to confirm.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm text-charcoal mb-2">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gold/30 bg-off-white focus:border-gold focus:outline-none transition-colors text-charcoal"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm text-charcoal mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gold/30 bg-off-white focus:border-gold focus:outline-none transition-colors text-charcoal"
                    />
                  </div>
                  <div>
                    <label htmlFor="treatment" className="block text-sm text-charcoal mb-2">Treatment</label>
                    <select
                      id="treatment"
                      required
                      value={formData.treatment}
                      onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                      className="w-full px-4 py-3 border border-gold/30 bg-off-white focus:border-gold focus:outline-none transition-colors text-charcoal"
                    >
                      <option value="">Select a treatment</option>
                      {services.map((s) => (
                        <option key={s.title} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date" className="block text-sm text-charcoal mb-2">Preferred Date</label>
                      <input
                        type="date"
                        id="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 border border-gold/30 bg-off-white focus:border-gold focus:outline-none transition-colors text-charcoal"
                      />
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-sm text-charcoal mb-2">Preferred Time</label>
                      <select
                        id="time"
                        required
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-4 py-3 border border-gold/30 bg-off-white focus:border-gold focus:outline-none transition-colors text-charcoal"
                      >
                        <option value="">Select time</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="13:00">1:00 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="btn-solid-charcoal w-full mt-4">
                    Request Appointment
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center text-gold shrink-0">
                  <MapPin size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-charcoal font-medium mb-1">Visit Us</h4>
                  <p className="text-stone">428 Madison Avenue, Suite 1200</p>
                  <p className="text-stone">New York, NY 10022</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center text-gold shrink-0">
                  <Phone size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-charcoal font-medium mb-1">Call Us</h4>
                  <p className="text-stone">(212) 555-0147</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center text-gold shrink-0">
                  <Mail size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-charcoal font-medium mb-1">Email Us</h4>
                  <p className="text-stone">hello@velora-nyc.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center text-gold shrink-0">
                  <Clock size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-charcoal font-medium mb-1">Hours</h4>
                  <p className="text-stone">Monday – Friday: 9am – 7pm</p>
                  <p className="text-stone">Saturday: 10am – 5pm</p>
                  <p className="text-stone">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-charcoal py-16">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <a href="#home" className="font-serif text-xl text-off-white inline-flex items-center gap-2">
              <span className="gold-gradient-text">&#10038;</span> Velora
            </a>
            <p className="text-stone mt-4 text-sm leading-relaxed">
              Where medical precision meets aesthetic artistry. Transforming beauty with science and care since 2019.
            </p>
          </div>

          <div>
            <h4 className="text-off-white font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Services', 'About', 'Process', 'Testimonials', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-stone text-sm hover:text-gold-light transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-off-white font-medium mb-4">Treatments</h4>
            <ul className="space-y-2">
              {['Botox', 'Dermal Fillers', 'Microneedling', 'Laser Resurfacing', 'Signature Facial'].map((t) => (
                <li key={t}>
                  <a href="#services" className="text-stone text-sm hover:text-gold-light transition-colors">
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-off-white font-medium mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold-light hover:bg-gold hover:text-charcoal transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold-light hover:bg-gold hover:text-charcoal transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold-light hover:bg-gold hover:text-charcoal transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-stone/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone text-sm">
            &copy; 2024 Velora Medical Aesthetics. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-stone">
            <a href="#" className="hover:text-gold-light transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold-light transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
