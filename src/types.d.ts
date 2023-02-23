export type PrimaryLanguage = {
  color: string;
  id: string;
  name: string;
};

export type Repository = {
  id
  nameWithOwner
  url
  stargazerCount: number;
  primaryLanguage: PrimaryLanguage
  createdAt
  updatedAt
  hasNextPage
  endCursor
  closedIssues
  totalIssues
};
