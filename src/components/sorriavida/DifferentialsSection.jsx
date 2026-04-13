import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck, Zap, Clock, HeartHandshake, Microscope, MapPin } from 'lucide-react';

const DIFFERENTIALS = [
  {
    icon: ShieldCheck,
    title: 'Biossegurança',
    description: 'Rigorosos protocolos de esterilização e higiene em todos os procedimentos.',
  },
  {
    icon: Zap,
    title: 'Tecnologia Avançada',
    description: 'Equipamentos de última geração para diagnósticos e tratamentos precisos.',
  },
  {
    icon: HeartHandshake,
    title: 'Atendimento Humanizado',
    description: 'Cada paciente é único e recebe atenção personalizada e acolhedora.',
  },
  {
    icon: Microscope,
    title: 'Profissionais Especializados',
    description: 'Equipe altamente qualificada com especialização em diversas áreas.',
  },
  {
    icon: Clock,
    title: 'Horários Flexíveis',
    description: 'Agenda adaptada para atender às necessidades da sua rotina.',
  },
  {
    icon: MapPin,
    title: 'Localização Acessível',
    description: 'Fácil acesso em Engenho da Rainha, Rio de Janeiro.',
  },
];

export default function DifferentialsSection({ clinicImage, techImage }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 lg:py-32 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-semibold text-sm tracking-widest uppercase">Diferenciais</span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-6 leading-tight">
              Por que escolher a{' '}
              <span className="text-primary italic">Sorria Vida?</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Nossa missão é proporcionar a melhor experiência odontológica, combinando 
              excelência técnica com um ambiente acolhedor e humano.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {DIFFERENTIALS.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="flex gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-lg h-64">
                <img src={clinicImage} alt="Clínica Sorria Vida" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl bg-primary p-6 text-white">
                <div className="text-3xl font-bold font-playfair">100%</div>
                <div className="text-sm text-white/80 mt-1">Equipamentos esterilizados e descartáveis</div>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="rounded-2xl bg-accent/10 p-6 border border-accent/20">
                <div className="text-3xl font-bold font-playfair text-accent">5★</div>
                <div className="text-sm text-muted-foreground mt-1">Nota máxima no Google com 31+ avaliações</div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg h-64">
                <img src={techImage} alt="Tecnologia dental" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}