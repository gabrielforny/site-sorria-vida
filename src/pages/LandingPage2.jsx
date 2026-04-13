/**
 * Landing Page 2 — baseada no layout de sucessodontoselect.com.br/clinicorp-vendas/
 * Mesma estrutura visual, conteúdo adaptado para a Sorria Vida.
 */
import logo from '../assets/logo_sorria.png';
import quemCuida from '../assets/quem-cuida-do-seu-sorriso.png';
import caso3 from '../assets/caso3.jpeg';

const WHATSAPP_URL = 'https://api.whatsapp.com/message/XXAKSZZIGXV5E1?autoload=1&app_absent=0';

// ── Ícones ─────────────────────────────────────────────────────────────────

const WhatsAppIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const StarIcon = () => (
  <svg className="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const DotIcon = () => (
  <span className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0 mt-1.5 inline-block" />
);

// ── CTA Button (igual ao da referência) ───────────────────────────────────

function CTA({ label = 'QUERO AGENDAR UM HORÁRIO', fullWidth = false }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-3 bg-[#4CAF50] hover:bg-[#43A047] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider py-4 px-6 rounded transition-colors duration-200 border-b-[3px] border-[#388E3C] shadow-md whitespace-nowrap ${fullWidth ? 'w-full' : ''}`}
    >
      <WhatsAppIcon />
      {label}
    </a>
  );
}

// ── Página ─────────────────────────────────────────────────────────────────

