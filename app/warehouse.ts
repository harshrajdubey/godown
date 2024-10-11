"use server"
import { sql, QueryResultRow } from '@vercel/postgres';

async function getGodowns(parent_godown: string | null): Promise<QueryResultRow[] | undefined> {

  if (parent_godown) {
    const { rows, fields } = await sql`SELECT * FROM godown WHERE parent_godown='${parent_godown}'`;
    console.log(parent_godown);
    return rows;

  } else {
    const { rows, fields } = await sql`SELECT * FROM godown WHERE parent_godown is null`;
    return rows;

  }
  // console.log(rows);
}

export async function getGodown(parent_godown = null) {
  const goo = getGodowns(parent_godown);
  return goo;
}
