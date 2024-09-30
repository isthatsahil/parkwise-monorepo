import { TypedDocumentNode } from "@apollo/client/core/types"
import { print } from "graphql";
export interface FetchResult<TData> {
    data?: TData,
    error?: string
};

export interface GraphqlRequestOptions<TData, V> {
    document: TypedDocumentNode<TData, V>
    variables?: V
    config?: RequestInit
    token?: string
}

/**
* Sends a GraphQL request and returns the response data.
* @param {TypedDocumentNode<TData, V>} document - The GraphQL query/mutation document.
* @param {V} [variables) - The variables for the GraphQL query/mutation.
* @param {RequestInit} [config) - Optional configuration for the fetch request.
*
* @returns {Promise<FetchResult<TData»>} The result of the GraphQL request.
*/
export async function fetchGraphQL<TData, V>({
    document,
    variables,
    config,
    token
}: GraphqlRequestOptions<TData, V>): Promise<FetchResult<TData>> {
    const query = print(document);
    return await fetch(process.env.NEXT_PUBLIC_URL + '/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : null ),   
        },
        body: JSON.stringify({ query, variables }),
        ...config,
    }).then(async (res) => {
        const { data, error } = await res.json();
        if(error) {
            console.error('Error', JSON.stringify(error));
            return { error: JSON.stringify(error[0]?.message) };
        }
        return { data }
    })
}