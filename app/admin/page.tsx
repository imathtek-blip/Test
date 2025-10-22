'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/Button';
import Image from 'next/image';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  type: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface ImageData {
  id: string;
  title: string;
  url: string;
  category: string;
  featured: boolean;
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'contacts' | 'images' | 'settings'>('contacts');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [images, setImages] = useState<ImageData[]>([]);
  const [newImage, setNewImage] = useState({
    title: '',
    url: '',
    category: 'boudoir',
  });

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà authentifié
    const auth = localStorage.getItem('admin-auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadContacts();
      loadImages();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Authentification simple - À REMPLACER par une vraie authentification en production
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('admin-auth', 'true');
      loadContacts();
      loadImages();
    } else {
      alert('Mot de passe incorrect');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin-auth');
  };

  const loadContacts = async () => {
    try {
      const response = await fetch('/api/contact');
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des contacts:', error);
    }
  };

  const loadImages = () => {
    // Charger depuis localStorage pour la démo
    const savedImages = localStorage.getItem('admin-images');
    if (savedImages) {
      setImages(JSON.parse(savedImages));
    }
  };

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    const newImageData: ImageData = {
      id: Date.now().toString(),
      title: newImage.title,
      url: newImage.url,
      category: newImage.category,
      featured: false,
    };
    const updatedImages = [...images, newImageData];
    setImages(updatedImages);
    localStorage.setItem('admin-images', JSON.stringify(updatedImages));
    setNewImage({ title: '', url: '', category: 'boudoir' });
  };

  const handleDeleteImage = (id: string) => {
    const updatedImages = images.filter(img => img.id !== id);
    setImages(updatedImages);
    localStorage.setItem('admin-images', JSON.stringify(updatedImages));
  };

  const markAsRead = (id: string) => {
    const updatedContacts = contacts.map(c =>
      c.id === id ? { ...c, read: true } : c
    );
    setContacts(updatedContacts);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
        >
          <h1 className="text-3xl font-bold mb-6 text-center font-playfair bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
            Administration
          </h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                placeholder="Entrez votre mot de passe"
              />
            </div>
            <Button type="submit" className="w-full">
              Se connecter
            </Button>
            <p className="text-sm text-gray-500 text-center">
              Démo: utilisez "admin123" comme mot de passe
            </p>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
              Panel d'Administration
            </h1>
            <Button variant="outline" onClick={handleLogout}>
              Déconnexion
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`pb-4 px-6 font-medium transition-colors ${
              activeTab === 'contacts'
                ? 'border-b-2 border-pink-400 text-pink-400'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Messages ({contacts.filter(c => !c.read).length})
          </button>
          <button
            onClick={() => setActiveTab('images')}
            className={`pb-4 px-6 font-medium transition-colors ${
              activeTab === 'images'
                ? 'border-b-2 border-pink-400 text-pink-400'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Galerie ({images.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-4 px-6 font-medium transition-colors ${
              activeTab === 'settings'
                ? 'border-b-2 border-pink-400 text-pink-400'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Paramètres
          </button>
        </div>

        {/* Content */}
        {activeTab === 'contacts' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Messages de contact</h2>
            {contacts.length === 0 ? (
              <p className="text-gray-500">Aucun message pour le moment</p>
            ) : (
              contacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-white rounded-lg shadow p-6 ${
                    !contact.read ? 'border-l-4 border-pink-400' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{contact.name}</h3>
                      <p className="text-gray-600">{contact.email}</p>
                      {contact.phone && <p className="text-gray-600">{contact.phone}</p>}
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-pink-100 to-blue-100 text-gray-700 rounded-full text-sm">
                        {contact.type}
                      </span>
                      <p className="text-sm text-gray-500 mt-2">
                        {new Date(contact.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{contact.message}</p>
                  {!contact.read && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => markAsRead(contact.id)}
                    >
                      Marquer comme lu
                    </Button>
                  )}
                </motion.div>
              ))
            )}
          </div>
        )}

        {activeTab === 'images' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Gestion de la galerie</h2>

            {/* Add Image Form */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h3 className="font-semibold text-lg mb-4">Ajouter une image</h3>
              <form onSubmit={handleAddImage} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Titre"
                    value={newImage.title}
                    onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                  <input
                    type="url"
                    placeholder="URL de l'image"
                    value={newImage.url}
                    onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                  <select
                    value={newImage.category}
                    onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="boudoir">Boudoir</option>
                    <option value="mode">Mode</option>
                    <option value="artistique">Artistique</option>
                  </select>
                </div>
                <Button type="submit">Ajouter l'image</Button>
              </form>
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {images.map((image) => (
                <div key={image.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={image.url}
                      alt={image.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{image.title}</h3>
                    <p className="text-sm text-gray-600">{image.category}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => handleDeleteImage(image.id)}
                    >
                      Supprimer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Paramètres du site</h2>
            <p className="text-gray-600">
              Configuration des paramètres du site (à implémenter selon vos besoins)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
