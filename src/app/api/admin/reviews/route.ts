import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const REVIEWS_FILE = path.join(process.cwd(), 'data', 'reviews.json');

// Hent alle anmeldelser (både godkendte og afventende)
export async function GET() {
  try {
    // Opret data-mappen hvis den ikke findes
    await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true });
    
    try {
      const fileContent = await fs.readFile(REVIEWS_FILE, 'utf-8');
      const reviews = JSON.parse(fileContent);
      return NextResponse.json(reviews);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        // Hvis filen ikke findes, returner en tom array
        return NextResponse.json([]);
      }
      throw error;
    }
  } catch (error) {
    console.error('Fejl ved hentning af anmeldelser:', error);
    return NextResponse.json(
      { error: 'Kunne ikke hente anmeldelser' },
      { status: 500 }
    );
  }
}

// Opdater status på en anmeldelse
export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json();
    
    // Opret data-mappen hvis den ikke findes
    await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true });
    
    let reviews = [];
    try {
      const fileContent = await fs.readFile(REVIEWS_FILE, 'utf-8');
      reviews = JSON.parse(fileContent);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw error;
      }
    }
    
    const reviewIndex = reviews.findIndex((review: { id: string }) => review.id === id);
    if (reviewIndex === -1) {
      return NextResponse.json(
        { error: 'Anmeldelse ikke fundet' },
        { status: 404 }
      );
    }
    
    reviews[reviewIndex].status = status;
    
    await fs.writeFile(REVIEWS_FILE, JSON.stringify(reviews, null, 2));
    
    return NextResponse.json({ message: 'Anmeldelse opdateret' });
  } catch (error) {
    console.error('Fejl ved opdatering af anmeldelse:', error);
    return NextResponse.json(
      { error: 'Der skete en fejl ved opdatering af anmeldelsen' },
      { status: 500 }
    );
  }
}

// Slet en anmeldelse
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID er påkrævet' },
        { status: 400 }
      );
    }

    const fileContent = await fs.readFile(REVIEWS_FILE, 'utf-8');
    let reviews = JSON.parse(fileContent);
    
    reviews = reviews.filter((review: { id: string }) => review.id !== id);
    
    await fs.writeFile(REVIEWS_FILE, JSON.stringify(reviews, null, 2));
    
    return NextResponse.json({ message: 'Anmeldelse slettet' });
  } catch (error) {
    console.error('Fejl ved sletning af anmeldelse:', error);
    return NextResponse.json(
      { error: 'Der skete en fejl ved sletning af anmeldelsen' },
      { status: 500 }
    );
  }
} 