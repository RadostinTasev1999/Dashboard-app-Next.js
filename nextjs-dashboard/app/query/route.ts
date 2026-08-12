 import postgres from 'postgres';

 const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' }); // An utility function to make queries to the server

async function listInvoices() {

	const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 54246;
  `;

	return data;
}

export async function GET() { 
  try {
  	return Response.json(await listInvoices());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
