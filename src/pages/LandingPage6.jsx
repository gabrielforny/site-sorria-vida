import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo_sorria.png';
import video1 from '../assets/video-1.mp4';
import foto1 from '../assets/Foto 1.jpeg';
import foto2 from '../assets/Foto 2.jpeg';
import foto3 from '../assets/Foto 3.jpeg';
import foto4 from '../assets/Foto 4.jpeg';

const WHATSAPP_URL = 'https://api.whatsapp.com/message/XXAKSZZIGXV5E1?autoload=1&app_absent=0';

// ── Hooks ────────────────────────────────────────────────────────────────────

function useInViewOnce(opts = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } });
    }, opts);
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useTyping(input, speed = 55, pause = 1800) {
  const arr = Array.isArray(input) ? input : [input];
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [display, setDisplay] = useState('');
  const [done, setDone] = useState(false);
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    const target = arr[phraseIdx % arr.length];
    let t;
    if (!erasing) {
      if (display.length < target.length) {
        t = setTimeout(() => setDisplay(target.slice(0, display.length + 1)), speed);
      } else {
        setDone(true);
        if (arr.length > 1) t = setTimeout(() => { setErasing(true); setDone(false); }, pause);
      }
    } else {
      if (display.length > 0) {
        t = setTimeout(() => setDisplay(display.slice(0, -1)), Math.max(20, speed / 2));
      } else {
        setErasing(false);
        setPhraseIdx((i) => (i + 1) % arr.length);
      }
    }
    return () => clearTimeout(t);
  }, [display, erasing, phraseIdx, speed, pause, arr]);

  return { display, done };
}

function useCountdown(initialH = 5, initialM = 47, initialS = 12) {
  const [now, setNow] = useState(Date.now());
  const deadlineRef = useRef(null);

  if (deadlineRef.current === null) {
    const saved = Number(localStorage.getItem('sv6-deadline'));
    if (saved && saved > Date.now()) {
      deadlineRef.current = saved;
    } else {
      const d = Date.now() + ((initialH * 3600) + (initialM * 60) + initialS) * 1000;
      localStorage.setItem('sv6-deadline', String(d));
      deadlineRef.current = d;
    }
  }

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  let diff = Math.max(0, Math.floor((deadlineRef.current - now) / 1000));
  const h = Math.floor(diff / 3600); diff -= h * 3600;
  const m = Math.floor(diff / 60); diff -= m * 60;
  const pad = (n) => String(n).padStart(2, '0');
  return { h: pad(h), m: pad(m), s: pad(diff) };
}

