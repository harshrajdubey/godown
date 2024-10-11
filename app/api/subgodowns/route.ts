import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const godownId = searchParams.get('godownId');

  let query;

  if (godownId) {
    query = sql`
      SELECT * FROM godown 
      WHERE parent_godown=${godownId} ;
    `;
  }  else {
    return NextResponse.json({ error: 'No parameters provided' }, { status: 400 });
  }

  try {
    const result = await query;
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching godown:', error);
    return NextResponse.json({ error: 'Error fetching godown' }, { status: 500 });
  }
}
