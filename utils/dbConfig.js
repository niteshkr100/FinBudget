// import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
// https://chatgpt.com/share/694b6f08-46fb-4ee5-b3bc-b2f6514143fe
// The * as schema syntax imports all the exports from the specified module (./schema) and collects them into an object named schema. This means that if the module ./schema exports multiple functions, classes, or variables, they will all be accessible as properties of the schema object.
import * as schema from './schema'
import { neon } from '@neondatabase/serverless';

const sql =  neon(process.env.NEXT_PUBLIC_POSTGRES_DATABASE_URL)

// pass schema model from utils schema.js
export const db = drizzle(sql, { schema });



// --------------------------DATABASE CONTROL ROOM---------------------------------------