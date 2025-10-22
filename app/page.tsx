'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/Button';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-white to-blue-100">
        {/* Animated circles - Plus visibles */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-pink-400 to-pink-300 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400 to-blue-300 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-pink-300 to-blue-300 rounded-full blur-3xl"
        ></motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-full text-sm font-semibold shadow-lg"
          >
            📸 Studio Photo Professionnel
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 font-playfair leading-tight"
          >
            <span className="text-gradient">
              Studio Boudoir
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent"
          >
            Photographie Boudoir • Érotique • Mode
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Révélez votre beauté dans un environnement élégant et professionnel.
            <br className="hidden sm:block" />
            Créez des souvenirs inoubliables qui célèbrent votre confiance et votre sensualité.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
          >
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto min-w-[200px] text-lg shadow-2xl">
                ✨ Réserver Maintenant
              </Button>
            </Link>
            <Link href="/gallery">
              <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px] text-lg">
                📸 Voir la Galerie
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto px-4"
          >
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-pink-200">
                <div className="text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-playfair text-gradient">
              Pourquoi Choisir Notre Studio ?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Une expérience unique et personnalisée pour révéler votre beauté
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="h-full p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-pink-50 to-blue-50 hover:from-pink-100 hover:to-blue-100 transition-all duration-300 shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-pink-300">
                  <div className="text-5xl sm:text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
                {/* Gradient border effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10 blur-xl"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Highlight */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-300 to-pink-200 rounded-full blur-3xl opacity-30"
        ></motion.div>
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-300 to-blue-200 rounded-full blur-3xl opacity-30"
        ></motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/90 backdrop-blur-lg rounded-3xl sm:rounded-[3rem] shadow-2xl p-8 sm:p-12 lg:p-16 text-center max-w-4xl mx-auto border-4 border-pink-200"
          >
            <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-full text-sm font-semibold">
              💎 Offre Unique
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-playfair text-gray-800">
              Une Offre Simple et Transparente
            </h2>

            <motion.div
              initial={{ scale: 0.5 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative inline-block mb-6"
            >
              <div className="text-6xl sm:text-7xl md:text-8xl font-bold text-gradient mb-2">
                300€
              </div>
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-8 -right-8 text-4xl"
              >
                ✨
              </motion.div>
            </motion.div>

            <p className="text-xl sm:text-2xl text-gray-700 mb-8 font-semibold">
              Shooting Photo Complet
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10 max-w-2xl mx-auto text-left">
              {[
                { icon: '⏰', text: 'Aucune limite de temps' },
                { icon: '📷', text: 'Photos éditées sans limite' },
                { icon: '🏠', text: 'Studio professionnel et confortable' },
                { icon: '🤝', text: 'Possibilité de collaboration' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-pink-50 to-blue-50 rounded-xl"
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <Link href="/contact">
              <Button size="lg" className="text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 shadow-2xl hover:scale-105 transition-transform">
                🎯 Réserver Maintenant
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-playfair text-gradient">
              Prêt à Révéler Votre Beauté ?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 px-4 leading-relaxed">
              Contactez-nous dès aujourd'hui pour planifier votre shooting photo
              <br className="hidden sm:block" />
              et commencer cette expérience unique
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto min-w-[200px] text-lg">
                  📞 Nous Contacter
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px] text-lg">
                  💰 Voir les Tarifs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

const stats = [
  { value: '300€', label: 'Prix Fixe' },
  { value: '∞', label: 'Photos Éditées' },
  { value: '5⭐', label: 'Service Premium' },
];

const features = [
  {
    icon: '📸',
    title: 'Expertise Professionnelle',
    description: 'Photographe expérimenté spécialisé dans la photographie boudoir et mode avec un œil artistique unique',
  },
  {
    icon: '✨',
    title: 'Ambiance Élégante',
    description: 'Studio moderne, lumineux et confortable conçu pour vous mettre parfaitement à l\'aise',
  },
  {
    icon: '🎨',
    title: 'Retouche Professionnelle',
    description: 'Toutes vos photos sont soigneusement éditées avec des techniques professionnelles pour un résultat parfait',
  },
  {
    icon: '👗',
    title: 'Conseil Styling',
    description: 'Conseils personnalisés sur les tenues, poses et mises en scène pour sublimer votre beauté',
  },
  {
    icon: '🔒',
    title: 'Confidentialité Totale',
    description: 'Vos photos restent privées et ne seront jamais partagées sans votre consentement explicite',
  },
  {
    icon: '💎',
    title: 'Expérience Premium',
    description: 'Service haut de gamme avec attention aux détails pour une expérience mémorable',
  },
];
