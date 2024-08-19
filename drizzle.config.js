// /** @type { import("drizzle-kit").Config } */
//From Drizzle Kit
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: process.env.POSTGRES_DATABASE_URL,
    }
  };