import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Stethoscope, Smile, CircleDot, Scan, Sparkles, Syringe, Crown, Baby } from 'lucide-react';

const SERVICES = [
  {
    icon: Stethoscope,
    title: 'Clínico Geral',
    description: 'Consultas, diagnósticos e tratamentos preventivos para manter sua saúde bucal em dia.',
  },
  {
    icon: CircleDot,
    title: 'Implantodontia',
    description: 'Implantes dentários com tecnologia de ponta para restaurar seu sorriso com naturalidade.',
  },
  {
    icon: Smile,
    title: 'Ortodontia',
    description: 'Aparelhos ortodônticos modernos e alinhadores para um sorriso perfeitamente alinhado.',
  },
  {
    icon: Scan,
    title: 'Endodontia',
    description: 'Tratamento de canal com técnicas avançadas, garantindo conforto e eficiência.',
  },
  {
    icon: Sparkles,
    title: 'Estética Dental',
    description: 'Facetas, lentes de contato dental e restaurações para um sorriso deslumbrante.',
  },
  {
    icon: Syringe,
    title: 'Estética Facial',
    description: 'Harmonização e rejuvenescimento facial para realçar sua beleza natural.',
  },
  {
    icon: Crown,
    title: 'Prótese',
    description: 'Próteses modernas e personalizadas que devolvem função e estética ao seu sorriso.',
  },
  {
    icon: Baby,
    title: 'Odontopediatria',
    description: 'Cuidado odontológico especializado para crianças em um ambiente lúdico e acolhedor.',
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="servicos" className="py-24 lg:py-32 bg-secondary/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">Especialidades</span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-4">
            <span className="whitespace-nowrap">Nossos <span className="text-primary italic">serviços</span></span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Oferecemos uma ampla gama de tratamentos odontológicos para cuidar de toda a sua família
            com excelência e tecnologia avançada.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 border border-border/50"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-primary flex items-center justify-center transition-colors duration-500 mb-5">
                <service.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-14"
        >
          <a
            href="https://api.whatsapp.com/message/XXAKSZZIGXV5E1?autoload=1&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-base font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25"
          >
            Agendar Consulta
          </a>
        </motion.div>
      </div>
    </section>
  );
}
