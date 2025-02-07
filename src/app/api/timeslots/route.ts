import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { format } from 'date-fns';

const prisma = new PrismaClient();

// GET /api/timeslots - Hent alle ledige tider
export async function GET() {
  try {
    const timeSlots = await prisma.timeSlot.findMany({
      where: {
        available: true,
        date: {
          gte: new Date(), // Kun fremtidige tider
        },
      },
      orderBy: {
        date: 'asc',
      },
    });

    return NextResponse.json(timeSlots);
  } catch (error) {
    console.error('Fejl ved hentning af tider:', error);
    return NextResponse.json(
      { error: 'Der skete en fejl ved hentning af tider' },
      { status: 500 }
    );
  }
}

// POST /api/timeslots - Opret ny ledig tid
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, time } = body;

    const timeSlot = await prisma.timeSlot.create({
      data: {
        date: new Date(date),
        time,
        available: true,
      },
    });

    return NextResponse.json(timeSlot);
  } catch (error) {
    console.error('Fejl ved oprettelse af tid:', error);
    return NextResponse.json(
      { error: 'Der skete en fejl ved oprettelse af tid' },
      { status: 500 }
    );
  }
}

// DELETE /api/timeslots - Slet en ledig tid
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

    await prisma.timeSlot.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({ message: 'Tid slettet' });
  } catch (error) {
    console.error('Fejl ved sletning af tid:', error);
    return NextResponse.json(
      { error: 'Der skete en fejl ved sletning af tid' },
      { status: 500 }
    );
  }
} 