export default function LandingPage2() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>

      {/* ══ BARRA DE ANÚNCIO ══════════════════════════════════════════════ */}
      <div className="bg-[#1c1c1c] border-b border-yellow-500/20 py-2.5 px-4 text-center">
        <p className="text-xs sm:text-sm font-semibold tracking-widest text-white/80 uppercase">
          Para quem deseja{' '}
          <span className="text-yellow-400 font-extrabold">transformar o sorriso</span>
          {' '}em Rio de Janeiro
        </p>
      </div>

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#2d2d2d] py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            {/* Coluna esquerda */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-snug mb-2">
                Como ter o sorriso que você sempre sonhou{' '}
                <span className="text-yellow-400">sem medo, sem dor</span>{' '}
                e sem gastar uma fortuna na sua cidade?
              </h1>
              <p className="text-white/70 text-base font-medium mb-6">
                Agende sua avaliação gratuita
              </p>

              <div className="mb-6">
                <CTA label="QUERO MEU PLANO DE TRATAMENTO AGORA" fullWidth />
              </div>

              <p className="text-white/55 text-sm leading-relaxed">
                Em 30 minutos, os Drs. Michel Brandão e Rafael Rodrigues, dentistas
                referência em Engenho da Rainha com mais de 2.000 pacientes atendidos,
                vão fazer um diagnóstico completo do seu sorriso, identificando todos
                os pontos de melhoria e o melhor tratamento para você conquistar
                resultados acima do que imagina.
              </p>
            </div>

            {/* Coluna direita — foto */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-sm rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={quemCuida}
                  alt="Drs. Michel Brandão e Rafael Rodrigues — Sorria Vida"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ PROBLEMAS ═════════════════════════════════════════════════════ */}
      <section className="bg-[#2d2d2d] border-t border-white/5 py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">

          {/* Título */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-10 leading-tight">
            Você tem algum desses problemas{' '}
            <span className="text-yellow-400">com o seu sorriso?</span>
          </h2>

          {/* Imagem central */}
          <div className="flex justify-center mb-10">
            <div className="w-full max-w-md rounded-lg overflow-hidden shadow-2xl border border-white/5">
              <img src={caso3} alt="Transformação sorriso" className="w-full object-cover" />
            </div>
          </div>

          {/* Dois painéis de problemas */}
          <div className="max-w-2xl mx-auto w-full">
          <div className="grid sm:grid-cols-2 gap-8 mb-12">

            <div>
              <h3 className="text-yellow-400 font-bold text-sm uppercase tracking-wider mb-4">
                Isso acontece com o seu sorriso?
              </h3>
              <ul className="space-y-3">
                {[
                  'Dentes escuros, manchados ou tortos',
                  'Dificuldade em definir o tratamento certo',
                  'Sensibilidade ou dor ao comer e beber',
                  'Falta de clareza sobre os custos e o processo',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/75 text-sm">
                    <DotIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-yellow-400 font-bold text-sm uppercase tracking-wider mb-4">
                Você sofre com:
              </h3>
              <ul className="space-y-3">
                {[
                  'Vergonha de sorrir em fotos e reuniões',
                  'Medo e trauma de ir ao dentista',
                  'Falta de tempo para cuidar da saúde bucal',
                  'Reflexos na autoestima e nas relações pessoais',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/75 text-sm">
                    <DotIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
          </div>

          {/* Callout + CTA */}
          <div className="text-center">
            <p className="text-white text-xl sm:text-2xl font-extrabold mb-1">
              Se você disse{' '}
              <span className="text-yellow-400">sim</span>{' '}
              a qualquer item, então você
            </p>
            <p className="text-white text-xl sm:text-2xl font-extrabold mb-8">
              <span className="text-yellow-400">PRECISA</span>{' '}
              agendar uma{' '}
              <span className="text-yellow-400">AVALIAÇÃO GRATUITA</span>
            </p>
            <CTA label="QUERO AGENDAR UM HORÁRIO" />
          </div>

        </div>
      </section>

      {/* ══ BIO / IDEALIZADORES ═══════════════════════════════════════════ */}
      <section className="bg-[#2d2d2d] border-t border-white/5 py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <div className="grid sm:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Foto */}
            <div className="flex justify-center sm:justify-start">
              <div className="w-full max-w-xs sm:max-w-none rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={quemCuida}
                  alt="Equipe Sorria Vida"
                  className="w-full object-cover"
                />
              </div>
            </div>

            {/* Texto */}
            <div className="flex flex-col justify-center">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight mb-5">
                OS IDEALIZADORES DA{' '}
                <span className="text-yellow-400">SORRIA VIDA</span>
              </h2>

              <p className="text-white/65 text-sm leading-relaxed mb-4">
                Os Drs. Michel Brandão e Rafael Rodrigues são nomes conhecidos na
                Odontologia da Zona Norte do Rio de Janeiro. Juntos, já ministraram
                tratamentos e acompanharam a evolução de mais de{' '}
                <strong className="text-white">2.000 pacientes</strong> com resultados
                reais e sorrisos transformados.
              </p>

              <p className="text-white/65 text-sm leading-relaxed mb-4">
                São mais de <strong className="text-white">5 anos</strong> de experiência
                dedicados a oferecer um atendimento humanizado, sem dor e com tecnologia
                de ponta — para que cada paciente saia da cadeira sorrindo de verdade.
              </p>

              <p className="text-white/65 text-sm leading-relaxed mb-8">
                O maior objetivo deles é mudar a relação das pessoas com o dentista:
                deixar o medo para trás, valorizando a saúde bucal como parte essencial
                do bem-estar e da autoestima.
              </p>

              <p className="text-white text-base font-bold mb-1">
                Clique no botão abaixo para{' '}
                <span className="text-yellow-400">fazer sua avaliação gratuita</span>{' '}
                e receber um plano de tratamento personalizado.
              </p>
              <p className="text-white/60 text-sm mb-6">
                Dê esse passo decisivo para transformar o seu sorriso em{' '}
                {new Date().getFullYear()}.
              </p>

              <CTA label="QUERO AGENDAR UM HORÁRIO" />
            </div>

          </div>
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════════════════ */}
      <footer className="bg-[#1a1a1a] py-10 px-4">
        <div className="max-w-xl mx-auto text-center">

          {/* Logo */}
          <img
            src={logo}
            alt="Sorria Vida"
            className="h-10 w-auto mx-auto mb-5 brightness-0 invert opacity-70"
          />

          {/* Ícones sociais */}
          <div className="flex justify-center gap-5 mb-5 text-white/40">
            {/* Localização */}
            <a href="https://maps.google.com/?q=Estrada+Adhemar+Bebiano+3960+Rio+de+Janeiro" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {/* Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>

          {/* Endereço */}
          <p className="text-white/35 text-xs mb-1">
            Sorria Vida Clínica Odontológica
          </p>
          <p className="text-white/35 text-xs mb-1">
            Estrada Adhemar Bebiano, 3960 – Engenho da Rainha, Rio de Janeiro – RJ, 20766-721
          </p>
          <p className="text-white/35 text-xs mb-5">
            (21) 4102-0210
          </p>

          {/* Links */}
          <div className="flex justify-center gap-6 mb-5 text-white/30 text-xs">
            <a href="#" className="hover:text-white/50 transition-colors">Políticas de Privacidade e Sigilo</a>
            <span>|</span>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors">Contato</a>
          </div>

          {/* Estrelas */}
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
          </div>

          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Sorria Vida. Todos os direitos reservados.
          </p>
        </div>
      </footer>

    </div>
  );
}
