'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Accueil', icon: '🏠' },
    { href: '/gallery', label: 'Galerie', icon: '📸' },
    { href: '/pricing', label: 'Tarifs', icon: '💎' },
    { href: '/contact', label: 'Contact', icon: '✉️' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-pink-50 via-white to-blue-50 backdrop-blur-md shadow-lg border-b-2 border-pink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-blue-400 flex items-center justify-center text-2xl shadow-lg group-hover:shadow-xl transition-shadow"
            >
              📷
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden sm:block"
            >
              <div className="text-2xl font-bold font-playfair text-gradient">
                Studio Boudoir
              </div>
              <div className="text-xs text-gray-500 -mt-1">Photographie Élégante</div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="group relative px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xl">{link.icon}</span>
                    <span className="text-gray-700 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-blue-500 group-hover:bg-clip-text">
                      {link.label}
                    </span>
                  </span>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Button Desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden md:block"
          >
            <Link
              href="/contact"
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Réserver
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl bg-gradient-to-r from-pink-100 to-blue-100 hover:from-pink-200 hover:to-blue-200 transition-all"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gradient-to-br from-pink-50 to-blue-50 border-t border-pink-200"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-3 py-3 px-4 rounded-xl bg-white hover:bg-gradient-to-r hover:from-pink-100 hover:to-blue-100 transition-all shadow-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-2xl">{link.icon}</span>
                    <span className="text-gray-700 font-medium">{link.label}</span>
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/contact"
                className="block mt-4 py-3 px-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white text-center rounded-xl font-semibold shadow-lg"
                onClick={() => setIsOpen(false)}
              >
                Réserver maintenant
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
