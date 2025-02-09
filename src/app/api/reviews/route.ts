import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const REVIEWS_FILE = path.join(process.cwd(), 'data', 'reviews.json');

interface Review {
  id: string;
  name: string;
  title: string;
  text: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export async function POST(request: Request) {
  try {
    const review = await request.json();
    
    // Opret data-mappen hvis den ikke findes
    await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true });
    
    // Læs eksisterende anmeldelser
    let reviews: Review[] = [];
    try {
      const fileContent = await fs.readFile(REVIEWS_FILE, 'utf-8');
      reviews = JSON.parse(fileContent);
    } catch {
      // Hvis filen ikke findes, starter vi med en tom array
      reviews = [];
    }
    
    // Tilføj den nye anmeldelse til pending reviews
    const newReview: Review = {
      ...review,
      status: 'pending',
      id: Date.now().toString(),
    };
    
    reviews.push(newReview);
    
    // Gem alle anmeldelser
    await fs.writeFile(REVIEWS_FILE, JSON.stringify(reviews, null, 2));
    
    return NextResponse.json({ message: 'Anmeldelse modtaget' }, { status: 201 });
  } catch {
    console.error('Fejl ved håndtering af anmeldelse');
    return NextResponse.json(
      { error: 'Der skete en fejl ved behandling af anmeldelsen' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const fileContent = await fs.readFile(REVIEWS_FILE, 'utf-8');
    const reviews: Review[] = JSON.parse(fileContent);
    // Returner kun godkendte anmeldelser til offentlig visning
    const approvedReviews = reviews.filter((review) => review.status === 'approved');
    return NextResponse.json(approvedReviews);
  } catch {
    return NextResponse.json({ error: 'Kunne ikke hente anmeldelser' }, { status: 500 });
  }
} 