function useCountUp(to, duration = 1600, decimals = 0, startWhen = true) {
  const [val, setVal] = useState(0);
  const startRef = useRef(null);
  useEffect(() => {
    if (!startWhen) return;
    let raf;
    const step = (ts) => {
      if (startRef.current === null) startRef.current = ts;
      const t = Math.min(1, (ts - startRef.current) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(to * eased);
      if (t < 1) raf = requestAnimationFrame(step);
      else setVal(to);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, startWhen]);
  return decimals === 0 ? Math.round(val) : Number(val.toFixed(decimals));
}

// ── Ícones inline ────────────────────────────────────────────────────────────

const Ic = ({ children, size = 20, stroke = 2, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth={stroke}
    strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {children}
  </svg>
);

const IcClock    = (p) => <Ic {...p}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></Ic>;
const IcAlert    = (p) => <Ic {...p}><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></Ic>;
const IcBolt     = (p) => <Ic {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" stroke="none" /></Ic>;
const IcStar     = (p) => <Ic {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" stroke="none" /></Ic>;
const IcCheck    = (p) => <Ic {...p}><polyline points="20 6 9 17 4 12" /></Ic>;
const IcHeart    = (p) => <Ic {...p}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></Ic>;
const IcShield   = (p) => <Ic {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></Ic>;
const IcSpark    = (p) => <Ic {...p}><path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" /></Ic>;
const IcQuote    = (p) => <Ic {...p}><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h2c0 5-3 5-3 5z M16 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h2c0 5-3 5-3 5z" /></Ic>;
const IcMapPin   = (p) => <Ic {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></Ic>;
const IcPhone    = (p) => <Ic {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></Ic>;

const IcWhatsApp = ({ size = 22 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
    <path fill="currentColor" d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.27-.832-2.487-.214-.475-.385-.575-.87-.575-.16 0-.315-.014-.47-.014-.27 0-.555.115-.756.315-.616.617-.918 1.247-.93 2.13v.13c-.018 1.49.582 2.92 1.48 4.05 1.61 2.05 3.61 3.504 6.04 4.342.51.18 1.16.314 1.69.428.61.11 1.36.063 1.94-.18.81-.34 1.41-.78 1.78-1.587.166-.382.222-.81.176-1.197-.045-.378-.27-.495-.585-.642-.36-.165-2.04-1.005-2.395-1.005zM16.05 26.4h-.014c-1.683 0-3.336-.45-4.78-1.31l-.343-.205-3.55.93.95-3.46-.225-.357A9.43 9.43 0 0 1 6.65 16.93c.003-5.213 4.246-9.456 9.4-9.456 2.51 0 4.87.98 6.644 2.756a9.34 9.34 0 0 1 2.752 6.65c-.003 5.21-4.244 9.453-9.395 9.453z M22.794 9.74A11.45 11.45 0 0 0 16.05 5C9.715 5 4.55 10.165 4.55 16.5c-.003 2.025.526 4.001 1.534 5.74L4.45 28l5.92-1.553a11.45 11.45 0 0 0 5.475 1.396h.005c6.34 0 11.5-5.166 11.5-11.5 0-3.072-1.193-5.96-3.36-8.124z" />
  </svg>
);

const IcChewing = (p) => <Ic {...p}><path d="M12 4c-3 0-5 2-5 5 0 1.4.5 2.4 1 3.5.5 1 .5 2 .5 3 0 2.5 1.5 4 3.5 4s3.5-1.5 3.5-4c0-1 0-2 .5-3 .5-1.1 1-2.1 1-3.5 0-3-2-5-5-5z" /></Ic>;
const IcShy     = (p) => <Ic {...p}><circle cx="12" cy="12" r="10" /><path d="M9 9h.01M15 9h.01M8 15h8" /></Ic>;
const IcBroken  = (p) => <Ic {...p}><path d="M3 12h6l1-3 2 6 1-3h8" /></Ic>;
const IcTooth   = (p) => <Ic {...p}><path d="M12 2C9.5 2 7.5 3.5 7 5.5c-.3 1.3 0 2.6.5 3.7.4 1 .8 2 .8 3.3C8.3 16 8 20 8 20.5c0 .8.7 1.5 1.5 1.5.7 0 1.3-.5 1.5-1.2l.5-2.8h1l.5 2.8c.2.7.8 1.2 1.5 1.2.8 0 1.5-.7 1.5-1.5 0-.5-.3-4.5-.3-8 0-1.3.4-2.3.8-3.3.5-1.1.8-2.4.5-3.7C16.5 3.5 14.5 2 12 2z"/></Ic>;

// ── Componentes base ─────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, y = 32, duration = 0.65, className = '' }) {
  const [ref, inView] = useInViewOnce({ threshold: 0.15 });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

function SlideIn({ children, from = 'left', delay = 0, distance = 60, duration = 0.7, className = '' }) {
  const [ref, inView] = useInViewOnce({ threshold: 0.2 });
  const x = from === 'left' ? -distance : distance;
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

function CountUp({ to, duration = 1600, decimals = 0, suffix = '', prefix = '', formatBR = false }) {
  const [ref, inView] = useInViewOnce({ threshold: 0.4 });
  const val = useCountUp(to, duration, decimals, inView);
  let txt = decimals === 0
    ? (formatBR ? Math.round(val).toLocaleString('pt-BR') : String(Math.round(val)))
    : val.toFixed(decimals).replace('.', ',');
  return <span ref={ref}>{prefix}{txt}{suffix}</span>;
}

function CTAButton({ children, href = WHATSAPP_URL, variant = 'green', pulse = false, size = 'lg', className = '', icon = true }) {
  const isGreen = variant === 'green';
  const sizes = { md: 'px-6 py-3 text-base', lg: 'px-7 py-4 text-lg sm:text-xl', xl: 'px-8 py-5 text-xl sm:text-2xl' };
  const colors = isGreen
    ? 'bg-wa text-white'
    : 'bg-brand text-white';
  const shadow = isGreen
    ? { boxShadow: '0 8px 0 0 #15803d, 0 18px 30px -6px rgba(34,197,94,0.55)' }
    : { boxShadow: '0 8px 0 0 #1e5f74, 0 18px 30px -6px rgba(54,134,159,0.55)' };
  return (
    <motion.a href={href} target="_blank" rel="noopener noreferrer"
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97, y: 3 }}
      animate={pulse ? { scale: [1, 1.03, 1] } : {}}
      transition={pulse
        ? { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
        : { type: 'spring', stiffness: 380, damping: 22 }}
      style={shadow}
      className={`relative inline-flex items-center justify-center gap-3 font-extrabold tracking-tight rounded-2xl select-none ${sizes[size]} ${colors} ${className}`}>
      {isGreen && icon && <IcWhatsApp size={26} />}
      <span className="leading-tight">{children}</span>
    </motion.a>
  );
}

function Stars({ size = 18 }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-400">
      {[0, 1, 2, 3, 4].map(i => <IcStar key={i} size={size} />)}
    </span>
  );
}

// ── DOBRA 1 — HERO ───────────────────────────────────────────────────────────

function CountdownBox({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative bg-brand-deeper/90 border border-white/15 rounded-2xl px-3 sm:px-4 py-3 sm:py-4 min-w-[64px] sm:min-w-[78px] overflow-hidden"
        style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)' }}>
        <AnimatePresence mode="popLayout">
          <motion.span key={value}
            initial={{ y: -22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 22, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="block font-extrabold text-white text-3xl sm:text-4xl tabular-nums tracking-tight text-center">
            {value}
          </motion.span>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-white/10" />
      </div>
      <div className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-white/75 font-semibold">{label}</div>
    </div>
  );
}

function VacanciesBar({ percent = 73 }) {
  const [ref, inView] = useInViewOnce({ threshold: 0.3 });
  return (
    <div ref={ref} className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-white">
          <IcAlert size={16} stroke={2.5} />
          <span className="text-sm font-semibold">Vagas preenchidas hoje</span>
        </div>
        <div className="flex items-center gap-1.5 text-red-200 font-bold text-sm">
          <span className="inline-block w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          Quase esgotado
        </div>
      </div>
      <div className="h-3 bg-white/15 rounded-full overflow-hidden border border-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${percent}%` } : { width: 0 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="h-full rounded-full relative"
          style={{ background: 'linear-gradient(90deg, #fbbf24, #f97316, #ef4444)', boxShadow: '0 0 16px rgba(248,113,113,0.55)' }}>
          <div className="absolute inset-0 opacity-40"
            style={{ backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.35) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.35) 75%, transparent 75%)', backgroundSize: '14px 14px' }} />
        </motion.div>
      </div>
      <div className="mt-1.5 flex items-center justify-between text-xs text-white/80">
        <span>0%</span>
        <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.4 }}
          className="font-bold text-white">{percent}% preenchido</motion.span>
        <span>100%</span>
      </div>
    </div>
  );
}

function Hero() {
  const cd = useCountdown(5, 47, 12);
  const phrases = [
    'Recupere seus dentes com implantes e volte a sorrir com segurança.',
    'Reconquiste a confiança no seu sorriso, sem dor e sem medo.',
    'Implantes que duram a vida toda — feitos por especialistas.',
  ];
  const { display } = useTyping(phrases, 50, 1800);

  return (
    <section className="relative bg-brand text-white overflow-hidden font-jakarta">
      {/* glows */}
      <div className="pointer-events-none absolute -top-40 -right-32 w-[520px] h-[520px] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(255,255,255,0.18), transparent 70%)' }} />
      <div className="pointer-events-none absolute -bottom-20 -left-16 w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(54,134,159,0.3), transparent 70%)' }} />

      {/* dental icon decorations */}
      <div className="pointer-events-none absolute top-28 left-4 text-white/[0.06] rotate-[15deg] hidden sm:block">
        <IcTooth size={120} stroke={0.8} />
      </div>
      <div className="pointer-events-none absolute bottom-28 right-6 text-white/[0.06] -rotate-[12deg] hidden sm:block">
        <IcTooth size={100} stroke={0.8} />
      </div>
      <div className="pointer-events-none absolute top-1/2 left-[18%] -translate-y-1/2 text-white/[0.04] rotate-[30deg] hidden lg:block">
        <IcTooth size={70} stroke={0.8} />
      </div>
      <div className="pointer-events-none absolute top-1/3 right-[16%] text-white/[0.04] -rotate-[20deg] hidden lg:block">
        <IcSpark size={55} stroke={0.8} />
      </div>

      {/* urgency strip */}
      <div className="relative bg-brand-deeper/70 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-center gap-2 text-[12px] sm:text-sm font-semibold text-white/95">
          <IcBolt size={14} className="text-amber-300" />
          <span>Avaliação <span className="text-amber-300">gratuita</span> por tempo limitado</span>
          <span className="hidden sm:inline text-white/40">•</span>
          <span className="hidden sm:inline">Apenas para os primeiros pacientes da semana</span>
        </div>
      </div>

      {/* logo */}
      <header className="relative pt-8 sm:pt-10 pb-2 flex justify-center">
        <img src={logo} alt="Sorria Vida" className="h-20 sm:h-24 w-auto" />
      </header>

      <div className="relative max-w-2xl mx-auto px-5 sm:px-8 pt-6 pb-14 sm:pb-20 flex flex-col items-center">

        {/* headline */}
        <FadeUp className="w-full">
          <h1 className="text-center font-extrabold tracking-tight leading-[1.05] text-3xl sm:text-5xl md:text-6xl">
            <span className="block text-white/85 text-base sm:text-lg font-semibold uppercase tracking-[0.25em] mb-4">
              Clínica Sorria Vida
            </span>
            <span className="inline">
              {display}
              <span className="animate-caret inline-block w-[3px] sm:w-[4px] h-[0.85em] align-[-0.05em] ml-1 bg-amber-300 rounded-sm" />
            </span>
          </h1>
        </FadeUp>

        {/* subtext */}
        <FadeUp delay={0.15} className="w-full mt-5">
          <p className="text-center text-white/95 text-base sm:text-lg leading-relaxed">
            Implantes com <span className="font-bold text-amber-300">condições facilitadas</span> e
            avaliação <span className="font-bold">gratuita</span> por tempo limitado, na clínica
            <span className="font-bold"> mais bem avaliada</span> da região.
          </p>
        </FadeUp>

        {/* badge Google */}
        <FadeUp delay={0.25} className="mt-6">
          <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl px-4 py-3 shadow-brand">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-extrabold leading-none">
                <CountUp to={5} decimals={1} />
              </div>
              <Stars size={14} />
            </div>
            <div className="h-10 w-px bg-white/25" />
            <div className="text-sm leading-tight">
              <div className="font-bold">Google Reviews</div>
              <div className="text-white/80">
                <CountUp to={146} duration={1500} /> avaliações verificadas
              </div>
            </div>
          </div>
        </FadeUp>

        {/* vídeo vertical centralizado */}
        <FadeUp delay={0.35} className="mt-8 w-full flex justify-center">
          <div className="relative w-full max-w-[240px] sm:max-w-[280px]">
            <div className="absolute -inset-3 rounded-[28px] bg-white/10 blur-xl" />
            <div className="relative aspect-[9/16] rounded-3xl overflow-hidden ring-1 ring-white/20 bg-brand-deeper"
              style={{ boxShadow: '0 28px 60px -12px rgba(54,134,159,0.55)' }}>
              <video src={video1} controls playsInline preload="metadata"
                className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
        </FadeUp>

        {/* countdown */}
        <FadeUp delay={0.45} className="mt-8 w-full">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <IcClock size={16} className="text-amber-300" />
              <span className="text-sm uppercase tracking-[0.2em] font-semibold text-white/85">
                A oferta termina em
              </span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CountdownBox value={cd.h} label="Horas" />
              <span className="text-3xl font-bold text-white/40 -mt-5">:</span>
              <CountdownBox value={cd.m} label="Min" />
              <span className="text-3xl font-bold text-white/40 -mt-5">:</span>
              <CountdownBox value={cd.s} label="Seg" />
            </div>
          </div>
        </FadeUp>

        {/* barra de vagas */}
        <FadeUp delay={0.55} className="mt-6 w-full">
          <VacanciesBar percent={73} />
        </FadeUp>

        {/* CTA */}
        <FadeUp delay={0.65} className="mt-8 flex flex-col items-center gap-3 w-full">
          <CTAButton variant="green" pulse size="xl" className="w-full sm:w-auto">
            QUERO MINHA AVALIAÇÃO GRATUITA
          </CTAButton>
          <div className="animate-softblink inline-flex items-center gap-2 text-amber-300 text-sm font-bold">
            <span className="relative inline-block w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-amber-300" />
              <span className="absolute inset-0 rounded-full bg-amber-300 animate-ping" />
            </span>
            Vagas limitadas — atendimento por ordem de chegada
          </div>
        </FadeUp>
      </div>

      {/* shape divider */}
      <svg className="block w-full -mb-px" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,60 L0,30 Q360,0 720,30 T1440,30 L1440,60 Z" fill="#ffffff" />
      </svg>
    </section>
  );
}

// ── DOBRA 2 — DORES ──────────────────────────────────────────────────────────

function PainCard({ icon, title, desc, from = 'left', delay = 0 }) {
  return (
    <SlideIn from={from} delay={delay}>
      <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }}
        className="group relative h-full border border-brand/15 rounded-2xl p-6 sm:p-7"
        style={{
          background: 'linear-gradient(180deg, rgba(54,134,159,0.06), rgba(54,134,159,0.02))',
          boxShadow: '0 18px 40px -18px rgba(54,134,159,0.35)',
        }}>
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-12 h-12 rounded-xl bg-brand text-white flex items-center justify-center"
            style={{ boxShadow: '0 8px 18px -6px rgba(54,134,159,0.55)' }}>
            {icon}
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-brand-deeper tracking-tight">{title}</h3>
            <p className="mt-1.5 text-slate-600 leading-relaxed text-[15px]">{desc}</p>
          </div>
        </div>
        <div className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />
      </motion.div>
    </SlideIn>
  );
}

function Dores() {
  const pains = [
    { icon: <IcChewing size={22} stroke={2.2} />, title: 'Dificuldade para mastigar',
      desc: 'Evita certos alimentos, mastiga só de um lado e sente que perdeu o prazer de comer.' },
    { icon: <IcShy size={22} stroke={2.2} />, title: 'Vergonha de sorrir ou falar',
      desc: 'Cobre a boca em fotos, ri sem mostrar os dentes e se sente travado em conversas.' },
    { icon: <IcBroken size={22} stroke={2.2} />, title: 'Prótese que machuca ou solta',
      desc: 'A prótese móvel incomoda, escapa ao falar e exige cremes e adesivos toda semana.' },
    { icon: <IcHeart size={22} stroke={2.2} />, title: 'Falta de dentes afeta a autoestima',
      desc: 'Você se sente mais velho do que é, e percebe a diferença até no humor do dia a dia.' },
  ];

  return (
    <section className="relative bg-white font-jakarta">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <FadeUp>
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-brand">
              Você não está sozinho
            </span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-deeper leading-tight">
              Você está passando por alguma <span className="text-brand">dessas situações?</span>
            </h2>
            <p className="mt-5 text-slate-600 text-base sm:text-lg leading-relaxed">
              Mais de 2 mil pacientes chegaram aqui sentindo exatamente isso.
              E saíram com o sorriso — e a vida — de volta.
            </p>
          </div>
        </FadeUp>

        <div className="mt-12 grid sm:grid-cols-2 gap-5 sm:gap-6">
          {pains.map((p, i) => (
            <PainCard key={i} {...p}
              from={i % 2 === 0 ? 'left' : 'right'}
              delay={(i % 2) * 0.1 + Math.floor(i / 2) * 0.15} />
          ))}
        </div>

        {/* closing card */}
        <FadeUp delay={0.3}>
          <div className="mt-10 sm:mt-14 relative overflow-hidden rounded-3xl bg-brand-deeper text-white p-7 sm:p-10 shadow-brand-lg">
            <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full"
              style={{ background: 'radial-gradient(closest-side, rgba(54,134,159,0.45), transparent 70%)' }} />
            <div className="relative grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-8 items-center">
              <div className="hidden md:flex w-16 h-16 rounded-2xl bg-amber-400 text-brand-deeper items-center justify-center shrink-0">
                <IcSpark size={28} stroke={2.6} />
              </div>
              <div>
                <div className="md:hidden flex w-12 h-12 mb-3 rounded-xl bg-amber-400 text-brand-deeper items-center justify-center">
                  <IcSpark size={22} stroke={2.6} />
                </div>
                <h3 className="text-xl sm:text-3xl font-extrabold leading-tight tracking-tight">
                  Você não precisa mais viver assim.{' '}
                  <span className="text-amber-300">Existe solução definitiva.</span>
                </h3>
                <p className="mt-2 text-white/80 text-sm sm:text-base">
                  Agende uma avaliação gratuita e descubra qual é o melhor caminho para o seu caso.
                </p>
              </div>
              <div className="flex md:justify-end">
                <CTAButton variant="green" size="lg" className="w-full md:w-auto">
                  FALAR NO WHATSAPP
                </CTAButton>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ── DOBRA 3 — RESULTADOS ─────────────────────────────────────────────────────

const FOTOS = [
  { src: foto1, label: 'Paciente 1', tag: 'Implante dentário' },
  { src: foto2, label: 'Paciente 2', tag: 'Antes & depois' },
  { src: foto3, label: 'Paciente 3', tag: 'Reabilitação oral' },
  { src: foto4, label: 'Paciente 4', tag: 'Sorriso restaurado' },
];

function StatBlock({ to, suffix = '', decimals = 0, label, formatBR = false, icon }) {
  const [ref, inView] = useInViewOnce({ threshold: 0.4 });
  const val = useCountUp(to, 1800, decimals, inView);
  let txt = decimals === 0
    ? (formatBR ? Math.round(val).toLocaleString('pt-BR') : String(Math.round(val)))
    : val.toFixed(decimals).replace('.', ',');
  return (
    <div ref={ref} className="flex-1 min-w-[140px] flex flex-col items-center text-center px-2">
      <div className="flex items-center gap-2 text-amber-300 mb-1">{icon}</div>
      <div className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums tracking-tight leading-none">
        {txt}{suffix}
      </div>
      <div className="mt-2 text-white/85 text-xs sm:text-sm uppercase tracking-[0.18em] font-semibold">{label}</div>
    </div>
  );
}

function Resultados() {
  return (
    <section className="relative bg-brand text-white overflow-hidden font-jakarta">
      {/* top wave */}
      <svg className="block w-full -mt-px rotate-180" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,60 L0,30 Q360,0 720,30 T1440,30 L1440,60 Z" fill="#ffffff" />
      </svg>

      <div className="pointer-events-none absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(255,255,255,0.18), transparent 70%)' }} />
      <div className="pointer-events-none absolute -bottom-40 -right-24 w-[480px] h-[480px] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(13,30,45,0.55), transparent 70%)' }} />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <FadeUp>
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-amber-300">
              Quem já mudou de vida
            </span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Resultados <span className="text-amber-300">reais</span> de pacientes da Sorria Vida
            </h2>
            <p className="mt-5 text-white/90 text-base sm:text-lg leading-relaxed">
              Cada sorriso aqui é a história de alguém que voltou a comer, a falar e a se olhar no espelho com orgulho.
            </p>
          </div>
        </FadeUp>

        {/* grade de fotos reais */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {FOTOS.map((f, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <motion.div
                whileHover={{ scale: 1.04, y: -6, rotate: i % 2 === 0 ? 1 : -1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer ring-1 ring-white/15"
                style={{ boxShadow: '0 20px 45px -15px rgba(0,0,0,0.55)' }}>
                <img src={f.src} alt={f.label} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/75 to-transparent">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-white/70">{f.tag}</div>
                  <div className="font-bold text-white text-sm">{f.label}</div>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>

        {/* quote */}
        <FadeUp delay={0.2}>
          <div className="mt-14 max-w-3xl mx-auto text-center">
            <IcQuote size={32} className="mx-auto text-amber-300 opacity-80" stroke={2} />
            <p className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold leading-snug tracking-tight">
              Não fique de fora dessa mudança. Faça igual aos nossos mais de
              <span className="text-amber-300"> 2.000 pacientes</span>:
              mude o seu sorriso, mude a sua vida.
            </p>
          </div>
        </FadeUp>

        {/* CTA final */}
        <FadeUp delay={0.3}>
          <div className="mt-10 flex flex-col items-center gap-3">
            <CTAButton variant="green" pulse size="xl">
              GARANTIR MINHA AVALIAÇÃO GRATUITA
            </CTAButton>
            <div className="flex items-center gap-2 text-white/85 text-sm">
              <IcShield size={14} />
              <span>Atendimento humanizado · Sem compromisso · 100% gratuito</span>
            </div>
          </div>
        </FadeUp>

        {/* stats strip */}
        <FadeUp delay={0.4}>
          <div className="mt-14 sm:mt-20 rounded-3xl bg-brand-deeper/70 backdrop-blur-sm border border-white/10 py-8 sm:py-10 px-4">
            <div className="flex flex-wrap items-stretch justify-around gap-y-8 divide-x divide-white/10">
              <StatBlock to={2000} suffix="+" formatBR label="Pacientes atendidos" icon={<IcHeart size={18} stroke={2.4} />} />
              <StatBlock to={5} decimals={1} label="Estrelas no Google" icon={<IcStar size={18} />} />
              <StatBlock to={146} label="Avaliações verificadas" icon={<IcCheck size={18} stroke={2.6} />} />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="relative bg-brand-night text-white/80 font-jakarta">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <div className="grid sm:grid-cols-3 gap-10 items-start">
          {/* logo */}
          <div className="flex flex-col items-center sm:items-start">
            <img src={logo} alt="Sorria Vida" className="h-16 w-auto opacity-55 brightness-0 invert" />
            <div className="mt-3">
              <Stars size={16} />
              <div className="mt-1 text-xs text-white/55 font-mono uppercase tracking-[0.18em]">
                5,0 · 146 avaliações Google
              </div>
            </div>
          </div>
          {/* endereço */}
          <div className="text-center sm:text-left">
            <div className="text-xs uppercase tracking-[0.22em] text-white/45 font-bold">Atendimento</div>
            <div className="mt-3 flex items-start gap-2.5 justify-center sm:justify-start">
              <IcMapPin size={16} className="text-brand mt-0.5 shrink-0" />
              <div>
                <div className="text-white font-semibold text-sm">Clínica Sorria Vida</div>
                <div className="text-white/65 text-sm leading-relaxed">
                  Estrada Adhemar Bebiano, 3960<br />
                  Engenho da Rainha · Rio de Janeiro — RJ
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2.5 justify-center sm:justify-start">
              <IcPhone size={16} className="text-brand" />
              <a href={WHATSAPP_URL} className="text-white font-semibold hover:text-brand transition-colors text-sm">
                (21) 4102-0210
              </a>
            </div>
          </div>
          {/* horário */}
          <div className="text-center sm:text-left">
            <div className="text-xs uppercase tracking-[0.22em] text-white/45 font-bold">Horário</div>
            <div className="mt-3 space-y-1.5 text-sm">
              {[['Seg — Sex', '08h — 19h'], ['Sábado', '09h — 14h'], ['Domingo', 'Fechado']].map(([d, h]) => (
                <div key={d} className="flex justify-between max-w-[220px] mx-auto sm:mx-0">
                  <span className="text-white/65">{d}</span>
                  <span className={h === 'Fechado' ? 'text-white/50' : 'text-white font-semibold'}>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-white/45">
            © {new Date().getFullYear()} Clínica Sorria Vida. Todos os direitos reservados.
          </div>
          <div className="text-[11px] text-white/35 font-mono uppercase tracking-[0.18em]">
            Drs. Michel Brandão e Rafael Rodrigues
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Botão flutuante WhatsApp ─────────────────────────────────────────────────

function FloatingWhatsApp() {
  return (
    <motion.a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 280, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-wa text-white flex items-center justify-center"
      style={{ boxShadow: '0 8px 0 0 #15803d, 0 18px 30px -6px rgba(34,197,94,0.55)' }}
      aria-label="Falar no WhatsApp">
      <span className="absolute inset-0 rounded-full bg-wa animate-ping opacity-40" />
      <span className="relative"><IcWhatsApp size={30} /></span>
    </motion.a>
  );
}

// ── Ticker ───────────────────────────────────────────────────────────────────

function Ticker() {
  const items = [
    'Avaliação 100% Gratuita',
    '+2.000 Pacientes Atendidos',
    '5,0 Estrelas no Google',
    'Implantes de Alta Qualidade',
    'Tratamento Sem Dor',
    'Atendimento Humanizado',
    'Sem Compromisso',
    'Especialistas em Implantes',
    'Sorriso Transformado',
    'Clínica Mais Bem Avaliada',
  ];
  const doubled = [...items, ...items];

  return (
    <div className="relative bg-brand-deeper border-y border-white/10 overflow-hidden py-3.5 font-jakarta select-none">
      <style>{`@keyframes sv-ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      <div style={{ display: 'flex', width: 'max-content', animation: 'sv-ticker 32s linear infinite', willChange: 'transform' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', padding: '0 1.5rem', whiteSpace: 'nowrap' }}>
            <span style={{ color: '#fbbf24', marginRight: '0.4rem', fontSize: '0.95rem' }}>✓</span>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.88)' }}>{item}</span>
            <span style={{ color: 'rgba(54,134,159,0.6)', marginLeft: '1.5rem', fontSize: '1.1rem', lineHeight: 1 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── App ──────────────────────────────────────────────────────────────────────

export default function LandingPage6() {
  return (
    <main className="min-h-screen bg-brand-night">
      <Hero />
      <Ticker />
      <Dores />
      <Resultados />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
