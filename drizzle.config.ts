// import './src/db/drizzleConfig'
import dotenv from "dotenv";

dotenv.config({
  path: [".env.local",'.env','.env.development.local'],
});

import { defineConfig } from "drizzle-kit";
// console.log(4, process.env.POSTGRES_URL as string)

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/db/schemas",
    out: "./src/db/drizzle",
    dbCredentials: {
        url: process.env.POSTGRES_URL as string,
        // database:'expense_tracker',
    },

    verbose:true,
    strict:true
});