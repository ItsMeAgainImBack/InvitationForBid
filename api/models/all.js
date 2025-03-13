import { typeDefs as itemTypes, resolvers as itemResolvers } from './item.js';
import { typeDefs as itemGroupTypes, resolvers as itemGroupResolvers} from './itemGroup.js';
import { typeDefs as contractorTypes, resolvers as contractorResolvers } from './contractor.js';


const versionTypes =  `type Query { version: String } type Mutation { setVersion: String }`

const typeDefs = [versionTypes, itemTypes, itemGroupTypes, contractorTypes ]

// Object.assign( ) não é recursivo como o lodash.merge( )  e isso causa o override dos resolvers
// a solução foi usar o Object.assign( ) para Query e Mutation separadamente
const resolvers = {
    Query: Object.assign({}, itemResolvers.Query, itemGroupResolvers.Query, contractorResolvers.Query),
    Mutation: Object.assign({}, itemResolvers.Mutation, itemGroupResolvers.Mutation, contractorResolvers.Mutation)
}

export { typeDefs, resolvers }
