// app/api/items/route.ts
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const godownId = searchParams.get('godownId');
  const searchTerm = searchParams.get('search');

  let query;

  if (searchTerm) {
    query = sql`
      SELECT * FROM items 
      WHERE name ILIKE ${'%' + searchTerm + '%'}
      OR category ILIKE ${'%' + searchTerm + '%'}  ORDER BY name ASC;
    `;
  } else if (godownId) {
    query = sql`
      SELECT * FROM items WHERE godown_id = ${godownId}  ORDER BY name ASC;
    `;
  } else {
    query = sql`
      SELECT * FROM items 
      ORDER BY name ASC;
    `;  }

  try {
    const result = await query;
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json({ error: 'Error fetching items' }, { status: 500 });
  }
}
