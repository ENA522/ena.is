import type { Pool, QueryResult, PoolClient } from 'pg';

export const pool: Pool;

export const db: {
	query: <T = any>(text: string, params?: any[]) => Promise<QueryResult<T>>;
	getClient: () => Promise<PoolClient>;
};