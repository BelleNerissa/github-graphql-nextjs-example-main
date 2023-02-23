import type { Repository } from "../types";
import Head from "next/head";
import { GraphQLClient, gql } from "graphql-request";
import Header from "../components/header";
import Card from "../components/card";
import styles from "../styles/Home.module.css";
import { useState } from "react";

type HomeProps = {
  data: {
    search: {
      nodes: Repository[]
    }
  };
};

let variables = {
  "cursor": null
}

const Home = ({ data }: HomeProps) => {

  return (
    <>
      <Head>
        <title>Server-side rendering</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div style={{ textAlign: "center", cursor: "pointer" }}>
        <a onClick={() => {
        }}>Página Anterior</a>
        {"  |  "}
        <a onClick={() => console.log('ant')}>Próxima Página</a>
      </div>

      <main className={styles.container}>
        <section className={styles.grid}>
          {data.search.nodes.map(
            ({
              id,
              url,
              nameWithOwner,
              primaryLanguage,
              createdAt,
              updatedAt,
              closedIssues,
              stargazerCount
            }) => (
              <Card
                key={id}
                id={id}
                url={url}
                nameWithOwner={nameWithOwner}
                primaryLanguage={primaryLanguage}
                createdAt={createdAt}
                updatedAt={updatedAt}
                closedIssues={closedIssues}
                stargazerCount={stargazerCount}
              // forkCount={forkCount}
              />
            )
          )}
        </section>
      </main>
    </>
  );
};

export async function getServerSideProps(
) {
  const endpoint = "https://api.github.com/graphql";

  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  const query = gql` query($cursor: String)
  {
    search(query: "stars:>100", type: REPOSITORY, first:100, after: $cursor) { 
      pageInfo {
        hasNextPage
        endCursor
    }
      nodes {
        ... on Repository {
          nameWithOwner
          url
          primaryLanguage {
            color
            id
            name
          }
          stargazerCount
          createdAt
          updatedAt
          closedIssues: issues(first:1,states:CLOSED){totalCount}
          totalIssues: issues(first:1){totalCount}
          }
      }
    }
  }
  `;

  const data: HomeProps = await client.request(query, variables);
  return { props: { data } };
}

export default Home;
