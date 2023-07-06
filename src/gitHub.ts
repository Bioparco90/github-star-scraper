import "dotenv/config";
import { Octokit } from "octokit";

const printProgress = (page: number) => {
  process.stdout.write(`Page: ${page} completed\r`);
};

export const getToken = (): string | undefined => {
  return process.env.GITHUB_TOKEN;
};

const token = getToken();
const octokit = new Octokit({
  auth: token,
});

export const getStargazers = async () => {
  let page: number = 1;
  let stargazers: any[] = [];
  let dataFetched = 100;
  while (dataFetched >= 100) {
    const data = await octokit.request("GET /repos/{owner}/{repo}/stargazers", {
      owner: "LoreBadTime",
      repo: "8088-easy-builder",
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

export const getUsersInfo = async () => {
  const stargazers = await getStargazers();
  const usernames: string[] = stargazers.map((elem) => elem.login);

  const request = usernames.map(async (username) => {
    const { data } = await octokit.request("GET /users/{username}", {
      username: username,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    const dataOrg = await octokit.request(
      "GET /users/{username}/hovercard?subject_type=organization",
      {
        username: username,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    const dataSocial = await octokit.request(
      "GET /users/{username}/social_accounts",
      {
        username: username,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    const social_accounts = dataSocial.data.map((elem) => elem.url);
    console.log("Data Social", social_accounts);

    return {
      Id: data.id,
      Nickname: data.login,
      FullName: data.name,
      Email: data.email,
      Followers: data.followers,
      Location: data.location,
      Organization: dataOrg.data.contexts[0]?.message,
      Social: social_accounts,
    };
  });
  const users = await Promise.all(request);
  console.log(users);
  return users;
};
