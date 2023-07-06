import "dotenv/config";
import { Octokit } from "octokit";
import { NumberFormat } from "xlsx";

const printProgress = (page: number) => {
  process.stdout.write(`Page: ${page} completed\r`);
};

export const getToken = (): string | undefined => {
  return process.env.GITHUB_TOKEN;
};

export const getStargazers = async () => {
  const token = getToken();
  const octokit = new Octokit({
    auth: token,
  });

  let page: number = 1;
  let stargazers: any[] = [];
  let dataFetched = 100;
  while (dataFetched >= 100) {
    const data = await octokit.request("GET /repos/{owner}/{repo}/stargazers", {
      owner: "BetterDiscord",
      repo: "BetterDiscord",
      page: page,
      per_page: 100,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    stargazers = stargazers.concat(data.data);
    dataFetched = data.data.length;
    printProgress(page);
    page++;
  }
  console.log(`\n${stargazers.length} results found`);
  
  return stargazers;
};
