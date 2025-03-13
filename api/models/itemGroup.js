import prisma from '../config/db.js'


const typeDefs = `
type ItemGroup {
    id: ID!
    name: String!
}

extend type Query {
  getItemGroup(id: Int!): ItemGroup!
  allItemGroups: [ItemGroup!]!
}

extend type Mutation {
  createItemGroup(name: String): ItemGroup
  deleteItemGroup(id: Int): Int
}
`

const resolvers = {
  Query: {
    getItemGroup: (parent, args) => {
      return prisma.itemgroup.findUnique({ where: { id: parseInt(args.id) } })
    },
    allItemGroups: () => {
      return prisma.itemgroup.findMany()
    }
  },

  Mutation: {
    createItemGroup: async (parent, args) => {
      const itemGroup = await prisma.itemgroup.create({data: args})
      return itemGroup;
    },
    deleteItemGroup: async (parent, args) => {
      const itemGroup = await prisma.itemgroup.delete({ where: { id: parseInt(args.id) }, })
      return itemGroup.id;
    },
  }
}

export { typeDefs, resolvers }
