'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/Button';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-pink-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-4 font-playfair bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent"
          >
            Tarifs
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-700"
          >
            Une offre simple, transparente et sans limite
          </motion.p>
        </div>
      </div>

      {/* Main Pricing Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-white p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 text-gray-800 font-playfair">
                  Shooting Photo Complet
                </h2>
                <div className="flex items-center justify-center mb-4">
                  <span className="text-7xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
                    300€
                  </span>
                </div>
                <p className="text-gray-600 text-lg">
                  Tout ce dont vous avez besoin pour un shooting inoubliable
                </p>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                  Ce qui est inclus
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-blue-400 rounded-full flex items-center justify-center text-white text-xl">
                          {feature.icon}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">{feature.title}</h4>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center pt-8 border-t border-gray-200">
                  <Link href="/contact">
                    <Button size="lg" className="text-lg px-12 py-4">
                      Réserver votre shooting
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Collaboration Section */}
      <div className="bg-gradient-to-br from-pink-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6 font-playfair text-gray-800">
              Collaboration & Partenariat
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Vous êtes mannequin, influenceur, ou vous souhaitez établir un partenariat ?
              Nous sommes ouverts aux collaborations créatives et aux projets spéciaux.
            </p>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">🤝</div>
                  <h3 className="font-semibold text-gray-800 mb-2">Partenariats</h3>
                  <p className="text-gray-600 text-sm">
                    Collaborations avec des marques et créateurs
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">📸</div>
                  <h3 className="font-semibold text-gray-800 mb-2">TFP/TFCD</h3>
                  <p className="text-gray-600 text-sm">
                    Échange de services pour projets créatifs
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">✨</div>
                  <h3 className="font-semibold text-gray-800 mb-2">Projets Spéciaux</h3>
                  <p className="text-gray-600 text-sm">
                    Événements et shoots personnalisés
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <Link href="/contact">
                  <Button variant="outline" size="lg">
                    Discutons de votre projet
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-12 text-center font-playfair text-gray-800">
            Questions Fréquentes
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl p-6"
              >
                <h3 className="font-semibold text-lg mb-2 text-gray-800">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: '⏰',
    title: 'Temps illimité',
    description: 'Prenez tout le temps nécessaire pour vous sentir à l\'aise et obtenir les meilleurs clichés',
  },
  {
    icon: '📷',
    title: 'Photos sans limite',
    description: 'Toutes vos photos sont éditées professionnellement, sans restriction de nombre',
  },
  {
    icon: '🎨',
    title: 'Retouche professionnelle',
    description: 'Chaque photo est soigneusement retouchée pour un résultat parfait',
  },
  {
    icon: '🏠',
    title: 'Studio professionnel',
    description: 'Équipement haut de gamme et environnement confortable et élégant',
  },
  {
    icon: '👗',
    title: 'Conseil styling',
    description: 'Conseils sur les tenues et poses pour mettre en valeur votre beauté',
  },
  {
    icon: '💎',
    title: 'Galerie privée',
    description: 'Accès à une galerie en ligne privée pour visualiser et télécharger vos photos',
  },
];

const faqs = [
  {
    question: 'Combien de temps dure une séance photo ?',
    answer: 'Il n\'y a aucune limite de temps ! La séance dure aussi longtemps que nécessaire pour que vous vous sentiez à l\'aise et que nous obtenions les photos parfaites. En moyenne, une séance dure entre 2 et 4 heures.',
  },
  {
    question: 'Combien de photos vais-je recevoir ?',
    answer: 'Toutes les photos réalisées pendant la séance sont éditées et vous sont livrées. Il n\'y a aucune limite de nombre.',
  },
  {
    question: 'Dois-je apporter mes propres tenues ?',
    answer: 'Oui, nous vous encourageons à apporter plusieurs tenues qui vous mettent en confiance. Nous vous donnons des conseils avant la séance sur les styles qui fonctionnent le mieux.',
  },
  {
    question: 'Les photos sont-elles confidentielles ?',
    answer: 'Absolument ! Votre vie privée est notre priorité. Vos photos ne seront jamais partagées sans votre consentement écrit explicite.',
  },
  {
    question: 'Puis-je venir accompagné(e) ?',
    answer: 'Vous pouvez venir avec une personne de confiance si cela vous aide à vous sentir plus à l\'aise.',
  },
];
