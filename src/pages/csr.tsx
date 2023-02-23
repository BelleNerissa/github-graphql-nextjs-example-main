import type { NextPage } from "next";
import type { Repository } from "../types";
import Head from "next/head";
import useSWR from "swr";
import Header from "../components/header";
import Card from "../components/card";
import Message from "../components/message";
import styles from "../styles/Home.module.css";

interface ApiError extends Error {
  info: any;
  status: number;
}

const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error(
      "An error occurred while fetching the data"
    ) as ApiError;
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }

  const data = await response.json();

  return data;
};

const Csr: NextPage = () => {
  const { data, error } = useSWR<Repository[], ApiError>(
    "/api/github",
    fetcher
  );

  if (error) return <div>Something went wrong :(</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>Client-side rendering</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.container}>
        <Message>This page was successfuly loaded using CSR!</Message>
        <section className={styles.grid}>
          {data.map(
            ({
              id,
              url,
              nameWithOwner,
              primaryLanguage,
              createdAt,
              updatedAt
            }) => (
              <Card
                key={id}
                id={id}
                url={url}
                nameWithOwner={nameWithOwner}
                primaryLanguage={primaryLanguage}
                createdAt={createdAt}
                updatedAt={updatedAt}
              // stargazerCount={stargazerCount}
              // forkCount={forkCount}
              />
            )
          )}
        </section>
      </main>
    </>
  );
};

export default Csr;
