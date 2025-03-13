import { PrismaClient } from '@prisma/client'


// dados da conexão com BD
const host     = 'localhost'
const port     = 1433
const username = 'sa'
const password = 'p@ssw0rd'
const database = 'bidding'
const ssl      = false
const setSSL   = 'sslaccept=strict&sslmode=require'


// DATABASE_URL="sqlserver://localhost:1433;databaseName=bidding;user=sa;password=p@ssw0rd;trustServerCertificate=true;"
let url = `sqlserver://${host}:${port};databaseName=${database};user=${username};password=${password};trustServerCertificate=true;`;
if (ssl) {
    url = url + `?${setSSL}`;
}

const prisma = new PrismaClient({datasources: { db: { url: url } } })

export default prisma
