'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Données de démonstration - à remplacer par les vraies données de la base de données
const sampleImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800',
    title: 'Boudoir Élégant',
    category: 'boudoir'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800',
    title: 'Portrait Mode',
    category: 'mode'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800',
    title: 'Style Artistique',
    category: 'artistique'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800',
    title: 'Boudoir Intimiste',
    category: 'boudoir'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800',
    title: 'Portrait Naturel',
    category: 'mode'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800',
    title: 'Glamour',
    category: 'mode'
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800',
    title: 'Élégance',
    category: 'boudoir'
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=800',
    title: 'Beauté Naturelle',
    category: 'artistique'
  },
  {
    id: 9,
    url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800',
    title: 'Portrait Studio',
    category: 'mode'
  },
];

const categories = [
  { id: 'all', label: 'Tous' },
  { id: 'boudoir', label: 'Boudoir' },
  { id: 'mode', label: 'Mode' },
  { id: 'artistique', label: 'Artistique' },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<typeof sampleImages[0] | null>(null);

  const filteredImages = selectedCategory === 'all'
    ? sampleImages
    : sampleImages.filter(img => img.category === selectedCategory);

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
            Galerie
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-700"
          >
            Découvrez notre portfolio de photographies boudoir, érotique et mode
          </motion.p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 bg-white/95 backdrop-blur-sm shadow-sm z-40 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-pink-400 to-blue-400 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-lg group"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.url}
                  alt={image.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-semibold text-xl mb-2">{image.title}</h3>
                    <span className="text-pink-300 text-sm uppercase tracking-wider">
                      {image.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-4xl hover:text-pink-400 transition-colors z-10"
            >
              &times;
            </button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[90vh] w-full"
            >
              <div className="relative aspect-[3/4] w-full h-full">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-white text-2xl font-semibold mb-2">{selectedImage.title}</h3>
                <span className="text-pink-400 uppercase tracking-wider">
                  {selectedImage.category}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
