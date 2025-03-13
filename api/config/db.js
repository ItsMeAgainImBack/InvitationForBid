import { PrismaClient } from '@prisma/client'


// dados da conexão com BD
const host     = 'localhost'
const port     = 3306
const username = 'root'
const password = 'p@ssw0rd'
const database = 'bidding'
const ssl      = false
const setSSL   = 'sslaccept=strict&sslmode=require'


// DATABASE_URL="mysql://root:p@ssw0rd@localhost:3306/bidding"
let url = `mysql://${username}:${password}@${host}:${port}/${database}`;
if (ssl) {
    url = url + `?${setSSL}`;
}

const prisma = new PrismaClient({datasources: { db: { url: url } } })

export default prisma
