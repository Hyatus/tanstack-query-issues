import { githubApi } from "../../api/github.api";
import { GithubIssue } from "../interfaces";

export const getIssueComments = async (issueNumber: number) => {
  const { data } = await githubApi.get<GithubIssue[]>(
    `/issues/${issueNumber}/comments`
  );
  return data;
};
