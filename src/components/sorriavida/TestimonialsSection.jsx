import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Wanderson Ricardo',
    text: 'A melhor Clínica da Zona Norte. Dentistas competentes e atendimento maravilhoso. Recepção com atendimento exemplar, funcionários atenciosos. Nota 100000000!',
    rating: 5,
  },
  {
    name: 'Dayse Mendes dos Santos',
    text: 'Palavras não explicam minha experiência. Logo eu que tenho pânico de dentista. São perfeitos! Atenção, atendimento, preço, qualidade e um retorno ímpar.',
    rating: 5,
  },
  {
    name: 'Marcos Magno',
    text: 'Fiz dois canais e um implante dentário sem sentir dor nenhuma. O carinho com que tratam os pacientes é admirável — um atendimento humanizado que realmente faz a gente sorrir!',
    rating: 5,
  },
  {
    name: 'Patricia de Jesus',
    text: 'SUPER RECOMENDO! A equipe é excelente! Desde a recepção até o atendimento com os dentistas. Os Drs. Michel e Heitor são muito atenciosos e passam segurança pro paciente.',
    rating: 5,
  },
  {
    name: 'Janda RL',
    text: 'Uma palavra me define: Gratidão. Estou muito satisfeita pelo profissionalismo e cuidado de toda a equipe. Clínica com preço acessível e um cuidado ímpar.',
    rating: 5,
  },
  {
    name: 'Stephany Gomes',
    text: 'Fiz a cirurgia de retirada do Siso e foi muito tranquila! O Dr. Michel sempre me auxiliando no WhatsApp quando preciso. Indico muito essa clínica!',
    rating: 5,
  },
  {
    name: 'Lucas Araújo',
    text: 'Conseguiram resolver um problema meu que não foi resolvido em outros 4 consultórios que passei. Me deram total apoio e suporte. Clínica excelente!',
    rating: 5,
  },
  {
    name: 'Lucia Parisi',
    text: 'Minha experiência foi a melhor de toda a minha vida em um consultório odontológico! Dr. Michel, profissional espetacular!!! Recomendo a todos!',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCount = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : typeof window !== 'undefined' && window.innerWidth >= 640 ? 2 : 1;

  const next = () => setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const getVisibleTestimonials = () => {
    const items = [];
    for (let i = 0; i < Math.min(visibleCount, TESTIMONIALS.length); i++) {
      items.push(TESTIMONIALS[(currentIndex + i) % TESTIMONIALS.length]);
    }
    return items;
  };

  return (
    <section id="depoimentos" className="py-24 lg:py-32 bg-primary/5" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">Depoimentos</span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-4">
            O que nossos pacientes{' '}
            <span className="text-primary italic">dizem</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            A satisfação dos nossos pacientes é nosso maior orgulho. Confira os relatos de quem confia na Sorria Vida.
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {getVisibleTestimonials().map((testimonial, i) => (
            <motion.div
              key={testimonial.name + currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-border/50 relative"
            >
              <Quote className="w-10 h-10 text-primary/10 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <svg viewBox="0 0 24 24" className="w-3 h-3" aria-hidden="true">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Google
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-3">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full border border-border bg-white hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="w-12 h-12 rounded-full border border-border bg-white hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
