'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';

const sampleImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800',
    title: 'Boudoir Élégant',
    category: 'boudoir',
    height: 600,
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800',
    title: 'Portrait Mode',
    category: 'mode',
    height: 500,
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800',
    title: 'Style Artistique',
    category: 'artistique',
    height: 550,
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800',
    title: 'Boudoir Intimiste',
    category: 'boudoir',
    height: 650,
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800',
    title: 'Portrait Naturel',
    category: 'mode',
    height: 500,
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800',
    title: 'Glamour',
    category: 'mode',
    height: 600,
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800',
    title: 'Élégance',
    category: 'boudoir',
    height: 550,
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=800',
    title: 'Beauté Naturelle',
    category: 'artistique',
    height: 600,
  },
  {
    id: 9,
    url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800',
    title: 'Portrait Studio',
    category: 'mode',
    height: 500,
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
  const [selectedImage, setSelectedImage] = useState<(typeof sampleImages)[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredImages =
    selectedCategory === 'all'
      ? sampleImages
      : sampleImages.filter((img) => img.category === selectedCategory);

  useEffect(() => {
    if (selectedImage) {
      const index = filteredImages.findIndex((img) => img.id === selectedImage.id);
      setCurrentIndex(index);
    }
  }, [selectedImage, filteredImages]);

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const goToPrev = () => {
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'Escape') setSelectedImage(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-32 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm tracking-[0.3em] uppercase text-gray-500 font-light mb-6 block">
              Portfolio
            </span>
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl mb-6 tracking-tight">
              <span className="italic">Galerie</span>
            </h1>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              Découvrez notre collection de photographies boudoir, mode et artistiques
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-24 bg-white/95 backdrop-blur-lg z-40 py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 text-sm tracking-wider uppercase font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-black text-white'
                    : 'bg-transparent text-gray-500 hover:text-black border border-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid - Masonry Layout */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <ScrollReveal key={image.id} delay={index * 0.05}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="mb-6 break-inside-avoid group cursor-pointer hover-lift"
                  onClick={() => setSelectedImage(image)}
                  style={{ height: `${image.height}px` }}
                >
                  <div className="relative w-full h-full overflow-hidden bg-gray-100">
                    <Image
                      src={image.url}
                      alt={image.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-white text-xl font-display mb-1">{image.title}</h3>
                      <span className="text-white/70 text-sm tracking-wider uppercase">
                        {image.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-8 right-8 text-white/60 hover:text-white text-sm tracking-wider uppercase z-10 transition-colors"
            >
              Fermer
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="absolute left-8 text-white/60 hover:text-white text-4xl z-10 transition-colors"
            >
              ←
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-8 text-white/60 hover:text-white text-4xl z-10 transition-colors"
            >
              →
            </button>

            {/* Image Counter */}
            <div className="absolute top-8 left-8 text-white/60 text-sm tracking-wider">
              {currentIndex + 1} / {filteredImages.length}
            </div>

            {/* Image */}
            <motion.div
              key={selectedImage.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl max-h-[80vh] w-full mx-8"
            >
              <div className="relative aspect-[3/4] w-full h-full">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-white text-2xl font-display mb-2">{selectedImage.title}</h3>
                <span className="text-white/60 uppercase tracking-wider text-sm">
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
