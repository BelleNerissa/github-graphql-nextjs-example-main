import type { Repository } from "../types";
import Stars from "./star";
import Forks from "./forks";
import styles from "./card.module.css";

const Card = ({
  nameWithOwner,
  url,
  stargazerCount,
  primaryLanguage,
  createdAt,
  updatedAt,
  closedIssues,
  totalIssues,
}: Repository) => {
  return (
    <>
      <article className={styles.card}>
        <h2 className={styles.title}>
          <a href={url}>{nameWithOwner}</a>
        </h2>
        <p className={styles.description}>{url}</p>
        <p className={styles.meta}>
          {primaryLanguage && (
            <span className={styles.language}>
              <span
                className={styles.languageColor}
                style={{ backgroundColor: primaryLanguage?.color }}
              />
            </span>
          )}
          <span itemProp="programmingLanguage">
            {primaryLanguage?.name}
          </span>
          <br></br><span itemProp="createdAt">
            <b>{"Criado em: "}</b>{createdAt}
            <br></br></span> <span itemProp="updatedAt">
            <b>{"Atualizado em: "}</b>{updatedAt}
          </span>
          <br></br>
          {stargazerCount > 0 && (
            <a href={`${url}/stargazers`} className={styles.stargazers}>
              <Stars /> <span>{stargazerCount}</span>
            </a>
          )}
          {/* {forkCount > 0 && (
            <a href={`${url}/network/members`} className={styles.forks}>
              <Forks /> <span>{forkCount}</span>
            </a>
          )} */}
        </p>
      </article>
    </>
  );
};

export default Card;
