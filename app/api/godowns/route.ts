// app/api/godowns/route.ts
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await sql`
      SELECT * FROM godown ORDER BY name ASC;
    `;
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching godowns:', error);
    return NextResponse.json({ error: 'Error fetching godowns' }, { status: 500 });
  }
}
