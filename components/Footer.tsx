import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-pink-50 via-white to-blue-50 border-t-2 border-pink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-blue-400 flex items-center justify-center text-xl">
                📷
              </div>
              <h3 className="text-xl font-bold font-playfair text-gradient">
                Studio Boudoir
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-md">
              Photographie boudoir, érotique et mode professionnelle.
              Créez des souvenirs inoubliables dans un environnement élégant et confortable.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {['📷', '📘', '🐦', '💼'].map((icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-100 to-blue-100 hover:from-pink-200 hover:to-blue-200 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                >
                  <span className="text-xl">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <span>🔗</span> Liens rapides
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Accueil', icon: '🏠' },
                { href: '/gallery', label: 'Galerie', icon: '📸' },
                { href: '/pricing', label: 'Tarifs', icon: '💎' },
                { href: '/contact', label: 'Contact', icon: '✉️' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-blue-500 hover:bg-clip-text text-sm transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="transform group-hover:scale-125 transition-transform">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <span>📞</span> Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-600">
                <span className="text-lg">📧</span>
                <div>
                  <div className="font-medium text-gray-700">Email</div>
                  <a href="mailto:contact@studioboudoir.com" className="hover:text-pink-500 transition-colors">
                    contact@studioboudoir.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2 text-gray-600">
                <span className="text-lg">📱</span>
                <div>
                  <div className="font-medium text-gray-700">Téléphone</div>
                  <a href="tel:+33123456789" className="hover:text-pink-500 transition-colors">
                    +33 (0)1 23 45 67 89
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2 text-gray-600">
                <span className="text-lg">📍</span>
                <div>
                  <div className="font-medium text-gray-700">Adresse</div>
                  <div>Paris, France</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t-2 border-pink-100">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 text-center sm:text-left">
              &copy; {new Date().getFullYear()} <span className="font-semibold text-gradient">Studio Boudoir</span>. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm text-gray-600">
              <Link href="#" className="hover:text-pink-500 transition-colors">
                Mentions légales
              </Link>
              <Link href="#" className="hover:text-pink-500 transition-colors">
                Confidentialité
              </Link>
              <Link href="/admin" className="hover:text-blue-500 transition-colors">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
