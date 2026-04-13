import Navbar from '../components/sorriavida/Navbar';
import HeroSection from '../components/sorriavida/HeroSection';
import AboutSection from '../components/sorriavida/AboutSection';
import ServicesSection from '../components/sorriavida/ServicesSection';
import DifferentialsSection from '../components/sorriavida/DifferentialsSection';
import TestimonialsSection from '../components/sorriavida/TestimonialsSection';
import CTABanner from '../components/sorriavida/CTABanner';
import ContactSection from '../components/sorriavida/ContactSection';
import Footer from '../components/sorriavida/Footer';
import WhatsAppButton from '../components/sorriavida/WhatsAppButton';

const IMAGES = {
  hero: 'https://media.base44.com/images/public/69c356d48734cc58c9d145ce/092d18789_generated_e022d882.png',
  team: 'https://media.base44.com/images/public/69c356d48734cc58c9d145ce/d634d972f_generated_279093a3.png',
  clinic: 'https://media.base44.com/images/public/69c356d48734cc58c9d145ce/d17e928e5_generated_b1ccb9b4.png',
  patient: 'https://media.base44.com/images/public/69c356d48734cc58c9d145ce/a689f182b_generated_98089552.png',
  tech: 'https://media.base44.com/images/public/69c356d48734cc58c9d145ce/15159013f_generated_241949ab.png',
  transformation: 'https://media.base44.com/images/public/69c356d48734cc58c9d145ce/768dae97d_generated_42771683.png',
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection heroImage={IMAGES.hero} />
      <AboutSection teamImage={IMAGES.team} />
      <ServicesSection />
      <DifferentialsSection clinicImage={IMAGES.clinic} techImage={IMAGES.tech} />
      <TestimonialsSection />
      <CTABanner patientImage={IMAGES.patient} />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}