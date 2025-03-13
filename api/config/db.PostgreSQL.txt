import { PrismaClient } from '@prisma/client'


// dados da conexão com o banco de dados serverless
const host     = 'xpcsobgzgkqhqjturjmr.nhost.run'
const port     = 5432
const username = 'postgres'
const password = 'P@ssw0rd1234'
const database = 'xpcsobgzgkqhqjturjmr'
const ssl      = false
const setSSL   = 'sslaccept=strict&sslmode=require'

// DATABASE_URL="postgres://postgres:P@ssw0rd1234@xpcsobgzgkqhqjturjmr.nhost.run:5432/xpcsobgzgkqhqjturjmr"
let url = `postgres://${username}:${password}@${host}:${port}/${database}`;
if (ssl) {
    url = url + `?${setSSL}`;
}

const prisma = new PrismaClient({datasources: { db: { url: url } } })

export default prisma
