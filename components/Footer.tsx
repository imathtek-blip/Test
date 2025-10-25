import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <div className="font-display text-3xl tracking-tight">
                <span className="font-light">Studio</span>
                <span className="font-normal ml-1">Boudoir</span>
              </div>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-md font-light">
              Photographie boudoir, mode et artistique. Révélant votre beauté
              authentique dans un environnement élégant et professionnel.
            </p>
            <div className="flex gap-4">
              {['Instagram', 'Facebook', 'Pinterest'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-sm text-gray-400 hover:text-white transition-colors elegant-line"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm tracking-wider uppercase mb-6 font-medium">
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Accueil' },
                { href: '/gallery', label: 'Galerie' },
                { href: '/pricing', label: 'Tarifs' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm tracking-wider uppercase mb-6 font-medium">
              Contact
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <div className="text-gray-500 mb-1 text-xs uppercase tracking-wider">
                  Email
                </div>
                <a
                  href="mailto:contact@studioboudoir.com"
                  className="text-gray-400 hover:text-white transition-colors font-light"
                >
                  contact@studioboudoir.com
                </a>
              </li>
              <li>
                <div className="text-gray-500 mb-1 text-xs uppercase tracking-wider">
                  Téléphone
                </div>
                <a
                  href="tel:+33123456789"
                  className="text-gray-400 hover:text-white transition-colors font-light"
                >
                  +33 (0)1 23 45 67 89
                </a>
              </li>
              <li>
                <div className="text-gray-500 mb-1 text-xs uppercase tracking-wider">
                  Localisation
                </div>
                <div className="text-gray-400 font-light">Paris, France</div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 font-light">
              &copy; {new Date().getFullYear()} Studio Boudoir. Tous droits réservés.
            </p>
            <div className="flex gap-8 text-sm">
              <Link
                href="#"
                className="text-gray-500 hover:text-white transition-colors font-light"
              >
                Mentions légales
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-white transition-colors font-light"
              >
                Confidentialité
              </Link>
              <Link
                href="/admin"
                className="text-gray-500 hover:text-white transition-colors font-light"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
