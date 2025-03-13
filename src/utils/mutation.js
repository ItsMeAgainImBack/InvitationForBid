import axios from "axios";
import { mutation as mutationBuilder } from "gql-query-builder";


const mutation = (mutationOperation, mutationVariables) => {
    return axios.post('/api/graphql', mutationBuilder({ operation: mutationOperation, variables: mutationVariables, }))
}

export { mutation }
