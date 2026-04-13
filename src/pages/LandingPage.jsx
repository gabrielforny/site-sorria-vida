import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2, XCircle } from 'lucide-react';
import logo from '../assets/logo_sorria.png';

import caso1 from '../assets/caso1.png';
import caso2 from '../assets/caso2.png';
import caso3 from '../assets/caso3.jpeg';
import caso4 from '../assets/caso4.png';
import caso5 from '../assets/caso5.png';
import caso6 from '../assets/caso6.png';
import caso7 from '../assets/caso7.png';
import quemCuida from '../assets/quem-cuida-do-seu-sorriso.png';

const CASOS = [caso1, caso2, caso3, caso4, caso5, caso6, caso7];
const WHATSAPP_URL = 'https://api.whatsapp.com/message/XXAKSZZIGXV5E1?autoload=1&app_absent=0';

const TESTIMONIALS = [
  { name: 'Dayse Mendes dos Santos', text: 'Palavras não explicam minha experiência. Logo eu que tenho pânico de dentista. São perfeitos! Atenção, atendimento, preço, qualidade e um retorno ímpar.', stars: 5 },
  { name: 'Marcos Magno', text: 'Fiz dois canais e um implante dentário sem sentir dor nenhuma. Um atendimento humanizado que realmente faz a gente sorrir!', stars: 5 },
  { name: 'Anne Caroline', text: 'Me sinto em casa com essa equipe maravilhosa, quase esqueço que tenho medo de dentista. Preços acessíveis e tudo para o paciente ficar confortável.', stars: 5 },
  { name: 'Anderson Fragoso', text: 'O Dr. Michel Brandão explicou tudo com clareza durante o atendimento. Fui muito bem recebido e todo o processo foi conduzido com profissionalismo.', stars: 5 },
  { name: 'Daiane Honorato', text: 'Após o procedimento recebi mensagens para saber se estava tudo bem ao longo da semana. Simplesmente amei! A Clínica é excelente.', stars: 5 },
  { name: 'Lucas Araújo', text: 'Conseguiram resolver um problema meu que não foi resolvido em outros 4 consultórios. Me deram total apoio e suporte. Clínica excelente!', stars: 5 },
  { name: 'Valvano Trader', text: 'Faço questão de dirigir quase 60 km quando necessário. Excelente clínica odontológica. Dr. Rafael é um ótimo profissional.', stars: 5 },
  { name: 'Paty Monção', text: 'Nunca fui tão bem tratada! Minhas recuperações são ótimas! Estou confiante completamente no resultado final.', stars: 5 },
];

// ── Auxiliares ────────────────────────────────────────────────────────────────

const WhatsAppIcon = ({ className = '' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3 h-3" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

function CTAButton({ label = 'AGENDAR MINHA AVALIAÇÃO GRATUITA', large = false }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-400 text-white font-extrabold rounded-lg uppercase tracking-wide transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-green-500/30 border-b-4 border-green-700 whitespace-nowrap
        ${large ? 'px-8 py-4 text-sm sm:text-base' : 'px-6 py-3.5 text-xs sm:text-sm'}`}
    >
      <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
      {label}
    </a>
  );
}

function FadeIn({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }} className={className}>
      {children}
    </motion.div>
  );
}

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
    </div>
  );
}

function CasosCarousel() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + CASOS.length) % CASOS.length);
  const next = () => setCurrent((c) => (c + 1) % CASOS.length);
  return (
    <div className="relative max-w-sm mx-auto">
      <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-black/50 aspect-[3/4]">
        {CASOS.map((src, i) => (
          <motion.img key={i} src={src} alt={`Caso ${i + 1}`} animate={{ opacity: i === current ? 1 : 0 }} transition={{ duration: 0.35 }} className="absolute inset-0 w-full h-full object-cover" />
        ))}
      </div>
      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur shadow-md flex items-center justify-center hover:bg-white">
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur shadow-md flex items-center justify-center hover:bg-white">
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>
      <div className="flex justify-center gap-1.5 mt-4">
        {CASOS.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-[#0a9396]' : 'w-2 h-2 bg-white/30'}`} />
        ))}
      </div>
      <p className="text-center text-white/40 text-xs mt-2">{current + 1} / {CASOS.length}</p>
    </div>
  );
}

