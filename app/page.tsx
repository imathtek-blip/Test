'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import MagneticButton from '@/components/MagneticButton';
import AnimatedCounter from '@/components/AnimatedCounter';
import ParallaxSection from '@/components/ParallaxSection';

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 max-w-6xl mx-auto px-6 text-center py-32"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <span className="text-sm tracking-[0.3em] uppercase text-gray-500 font-light">
              Photographie Premium
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-display text-6xl md:text-8xl lg:text-9xl mb-8 tracking-tight leading-none"
          >
            Studio
            <br />
            <span className="italic">Boudoir</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-600 mb-16 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Capturer votre essence dans un environnement élégant et intime.
            <br />
            Une expérience photographique qui célèbre votre beauté naturelle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <MagneticButton strength={0.3}>
              <Link href="/contact" className="btn-elegant text-xs px-12 py-4">
                Réserver une Session
              </Link>
            </MagneticButton>
            <Link
              href="/gallery"
              className="elegant-line text-sm tracking-wider uppercase font-medium"
            >
              Voir la Galerie
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-16 bg-gradient-to-b from-transparent via-black to-transparent"
          />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="font-display text-5xl md:text-6xl mb-3 tracking-tight">
                    {stat.animated && typeof stat.value === 'number' ? (
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    ) : (
                      <>
                        {stat.value}
                        {stat.suffix}
                      </>
                    )}
                  </div>
                  <div className="text-sm tracking-wider uppercase text-gray-500 font-light">
                    {stat.label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div>
                <h2 className="font-display text-5xl md:text-6xl mb-8 tracking-tight leading-tight">
                  Une expérience
                  <br />
                  <span className="italic">unique</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6 font-light">
                  Notre studio offre un environnement élégant et confortable où vous
                  pouvez vous sentir en confiance et révéler votre beauté authentique.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-8 font-light">
                  Chaque séance est une collaboration artistique personnalisée,
                  conçue pour capturer votre essence de manière intemporelle et
                  raffinée.
                </p>
                <MagneticButton strength={0.2}>
                  <Link href="/contact" className="btn-elegant text-xs px-10 py-3">
                    Découvrir
                  </Link>
                </MagneticButton>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <ParallaxSection speed={0.3}>
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-sm overflow-hidden hover-lift">
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm tracking-wider">
                    IMAGE PORTFOLIO
                  </div>
                </div>
              </ParallaxSection>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="font-display text-5xl md:text-6xl mb-6 tracking-tight">
                Nos <span className="italic">Services</span>
              </h2>
              <p className="text-lg text-gray-400 font-light">
                Des séances photographiques adaptées à vos envies
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="group hover-lift p-8 border border-white/10 hover:border-white/30 transition-colors">
                  <div className="text-4xl mb-6">{service.icon}</div>
                  <h3 className="text-2xl font-display mb-4 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed font-light mb-6">
                    {service.description}
                  </p>
                  <div className="text-sm tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    En savoir plus →
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-5xl md:text-6xl mb-6 tracking-tight">
                Tarif <span className="italic">Unique</span>
              </h2>
              <p className="text-lg text-gray-600 font-light">
                Une offre simple et transparente
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="glass-dark p-12 md:p-16 text-center hover-lift border border-gray-200">
              <div className="font-display text-7xl md:text-8xl mb-6 tracking-tight">
                300€
              </div>
              <div className="text-xl mb-12 tracking-wide uppercase font-light text-gray-600">
                Session Complète
              </div>

              <div className="space-y-4 mb-12 max-w-md mx-auto">
                {pricingFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-left text-gray-700"
                  >
                    <div className="w-1 h-1 bg-black rounded-full" />
                    <span className="font-light">{feature}</span>
                  </div>
                ))}
              </div>

              <MagneticButton strength={0.3}>
                <Link href="/contact" className="btn-elegant text-xs px-12 py-4">
                  Réserver Maintenant
                </Link>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl mb-8 tracking-tight leading-tight">
              Prêt à révéler
              <br />
              <span className="italic">votre beauté ?</span>
            </h2>
            <p className="text-lg text-gray-600 mb-12 font-light">
              Contactez-nous pour planifier votre séance photographique
            </p>
            <MagneticButton strength={0.3}>
              <Link href="/contact" className="btn-elegant text-xs px-12 py-4">
                Nous Contacter
              </Link>
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

const stats: Array<{
  value: number | string;
  suffix: string;
  label: string;
  animated: boolean;
}> = [
  { value: 300, suffix: '€', label: 'Prix Fixe', animated: true },
  { value: '∞', suffix: '', label: 'Photos Éditées', animated: false },
  { value: 100, suffix: '+', label: 'Clients Satisfaits', animated: true },
];

const services = [
  {
    icon: '○',
    title: 'Boudoir',
    description:
      'Des portraits intimes et élégants qui célèbrent votre féminité dans un cadre raffiné et confortable.',
  },
  {
    icon: '△',
    title: 'Mode',
    description:
      'Photographies artistiques et contemporaines mettant en valeur votre style et votre personnalité unique.',
  },
  {
    icon: '□',
    title: 'Artistique',
    description:
      'Créations photographiques sur mesure pour des projets personnels ou professionnels exigeants.',
  },
];

const pricingFeatures = [
  'Durée illimitée',
  'Photos éditées sans limite',
  'Studio professionnel équipé',
  'Retouche professionnelle incluse',
  'Livraison digitale haute résolution',
  'Conseils styling personnalisés',
];
