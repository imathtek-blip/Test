import bcrypt from 'bcryptjs';

// Configuration simple de l'authentification
// Dans un environnement de production, utilisez une vraie base de données et NextAuth
export const ADMIN_CREDENTIALS = {
  email: 'admin@studioboudoir.com',
  // Le mot de passe est "admin123" - À CHANGER EN PRODUCTION !
  passwordHash: '$2a$10$YourHashedPasswordHere', // Vous devrez générer un vrai hash
};

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

// Fonction simple pour vérifier si l'utilisateur est authentifié
export function isAuthenticated(request: Request): boolean {
  // Dans une vraie application, vérifiez le token JWT ou la session
  const authHeader = request.headers.get('authorization');
  return authHeader === 'Bearer admin-token'; // Simplification pour la démo
}
