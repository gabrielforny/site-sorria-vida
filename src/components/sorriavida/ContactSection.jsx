import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const CONTACT_INFO = [
  {
    icon: MapPin,
    title: 'Endereço',
    lines: ['Estrada Adhemar Bebiano, 3960', 'Engenho da Rainha - Rio de Janeiro/RJ'],
    href: 'https://www.google.com/maps/place/Estrada+Adhemar+Bebiano,+3690+-+Engenho+da+Rainha,+Rio+de+Janeiro+-+RJ',
  },
  {
    icon: Phone,
    title: 'Telefone',
    lines: ['(21) 4102-0210'],
    href: 'tel:2141020210',
  },
  {
    icon: WhatsAppIcon,
    title: 'WhatsApp',
    lines: ['(21) 96529-5247'],
    href: 'https://api.whatsapp.com/message/XXAKSZZIGXV5E1?autoload=1&app_absent=0',
  },
  {
    icon: Mail,
    title: 'E-mail',
    lines: ['contato@sorriavida.com.br'],
    href: 'mailto:contato@sorriavida.com.br',
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contato" className="py-24 lg:py-32 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">Contato</span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-4">
            <span className="whitespace-nowrap">Entre em <span className="text-primary italic">contato</span></span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Estamos prontos para cuidar do seu sorriso. Agende uma consulta ou tire suas dúvidas.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            {CONTACT_INFO.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 rounded-xl bg-white border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary flex items-center justify-center flex-shrink-0 transition-colors duration-300 text-primary group-hover:text-white">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  {item.lines.map((line, j) => (
                    <p key={j} className="text-sm text-muted-foreground">{line}</p>
                  ))}
                </div>
              </a>
            ))}

            {/* Schedule Card */}
            <div className="flex items-start gap-4 p-5 rounded-xl bg-primary text-white">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Horário de Funcionamento</h3>
                <p className="text-sm text-white/80">Segunda a Sexta: 8h às 18h</p>
                <p className="text-sm text-white/80">Sábado: 8h às 13h</p>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="rounded-2xl overflow-hidden shadow-lg border border-border/50 h-[420px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.5!2d-43.2912895!3d-22.8652762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997c8a7c23e04f%3A0x10943d45c5e076c7!2sEstrada+Adhemar+Bebiano%2C+3690+-+Engenho+da+Rainha%2C+Rio+de+Janeiro+-+RJ%2C+20766-721!5e0!3m2!1spt-BR!2sbr!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Sorria Vida"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
