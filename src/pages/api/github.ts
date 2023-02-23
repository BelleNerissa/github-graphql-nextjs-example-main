import type { NextApiRequest, NextApiResponse } from "next";
import { GraphQLClient, gql } from "graphql-request";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const endpoint = "https://api.github.com/graphql";

  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  const query = gql`
  {
    search(query: "stars:>100", type: REPOSITORY, first:10) {
    pageInfo {
              hasNextPage
              endCursor
          }
      nodes {
        ... on Repository {
      id
      nameWithOwner
      url
      primaryLanguage{ name }
      createdAt
      updatedAt
  }
  `;

  const data = await client.request(query);
  res.status(200).json(data);
}
