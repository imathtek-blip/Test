import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, type, message } = body;

    // Validation basique
    if (!name || !email || !message || !type) {
      return NextResponse.json(
        { error: 'Tous les champs requis doivent être remplis' },
        { status: 400 }
      );
    }

    // Créer un objet avec les données du contact
    const contactData = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || '',
      type,
      message,
      read: false,
      createdAt: new Date().toISOString(),
    };

    // Sauvegarder dans un fichier JSON (simple pour démarrer)
    const dataDir = path.join(process.cwd(), 'data');
    const contactsFile = path.join(dataDir, 'contacts.json');

    // Créer le dossier data s'il n'existe pas
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }

    // Lire les contacts existants ou créer un tableau vide
    let contacts = [];
    if (existsSync(contactsFile)) {
      const fileContent = await readFile(contactsFile, 'utf-8');
      contacts = JSON.parse(fileContent);
    }

    // Ajouter le nouveau contact
    contacts.push(contactData);

    // Sauvegarder
    await writeFile(contactsFile, JSON.stringify(contacts, null, 2));

    return NextResponse.json(
      { success: true, message: 'Message envoyé avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    const contactsFile = path.join(dataDir, 'contacts.json');

    if (!existsSync(contactsFile)) {
      return NextResponse.json([]);
    }

    const fileContent = await readFile(contactsFile, 'utf-8');
    const contacts = JSON.parse(fileContent);

    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Erreur lors de la récupération des messages:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    );
  }
}