function TestimonialsCarousel() {
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((p) => (p + 1) % TESTIMONIALS.length);
  const prev = () => setIdx((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const visible = [0, 1, 2].map((o) => TESTIMONIALS[(idx + o) % TESTIMONIALS.length]);
  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {visible.map((t, i) => (
          <motion.div key={t.name + idx + i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }} className="bg-white rounded-xl p-6 shadow border border-gray-100 relative flex flex-col">
            <Quote className="w-8 h-8 text-[#0a9396]/10 absolute top-5 right-5" />
            <Stars />
            <p className="text-gray-600 text-sm leading-relaxed my-4 flex-1">"{t.text}"</p>
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <div className="w-9 h-9 rounded-full bg-[#0a9396]/10 flex items-center justify-center flex-shrink-0">
                <span className="text-[#0a9396] font-bold text-xs">{t.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</span>
              </div>
              <div>
                <div className="font-semibold text-gray-800 text-sm">{t.name}</div>
                <div className="text-xs text-gray-400 flex items-center gap-1"><GoogleIcon /> Google</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center gap-3">
        <button onClick={prev} className="w-11 h-11 rounded-full border border-gray-200 bg-white hover:bg-[#0a9396] hover:text-white hover:border-[#0a9396] transition-all flex items-center justify-center">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={next} className="w-11 h-11 rounded-full border border-gray-200 bg-white hover:bg-[#0a9396] hover:text-white hover:border-[#0a9396] transition-all flex items-center justify-center">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// ── Página principal ───────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden font-sans">

      {/* ── BARRA TOPO ─────────────────────────────────────────────────────── */}
      <div className="bg-[#1a1a1a] border-b border-yellow-500/30 py-2 text-center px-4">
        <p className="text-yellow-400 text-xs sm:text-sm font-semibold tracking-wide uppercase">
          Para quem deseja um sorriso bonito, saudável e{' '}
          <span className="font-extrabold">sem dor em Engenho da Rainha, RJ</span>
        </p>
      </div>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#1a1a1a] py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Texto */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="flex items-center gap-2 mb-6">
                <Stars />
                <span className="text-white/60 text-sm">5,0 · 146 avaliações no Google</span>
              </div>

              <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-3">
                Como ter o sorriso que você sempre quis{' '}
                <span className="text-yellow-400">sem medo, sem dor</span>{' '}
                e sem gastar uma fortuna
              </h1>
              <p className="text-white/60 text-base mb-6 leading-relaxed">
                Agende sua avaliação gratuita
              </p>

              <div className="mb-6">
                <CTAButton label="QUERO MINHA AVALIAÇÃO GRATUITA AGORA" large />
              </div>

              <p className="text-white/40 text-sm leading-relaxed">
                Em até 30 minutos nossa equipe faz um diagnóstico completo do seu sorriso,
                identifica o melhor tratamento e apresenta um plano personalizado — sem
                compromisso e sem custo.
              </p>
            </motion.div>

            {/* Grid de casos */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="grid grid-cols-2 gap-3">
              {[caso1, caso2, caso3, caso4].map((src, i) => (
                <div key={i} className="rounded-xl overflow-hidden aspect-[3/4] shadow-lg shadow-black/50">
                  <img src={src} alt={`Transformação ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── DORES ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#222222] py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4">

          <FadeIn className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Você se identifica com algum{' '}
              <span className="text-yellow-400">desses problemas?</span>
            </h2>
          </FadeIn>

          {/* Imagem central */}
          <FadeIn className="flex justify-center mb-10">
            <div className="w-full max-w-md rounded-xl overflow-hidden shadow-2xl shadow-black/50 aspect-[3/4]">
              <img src={caso5} alt="Transformação sorriso" className="w-full h-full object-cover" />
            </div>
          </FadeIn>

          {/* Dois painéis */}
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-10 mb-12">

            <FadeIn delay={0.1}>
              <div className="bg-[#2a2a2a] rounded-xl p-6 border border-white/5">
                <h3 className="text-yellow-400 font-bold text-sm uppercase tracking-wide mb-4">
                  Situações que você vive:
                </h3>
                <ul className="space-y-3">
                  {[
                    'Dentes com manchas, escuros ou tortos',
                    'Medo e trauma de ir ao dentista',
                    'Já investiu em tratamentos sem resultado',
                    'Sente vergonha ao sorrir em fotos',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-white/70 text-sm">
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-[#2a2a2a] rounded-xl p-6 border border-white/5">
                <h3 className="text-yellow-400 font-bold text-sm uppercase tracking-wide mb-4">
                  Como isso afeta sua vida:
                </h3>
                <ul className="space-y-3">
                  {[
                    'Insegurança nas relações pessoais e profissionais',
                    'Evita situações sociais por timidez com o sorriso',
                    'Dor ou sensibilidade que impede de comer bem',
                    'Vontade de mudar mas não sabe por onde começar',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-white/70 text-sm">
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          <FadeIn className="text-center">
            <p className="text-white text-lg sm:text-xl font-bold mb-2">
              Se você disse <span className="text-yellow-400">SIM</span> a qualquer um desses pontos,
            </p>
            <p className="text-white/60 text-base mb-8">
              então você precisa agendar uma{' '}
              <span className="text-yellow-400 font-bold">AVALIAÇÃO GRATUITA</span>
            </p>
            <CTAButton label="QUERO AGENDAR AGORA" large />
          </FadeIn>

        </div>
      </section>

      {/* ── BIO DO DOUTOR ──────────────────────────────────────────────────── */}
      <section className="bg-[#1a1a1a] py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 gap-10 items-center">

            {/* Foto — substitua por img src={fotoDoutor} quando tiver a imagem */}
            <FadeIn>
              <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/50 aspect-[3/4] bg-[#2a2a2a] flex flex-col items-center justify-center border border-white/5">
                <img src={quemCuida} alt="Equipe Sorria Vida" className="w-full h-full object-cover" />
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <span className="text-[#0a9396] text-xs font-bold tracking-widest uppercase">Quem cuida do seu sorriso</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 mb-1 leading-tight">
                CONHEÇA A{' '}
                <span className="text-yellow-400">SORRIA VIDA</span>
              </h2>
              <p className="text-white/40 text-sm mb-5">
                Referência em Odontologia em Engenho da Rainha, RJ
              </p>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                A Sorria Vida é uma clínica odontológica com 5 anos de atuação,
                referência na Zona Norte do Rio de Janeiro. Com uma equipe formada pelos
                <strong className="text-white"> Drs. Michel Brandão e Rafael Rodrigues</strong>,
                já transformamos mais de <strong className="text-white">2.000 sorrisos</strong> com
                atenção, cuidado e um atendimento verdadeiramente humanizado.
              </p>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                Nossa missão é simples: fazer você sorrir de verdade — sem dor, sem medo e com
                resultado que dura. Do canal ao implante, da limpeza ao clareamento, cuidamos
                de você do início ao fim.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  'Mais de 2.000 pacientes atendidos',
                  'Nota 5,0 com 146 avaliações no Google',
                  'Pacientes de toda a Zona Norte e arredores',
                  'Parcelamento em até 12x sem juros',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-white/75 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#0a9396] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <CTAButton label="QUERO AGENDAR UM HORÁRIO" />
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ── NÚMEROS ────────────────────────────────────────────────────────── */}
      <section className="bg-[#0a9396] py-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: '2.000+', label: 'Pacientes atendidos' },
              { value: '5,0 ★', label: 'Nota no Google' },
              { value: '5 anos', label: 'De experiência' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-white font-extrabold text-2xl sm:text-3xl">{s.value}</div>
                <div className="text-white/70 text-xs sm:text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ANTES E DEPOIS ─────────────────────────────────────────────────── */}
      <section className="bg-[#1a1a1a] py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <FadeIn className="text-center mb-10">
            <span className="text-[#0a9396] text-xs font-bold tracking-widest uppercase">Resultados Reais</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Veja as transformações dos{' '}
              <span className="text-yellow-400">nossos pacientes</span>
            </h2>
            <p className="text-white/40 text-sm mt-2">Clique nas setas para ver mais casos</p>
          </FadeIn>

          <CasosCarousel />

          <FadeIn className="flex justify-center mt-10">
            <CTAButton label="QUERO TRANSFORMAR MEU SORRISO" large />
          </FadeIn>
        </div>
      </section>

      {/* ── DEPOIMENTOS ────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <FadeIn className="text-center mb-10">
            <span className="text-[#0a9396] text-xs font-bold tracking-widest uppercase">Depoimentos</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
              O que nossos pacientes{' '}
              <span className="text-[#0a9396]">dizem sobre nós</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <Stars />
              <span className="text-gray-500 text-sm font-semibold">5,0 · 146 avaliações no Google</span>
            </div>
          </FadeIn>

          <TestimonialsCarousel />
        </div>
      </section>

      {/* ── CTA FINAL ──────────────────────────────────────────────────────── */}
      <section className="bg-[#222222] py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <FadeIn>
            <p className="text-[#0a9396] text-xs font-bold tracking-widest uppercase mb-3">Não adie mais</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-3">
              Clique no botão abaixo para{' '}
              <span className="text-yellow-400">agendar sua avaliação gratuita</span>{' '}
              e dê o primeiro passo para o sorriso que você merece.
            </h2>
            <p className="text-white/40 text-sm mb-8">
              Avaliação 100% gratuita · Sem dor · Parcelamos em até 12x sem juros
            </p>
            <CTAButton label="QUERO AGENDAR UM HORÁRIO" large />
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="bg-black py-10 text-center px-4">
        <img src={logo} alt="Sorria Vida" className="h-10 w-auto mx-auto mb-4 brightness-0 invert opacity-60" />
        <div className="flex justify-center gap-4 mb-4">
          <Stars />
          <span className="text-white/40 text-xs">5,0 · 146 avaliações</span>
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
