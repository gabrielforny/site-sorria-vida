import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Star, ArrowRight, CheckCircle2, X } from 'lucide-react';
import logo from '../assets/logo_sorria.png';
import video1 from '../assets/video-1.mp4';
import foto1 from '../assets/Foto 1.jpeg';
import foto2 from '../assets/Foto 2.jpeg';
import foto3 from '../assets/Foto 3.jpeg';
import foto4 from '../assets/Foto 4.jpeg';

const WHATSAPP_URL = 'https://api.whatsapp.com/message/XXAKSZZIGXV5E1?autoload=1&app_absent=0';
const BRAND = '#36869F';
const BRAND_DARK = '#1e5f74';

// ── Efeito de digitação ──────────────────────────────────────────────────────

function useTyping(words, charSpeed = 60, pauseMs = 1800) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx % words.length];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), pauseMs);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDeleting(false);
          setWordIdx((i) => i + 1);
        }
      }
    }, deleting ? charSpeed / 2 : charSpeed);
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIdx, words, charSpeed, pauseMs]);

  return text;
}

// ── Count-up ─────────────────────────────────────────────────────────────────

function CountUp({ to, suffix = '', prefix = '', duration = 1600 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const id = setInterval(() => {
      const p = Math.min((Date.now() - start) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p >= 1) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [inView, to, duration]);

  return <span ref={ref}>{prefix}{val.toLocaleString('pt-BR')}{suffix}</span>;
}

// ── Componentes ───────────────────────────────────────────────────────────────

const WhatsAppIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
    </div>
  );
}

