import axios from "axios";
import { query as queryBuilder } from "gql-query-builder";


const request = (requestOperation, requestVariables, requestFields) => {
    return axios.post('/api/graphql', queryBuilder({ operation: requestOperation, variables: requestVariables, fields: requestFields }))
}

export { request }
