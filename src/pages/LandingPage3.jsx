import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import logo from '../assets/logo_sorria.png';
import video1 from '../assets/video-1.mp4';
import foto1 from '../assets/Foto 1.jpeg';
import foto2 from '../assets/Foto 2.jpeg';
import foto3 from '../assets/Foto 3.jpeg';
import foto4 from '../assets/Foto 4.jpeg';

const WHATSAPP_URL = 'https://api.whatsapp.com/message/XXAKSZZIGXV5E1?autoload=1&app_absent=0';
const BRAND = '#36869F';
const FOTOS = [foto1, foto2, foto3, foto4];

// ── Ícones ──────────────────────────────────────────────────────────────────

const WhatsAppIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

// ── Utilitários ──────────────────────────────────────────────────────────────

function Stars({ count = 5, size = 'sm' }) {
  const cls = size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className={`${cls} fill-yellow-400 text-yellow-400`} />
      ))}
    </div>
  );
}

function FadeIn({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CTAButton({ label = 'QUERO MINHA AVALIAÇÃO GRATUITA', large = false, fullWidth = false }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-400 text-white font-extrabold rounded-xl uppercase tracking-wide transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-green-500/30 border-b-4 border-green-700 whitespace-nowrap
        ${large ? 'px-8 py-5 text-sm sm:text-base' : 'px-6 py-4 text-xs sm:text-sm'}
        ${fullWidth ? 'w-full' : ''}`}
    >
      <WhatsAppIcon />
      {label}
    </a>
  );
}

// ── Carrossel de fotos ───────────────────────────────────────────────────────

function FotosCarousel() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + FOTOS.length) % FOTOS.length);
  const next = () => setCurrent((c) => (c + 1) % FOTOS.length);

  return (
    <div className="relative max-w-xs mx-auto sm:hidden">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4]">
        {FOTOS.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt={`Resultado ${i + 1}`}
            animate={{ opacity: i === current ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ))}
      </div>
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur shadow-md flex items-center justify-center hover:bg-white"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur shadow-md flex items-center justify-center hover:bg-white"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>
      <div className="flex justify-center gap-1.5 mt-4">
        {FOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2' : 'w-2 h-2'}`}
            style={{ backgroundColor: i === current ? BRAND : '#d1d5db' }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Página ───────────────────────────────────────────────────────────────────

export default function LandingPage3() {
  return (
    <div className="min-h-screen overflow-x-hidden font-sans bg-white">

      {/* ══ LOGO TOPO ══════════════════════════════════════════════════════ */}
      <header className="py-6 px-4 flex justify-center" style={{ backgroundColor: BRAND }}>
        <img src={logo} alt="Sorria Vida" className="h-20 w-auto" />
      </header>

      {/* ══ DOBRA 1 — HERO ════════════════════════════════════════════════ */}
      <section className="py-10 sm:py-14" style={{ backgroundColor: BRAND }}>
        <div className="max-w-3xl mx-auto px-4 text-center">

          {/* Frase principal */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-8"
          >
            Recupere seus dentes com implantes dentários e volte a sorrir com segurança
          </motion.h1>

          {/* Vídeo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto max-w-sm rounded-2xl overflow-hidden shadow-2xl shadow-black/40 mb-8 bg-black"
          >
            <video
              src={video1}
              controls
              playsInline
              preload="metadata"
              className="w-full aspect-[9/16] object-cover"
            />
          </motion.div>

          {/* Frase depois do vídeo */}
          <FadeIn className="mb-4">
            <p className="text-white/90 text-base sm:text-lg font-medium leading-relaxed mb-4">
              Implantes com condições facilitadas e avaliação gratuita por tempo limitado na{' '}
              <span className="font-extrabold text-white">Clínica mais bem avaliada da região</span>
            </p>

            {/* Estrelas Google */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <Stars count={5} size="lg" />
              <div className="flex items-center gap-1.5">
                <GoogleIcon />
                <span className="text-white font-bold text-sm">5,0 no Google</span>
                <span className="text-white/70 text-sm">· 146 avaliações</span>
              </div>
            </div>
          </FadeIn>

          {/* CTA */}
          <FadeIn delay={0.1} className="flex flex-col items-center gap-3">
            <CTAButton label="QUERO MINHA AVALIAÇÃO GRATUITA" large />
            <p className="text-white/80 text-sm font-semibold">
              📌 Vagas limitadas
            </p>
          </FadeIn>

        </div>
      </section>

      {/* ══ DOBRA 2 — DORES ═══════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4">

          <FadeIn className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight" style={{ color: BRAND }}>
              Você está passando por alguma dessas situações?
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="mb-10">
            <ul className="space-y-4">
              {[
                'Dificuldade para mastigar',
                'Vergonha de sorrir ou falar',
                'Prótese que machuca ou solta',
                'Falta de dentes afetando sua autoestima',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-gray-700 text-base sm:text-lg font-medium rounded-xl border px-5 py-4 shadow-sm"
                  style={{ borderColor: `${BRAND}40` }}
                >
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: BRAND }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div
              className="rounded-2xl px-6 py-5 text-center"
              style={{ backgroundColor: `${BRAND}15`, border: `2px solid ${BRAND}40` }}
            >
              <p className="text-base sm:text-lg font-bold" style={{ color: BRAND }}>
                👉 Você não precisa mais viver assim.{' '}
                <span className="text-gray-800">Existe solução definitiva.</span>
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3} className="flex justify-center mt-10">
            <CTAButton label="QUERO MINHA AVALIAÇÃO GRATUITA" large />
          </FadeIn>

        </div>
      </section>

      {/* ══ DOBRA 3 — RESULTADOS ══════════════════════════════════════════ */}
      <section className="py-14 sm:py-20" style={{ backgroundColor: BRAND }}>
        <div className="max-w-4xl mx-auto px-4">

          <FadeIn className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Resultados reais de pacientes da Sorria Vida
            </h2>
          </FadeIn>

          {/* Grid desktop */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {FOTOS.map((src, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="rounded-2xl overflow-hidden shadow-xl shadow-black/30 aspect-[3/4]">
                  <img
                    src={src}
                    alt={`Resultado ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Carrossel mobile */}
          <div className="sm:hidden mb-10">
            <FotosCarousel />
          </div>

          <FadeIn className="text-center">
            <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Não fique você de fora dessa mudança, faça igual aos nossos mais de{' '}
              <span className="font-extrabold text-white">2000 pacientes</span>,{' '}
              mude o seu sorriso, mude a sua vida!!
            </p>
            <CTAButton label="QUERO MINHA AVALIAÇÃO GRATUITA" large />
          </FadeIn>

        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════════════════ */}
      <footer className="bg-gray-900 py-8 text-center px-4">
        <img src={logo} alt="Sorria Vida" className="h-10 w-auto mx-auto mb-4 brightness-0 invert opacity-60" />
        <div className="flex justify-center gap-1 mb-2">
          <Stars />
          <span className="text-white/40 text-xs ml-2">5,0 · 146 avaliações</span>
        </div>
        <p className="text-white/30 text-xs mb-1">
          Estrada Adhemar Bebiano, 3960 – Engenho da Rainha, Rio de Janeiro – RJ
        </p>
        <p className="text-white/30 text-xs mb-4">(21) 4102-0210</p>
        <p className="text-white/15 text-xs">
          © {new Date().getFullYear()} Sorria Vida Clínica Odontológica. Todos os direitos reservados.
        </p>
      </footer>

    </div>
  );
}
