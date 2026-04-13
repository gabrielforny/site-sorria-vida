import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export default function CTABanner({ patientImage }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-24 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0">
        <img src={patientImage} alt="Cuidado dental" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/85" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Agende sua consulta e comece a transformação do seu sorriso
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Nossa equipe está pronta para te receber com todo o cuidado e atenção que você merece.
          </p>
          <a
            href="https://api.whatsapp.com/message/XXAKSZZIGXV5E1?autoload=1&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-primary px-10 py-4 rounded-full text-base font-semibold hover:bg-white/90 transition-all duration-300 shadow-xl group"
          >
            Agendar Agora
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}