function SlideIn({ children, from = 'left', className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const x = from === 'left' ? -60 : 60;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeUp({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CTAButton({ label = 'QUERO MINHA AVALIAÇÃO GRATUITA', large = false, fullWidth = false, variant = 'green' }) {
  const isGreen = variant === 'green';
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      className={`inline-flex items-center justify-center gap-3 font-extrabold rounded-2xl uppercase tracking-wide border-b-4 shadow-lg
        ${isGreen
          ? 'bg-green-500 hover:bg-green-400 text-white border-green-700 shadow-green-500/30'
          : 'text-white border-b-4'
        }
        ${large ? 'px-8 py-5 text-sm sm:text-base' : 'px-6 py-4 text-xs sm:text-sm'}
        ${fullWidth ? 'w-full' : ''}`}
      style={!isGreen ? { backgroundColor: BRAND, borderColor: BRAND_DARK, boxShadow: `0 8px 24px ${BRAND}40` } : {}}
    >
      <WhatsAppIcon />
      {label}
    </motion.a>
  );
}

// ── Seção dividida (texto | mídia) ───────────────────────────────────────────

function SplitSection({ children, flip = false, bg = 'white' }) {
  return (
    <section className={`py-16 sm:py-24 px-4 ${bg === 'brand' ? 'text-white' : 'bg-white'}`}
      style={bg === 'brand' ? { backgroundColor: BRAND } : {}}>
      <div className={`max-w-5xl mx-auto grid sm:grid-cols-2 gap-12 lg:gap-20 items-center ${flip ? 'sm:[direction:rtl]' : ''}`}>
        <div style={flip ? { direction: 'ltr' } : {}}>
          {children[0]}
        </div>
        <div style={flip ? { direction: 'ltr' } : {}}>
          {children[1]}
        </div>
      </div>
    </section>
  );
}

// ── Página ───────────────────────────────────────────────────────────────────

export default function LandingPage5() {
  const typedText = useTyping([
    'implantes dentários',
    'um sorriso completo',
    'sua autoestima de volta',
    'mastigar sem dor',
  ], 65, 2000);

  const pains = [
    { text: 'Dificuldade para mastigar', bad: true },
    { text: 'Vergonha de sorrir ou falar', bad: true },
    { text: 'Prótese que machuca ou solta', bad: true },
    { text: 'Falta de dentes afetando sua autoestima', bad: true },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden font-sans bg-white">

      {/* ══ BARRA TOPO ════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-2.5 px-4 text-center text-xs sm:text-sm font-bold text-white uppercase tracking-widest"
        style={{ backgroundColor: BRAND_DARK }}
      >
        ⭐ Avaliação 5,0 no Google · Clínica mais bem avaliada da região
      </motion.div>

      {/* ══ HEADER ════════════════════════════════════════════════════════ */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="py-5 px-4 flex justify-center border-b"
        style={{ borderColor: `${BRAND}25` }}
      >
        <img src={logo} alt="Sorria Vida" className="h-16 w-auto" />
      </motion.header>

      {/* ══ DOBRA 1 — HERO ════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 px-4" style={{ backgroundColor: BRAND }}>
        <div className="max-w-2xl mx-auto text-center">

          {/* Headline com palavra rotativa digitada */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p className="text-white/80 text-sm font-semibold uppercase tracking-widest mb-4">
              Sorria Vida · Clínica Odontológica
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-2">
              Recupere seus dentes com
            </h1>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight mb-8 min-h-[2.5rem] sm:min-h-[2.2rem]"
              style={{ color: '#b8e4f0' }}>
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-0.5 h-7 sm:h-8 ml-1 align-middle rounded bg-white/80"
              />
            </div>
          </motion.div>

          {/* Vídeo vertical */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto max-w-sm rounded-3xl overflow-hidden mb-8"
            style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.35)' }}
          >
            <video src={video1} controls playsInline preload="metadata" className="w-full aspect-[9/16] object-cover bg-black" />
          </motion.div>

          {/* Texto pós-vídeo */}
          <FadeUp className="mb-6">
            <p className="text-white/90 text-base sm:text-lg leading-relaxed">
              Implantes com condições facilitadas e avaliação gratuita por tempo limitado na{' '}
              <strong className="text-white">Clínica mais bem avaliada da região</strong>
            </p>
          </FadeUp>

          {/* Stars */}
          <FadeUp delay={0.1} className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-5 py-2.5">
              <Stars />
              <span className="text-white font-bold text-sm">5,0 no Google</span>
              <span className="text-white/70 text-sm">· 146 avaliações</span>
            </div>
          </FadeUp>

          {/* CTA */}
          <FadeUp delay={0.2} className="flex flex-col items-center gap-3">
            <CTAButton label="QUERO MINHA AVALIAÇÃO GRATUITA" large />
            <motion.p
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white/80 text-sm font-semibold"
            >
              📌 Vagas limitadas
            </motion.p>
          </FadeUp>

        </div>
      </section>

      {/* ══ DOBRA 2 — DORES ═══════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">

          <FadeUp className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest block mb-3" style={{ color: BRAND }}>
              Isso está acontecendo com você?
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
              Você está passando por alguma<br className="hidden sm:block" /> dessas situações?
            </h2>
          </FadeUp>

          {/* Lista alternada com slide */}
          <div className="space-y-4 mb-14 max-w-xl mx-auto">
            {pains.map((item, i) => (
              <SlideIn key={item.text} from={i % 2 === 0 ? 'left' : 'right'} delay={i * 0.1}>
                <div
                  className="flex items-center gap-4 rounded-2xl border px-5 py-4"
                  style={{ borderColor: `${BRAND}30`, background: `${BRAND}08` }}
                >
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${BRAND}20` }}>
                    <X className="w-4 h-4" style={{ color: '#e55' }} />
                  </div>
                  <span className="text-gray-700 font-medium text-base">{item.text}</span>
                </div>
              </SlideIn>
            ))}
          </div>

          <FadeUp delay={0.5}>
            <div
              className="rounded-3xl px-6 py-6 text-center max-w-xl mx-auto"
              style={{ background: BRAND, boxShadow: `0 16px 48px ${BRAND}40` }}
            >
              <p className="text-white text-lg sm:text-xl font-extrabold leading-snug">
                👉 Você não precisa mais viver assim.<br />
                <span className="text-white/85 font-semibold text-base mt-1 block">Existe solução definitiva.</span>
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.65} className="flex justify-center mt-10">
            <CTAButton label="QUERO SAIR DESSA SITUAÇÃO" large variant="brand" />
          </FadeUp>

        </div>
      </section>

      {/* ══ ESTATÍSTICAS ══════════════════════════════════════════════════ */}
      <section className="py-12 px-4 border-y" style={{ borderColor: `${BRAND}20` }}>
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { to: 2000, suffix: '+', label: 'Pacientes atendidos' },
            { to: 5, suffix: ',0★', label: 'Nota Google' },
            { to: 146, suffix: '', label: 'Avaliações' },
          ].map(({ to, suffix, label }) => (
            <FadeUp key={label}>
              <div className="text-3xl sm:text-4xl font-extrabold" style={{ color: BRAND }}>
                <CountUp to={to} suffix={suffix} />
              </div>
              <div className="text-gray-500 text-xs sm:text-sm mt-1 font-medium">{label}</div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ══ DOBRA 3 — RESULTADOS ══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4" style={{ backgroundColor: BRAND }}>
        <div className="max-w-5xl mx-auto">

          <FadeUp className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest block mb-3 text-white/60">
              Casos reais
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              Resultados reais de pacientes<br className="hidden sm:block" /> da Sorria Vida
            </h2>
          </FadeUp>

          {/* Grade de fotos com entrada em cascata */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-12">
            {[foto1, foto2, foto3, foto4].map((src, i) => (
              <SlideIn key={i} from={i < 2 ? 'left' : 'right'} delay={i * 0.12}>
                <motion.div
                  whileHover={{ scale: 1.04, y: -6, rotate: i % 2 === 0 ? 1 : -1 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl cursor-pointer"
                  style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.35)' }}
                >
                  <img src={src} alt={`Resultado ${i + 1}`} className="w-full h-full object-cover" />
                </motion.div>
              </SlideIn>
            ))}
          </div>

          <FadeUp delay={0.5} className="text-center">
            <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Não fique você de fora dessa mudança, faça igual aos nossos mais de{' '}
              <strong className="text-white">2.000 pacientes</strong>,{' '}
              mude o seu sorriso, mude a sua vida!!
            </p>

            <CTAButton label="QUERO MINHA AVALIAÇÃO GRATUITA" large />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center justify-center gap-2 mt-6"
            >
              <Stars />
              <span className="text-white/70 text-sm">5,0 · 146 avaliações · Clínica mais bem avaliada da região</span>
            </motion.div>
          </FadeUp>

        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════════════════ */}
      <footer className="py-10 px-4 text-center bg-gray-900">
        <img src={logo} alt="Sorria Vida" className="h-10 w-auto mx-auto mb-4 brightness-0 invert opacity-50" />
        <div className="flex justify-center gap-1 mb-3">
          <Stars />
          <span className="text-white/30 text-xs ml-2">5,0 · 146 avaliações</span>
        </div>
        <p className="text-white/25 text-xs mb-1">Estrada Adhemar Bebiano, 3960 – Engenho da Rainha, Rio de Janeiro – RJ</p>
        <p className="text-white/25 text-xs mb-4">(21) 4102-0210</p>
        <p className="text-white/15 text-xs">© {new Date().getFullYear()} Sorria Vida Clínica Odontológica. Todos os direitos reservados.</p>
      </footer>

    </div>
  );
}
