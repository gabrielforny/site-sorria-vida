import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Shield, Award, Users } from 'lucide-react';

const STATS = [
  { icon: Users, value: '2000+', label: 'Pacientes Atendidos' },
  { icon: Award, value: '5', label: 'Anos de Experiência' },
  { icon: Heart, value: '100%', label: 'Dedicação' },
  { icon: Shield, value: '5.0', label: 'Avaliação Google' },
];

export default function AboutSection({ teamImage }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="sobre" className="py-24 lg:py-32 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10">
              <img
                src={teamImage}
                alt="Equipe Sorria Vida"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 max-w-[220px]">
              <div className="text-3xl font-bold text-primary font-playfair">5</div>
              <div className="text-sm text-muted-foreground mt-1">Anos transformando sorrisos no Rio de Janeiro</div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-primary font-semibold text-sm tracking-widest uppercase">Quem Somos</span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-6 leading-tight">
              Cuidado que transforma{' '}
              <span className="text-primary italic">vidas</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Bem-vindo à <strong className="text-foreground">Sorria Vida</strong>, onde oferecemos cuidados odontológicos
                excepcionais e personalizados. Com uma equipe de profissionais altamente qualificados e
                especializados em diversas áreas, nossa clínica é referência na área odontológica.
              </p>
              <p>
                Buscamos proporcionar um atendimento individualizado, baseado em evidências científicas
                e tecnologias inovadoras. Nossa missão é ajudar os pacientes a alcançarem sorrisos
                saudáveis e bonitos, melhorando sua qualidade de vida.
              </p>
              <p>
                Em um ambiente acolhedor e moderno, garantimos segurança e conforto aos nossos pacientes,
                utilizando equipamentos de última geração e seguindo rigorosos padrões de biossegurança.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-lg">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
