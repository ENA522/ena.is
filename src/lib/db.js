// $lib/db.js
import pg from 'pg';

const { Pool } = pg;

// Create a single pool instance that will be reused
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	// Connection pool configuration
	max: 20, // Maximum number of clients in the pool
	idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
	connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection cannot be established
});

// Handle pool errors
pool.on('error', (err) => {
	console.error('Unexpected error on idle client', err);
});

// Export the pool for use in your API routes
export const db = {
	query: (text, params) => pool.query(text, params),
	getClient: () => pool.connect(),
};

// Export pool directly for better-auth
export { pool };

// Optional: Graceful shutdown
if (typeof process !== 'undefined') {
	process.on('SIGINT', async () => {
		await pool.end();
		process.exit(0);
	});
	
	process.on('SIGTERM', async () => {
		await pool.end();
		process.exit(0);
	});
}