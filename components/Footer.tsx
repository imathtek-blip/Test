import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
              Studio Boudoir
            </h3>
            <p className="text-gray-600 text-sm">
              Photographie boudoir, érotique et mode professionnelle.
              Créez des souvenirs inoubliables dans un environnement élégant et confortable.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/gallery" className="text-gray-600 hover:text-pink-400 text-sm transition-colors">
                  Galerie
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-600 hover:text-pink-400 text-sm transition-colors">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-pink-400 text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-600 hover:text-pink-400 text-sm transition-colors">
                  Administration
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Email: contact@studioboudoir.com</li>
              <li>Téléphone: +33 (0)1 23 45 67 89</li>
              <li>Suivez-nous sur les réseaux sociaux</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Studio Boudoir. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
