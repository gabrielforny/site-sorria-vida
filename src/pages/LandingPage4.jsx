import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle2, AlertCircle } from 'lucide-react';
import logo from '../assets/logo_sorria.png';
import video1 from '../assets/video-1.mp4';
import foto1 from '../assets/Foto 1.jpeg';
import foto2 from '../assets/Foto 2.jpeg';
import foto3 from '../assets/Foto 3.jpeg';
import foto4 from '../assets/Foto 4.jpeg';

const WHATSAPP_URL = 'https://api.whatsapp.com/message/XXAKSZZIGXV5E1?autoload=1&app_absent=0';
const BRAND = '#36869F';

// ── Efeito de digitação ──────────────────────────────────────────────────────

function useTyping(text, speed = 45, startDelay = 400) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

// ── Contador regressivo ──────────────────────────────────────────────────────

function useCountdown() {
  const target = useRef(() => {
    const d = new Date();
    d.setHours(d.getHours() + 3, d.getMinutes() + 47, d.getSeconds() + 12);
    return d;
  }).current();

  const [time, setTime] = useState({ h: '03', m: '47', s: '12' });

  useEffect(() => {
    const id = setInterval(() => {
      const diff = Math.max(0, target - Date.now());
      const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
      setTime({ h, m, s });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

// ── Count-up ─────────────────────────────────────────────────────────────────

function CountUp({ to, duration = 1800, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const start = Date.now();
    const id = setInterval(() => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * to));
      if (progress >= 1) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [isInView, to, duration]);

  return <span ref={ref}>{val.toLocaleString('pt-BR')}{suffix}</span>;
}

// ── Auxiliares de UI ─────────────────────────────────────────────────────────

const WhatsAppIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

function FadeUp({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CTAButton({ label = 'QUERO MINHA AVALIAÇÃO GRATUITA', large = false, fullWidth = false, pulse = false }) {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      animate={pulse ? { scale: [1, 1.03, 1] } : {}}
      transition={pulse ? { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } : {}}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-400 text-white font-extrabold rounded-xl uppercase tracking-wide shadow-lg shadow-green-500/40 border-b-4 border-green-700
        ${large ? 'px-8 py-5 text-sm sm:text-base' : 'px-6 py-4 text-xs sm:text-sm'}
        ${fullWidth ? 'w-full' : ''}`}
    >
      <WhatsAppIcon />
      {label}
    </motion.a>
  );
}

// ── Página ───────────────────────────────────────────────────────────────────

export default function LandingPage4() {
  const { displayed, done } = useTyping('Recupere seus dentes com implantes dentários e volte a sorrir com segurança', 38);
  const countdown = useCountdown();
  const vagasPercent = 73;

  const pains = [
    'Dificuldade para mastigar',
    'Vergonha de sorrir ou falar',
    'Prótese que machuca ou solta',
    'Falta de dentes afetando sua autoestima',
  ];

  const fotos = [foto1, foto2, foto3, foto4];

  return (
    <div className="min-h-screen overflow-x-hidden font-sans" style={{ background: '#0b1520' }}>

      {/* ══ BARRA DE URGÊNCIA ═════════════════════════════════════════════ */}
      <div className="py-2.5 px-4 text-center text-xs sm:text-sm font-bold uppercase tracking-widest text-white" style={{ backgroundColor: BRAND }}>
        ⏰ Avaliação gratuita por tempo limitado — vagas encerrando em breve
      </div>

      {/* ══ HEADER ════════════════════════════════════════════════════════ */}
      <header className="py-5 px-4 flex justify-center border-b border-white/5" style={{ background: '#0b1520' }}>
        <img src={logo} alt="Sorria Vida" className="h-16 w-auto" />
      </header>

      {/* ══ DOBRA 1 — HERO ════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-20 px-4" style={{ background: 'linear-gradient(180deg, #0b1520 0%, #0d1e2d 100%)' }}>
        <div className="max-w-2xl mx-auto text-center">

          {/* Stars badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8 border border-white/10"
            style={{ background: 'rgba(54,134,159,0.15)' }}
          >
            <Stars />
            <span className="text-white/80 text-sm font-medium">5,0 · 146 avaliações no Google</span>
          </motion.div>

          {/* Headline com efeito de digitação */}
          <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-8 min-h-[4.5rem] sm:min-h-[3.5rem]">
            {displayed}
            <motion.span
              animate={{ opacity: done ? 0 : [1, 0] }}
              transition={{ duration: 0.5, repeat: done ? 0 : Infinity }}
              className="inline-block w-0.5 h-7 sm:h-8 ml-1 align-middle rounded"
              style={{ backgroundColor: BRAND }}
            />
          </div>

          {/* Vídeo vertical */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto max-w-sm rounded-2xl overflow-hidden mb-8 shadow-2xl"
            style={{ boxShadow: `0 25px 60px rgba(54,134,159,0.25)` }}
          >
            <video src={video1} controls playsInline preload="metadata" className="w-full aspect-[9/16] object-cover bg-black" />
          </motion.div>

          {/* Frase pós-vídeo */}
          <FadeUp className="mb-8">
            <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-1">
              Implantes com condições facilitadas e avaliação gratuita por tempo limitado na
            </p>
            <p className="text-white font-extrabold text-base sm:text-lg">
              Clínica mais bem avaliada da região
            </p>
          </FadeUp>

          {/* Contador regressivo */}
          <FadeUp delay={0.1} className="mb-8">
            <p className="text-white/50 text-xs uppercase tracking-widest mb-3">Oferta encerra em</p>
            <div className="flex justify-center gap-3">
              {[
                { val: countdown.h, label: 'horas' },
                { val: countdown.m, label: 'min' },
                { val: countdown.s, label: 'seg' },
              ].map(({ val, label }) => (
                <div key={label} className="flex flex-col items-center">
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center font-extrabold text-2xl sm:text-3xl text-white border border-white/10"
                    style={{ background: 'rgba(54,134,159,0.2)' }}
                  >
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={val}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        {val}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <span className="text-white/40 text-xs mt-1">{label}</span>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Barra de vagas */}
          <FadeUp delay={0.2} className="mb-8">
            <div className="rounded-xl border border-white/10 p-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/60 text-xs font-medium">Vagas disponíveis</span>
                <span className="text-red-400 text-xs font-bold uppercase tracking-wide">
                  <AlertCircle className="w-3 h-3 inline mr-1" />
                  Quase esgotado
                </span>
              </div>
              <div className="w-full rounded-full h-3 overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${vagasPercent}%` }}
                  transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="h-3 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${BRAND}, #4ab8d4)` }}
                />
              </div>
              <p className="text-white/40 text-xs mt-2">{vagasPercent}% das vagas já preenchidas</p>
            </div>
          </FadeUp>

          {/* CTA */}
          <FadeUp delay={0.3} className="flex flex-col items-center gap-3">
            <CTAButton label="QUERO MINHA AVALIAÇÃO GRATUITA" large pulse />
            <p className="text-white/50 text-sm">📌 Vagas limitadas · Sem compromisso</p>
          </FadeUp>

        </div>
      </section>

      {/* ══ NÚMEROS ═══════════════════════════════════════════════════════ */}
      <section className="py-10 px-4 border-y border-white/5" style={{ background: BRAND }}>
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-4 text-center">
          {[
            { to: 2000, suffix: '+', label: 'Pacientes atendidos' },
            { to: 5, suffix: ',0★', label: 'Nota no Google' },
            { to: 146, suffix: '', label: 'Avaliações' },
          ].map(({ to, suffix, label }) => (
            <div key={label}>
              <div className="text-white font-extrabold text-2xl sm:text-3xl">
                <CountUp to={to} suffix={suffix} />
              </div>
              <div className="text-white/70 text-xs sm:text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ DOBRA 2 — DORES ═══════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 px-4" style={{ background: '#0d1e2d' }}>
        <div className="max-w-2xl mx-auto">

          <FadeUp className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: BRAND }}>
              Você se identifica?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Você está passando por alguma dessas situações?
            </h2>
          </FadeUp>

          <ul className="space-y-4 mb-12">
            {pains.map((item, i) => (
              <FadeUp key={item} delay={i * 0.1}>
                <div
                  className="flex items-center gap-4 rounded-xl border border-white/8 px-5 py-4"
                  style={{ background: 'rgba(54,134,159,0.08)' }}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border border-white/10" style={{ background: 'rgba(54,134,159,0.25)' }}>
                    <span className="text-white font-bold text-sm">{i + 1}</span>
                  </div>
                  <span className="text-white/85 text-base font-medium">{item}</span>
                </div>
              </FadeUp>
            ))}
          </ul>

          <FadeUp delay={0.45}>
            <div
              className="rounded-2xl p-6 text-center border"
              style={{ background: 'rgba(54,134,159,0.12)', borderColor: `${BRAND}60` }}
            >
              <p className="text-lg sm:text-xl font-extrabold text-white">
                👉 Você não precisa mais viver assim.{' '}
                <span style={{ color: BRAND }}>Existe solução definitiva.</span>
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.55} className="flex justify-center mt-10">
            <CTAButton label="QUERO SAIR DESSA SITUAÇÃO" large />
          </FadeUp>

        </div>
      </section>

      {/* ══ DOBRA 3 — RESULTADOS ══════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 px-4" style={{ background: '#0b1520' }}>
        <div className="max-w-4xl mx-auto">

          <FadeUp className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: BRAND }}>
              Resultados reais
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Resultados reais de pacientes da Sorria Vida
            </h2>
          </FadeUp>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12">
            {[foto1, foto2, foto3, foto4].map((src, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl overflow-hidden aspect-[3/4] shadow-xl cursor-pointer"
                  style={{ boxShadow: `0 8px 32px rgba(54,134,159,0.2)` }}
                >
                  <img src={src} alt={`Resultado ${i + 1}`} className="w-full h-full object-cover" />
                </motion.div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.4} className="text-center">
            <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Não fique você de fora dessa mudança, faça igual aos nossos mais de{' '}
              <span className="font-extrabold text-white">2.000 pacientes</span>,{' '}
              mude o seu sorriso, mude a sua vida!!
            </p>
            <CTAButton label="QUERO MINHA AVALIAÇÃO GRATUITA" large pulse />
            <p className="text-white/40 text-xs mt-4">📌 Vagas limitadas · Avaliação 100% gratuita</p>
          </FadeUp>

        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════════════════ */}
      <footer className="py-10 px-4 text-center border-t border-white/5" style={{ background: '#07101a' }}>
        <img src={logo} alt="Sorria Vida" className="h-10 w-auto mx-auto mb-4 brightness-0 invert opacity-50" />
        <div className="flex justify-center gap-1 mb-3">
          <Stars />
          <span className="text-white/30 text-xs ml-2">5,0 · 146 avaliações no Google</span>
        </div>
        <p className="text-white/25 text-xs mb-1">Estrada Adhemar Bebiano, 3960 – Engenho da Rainha, Rio de Janeiro – RJ</p>
        <p className="text-white/25 text-xs mb-4">(21) 4102-0210</p>
        <p className="text-white/15 text-xs">© {new Date().getFullYear()} Sorria Vida Clínica Odontológica. Todos os direitos reservados.</p>
      </footer>

    </div>
  );
}
