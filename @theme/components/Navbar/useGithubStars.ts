import { useEffect, useState } from 'react';

const formatStars = (count: number) =>
  new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 })
    .format(count)
    .toLowerCase();

const requests = new Map<string, Promise<string | null>>();

const requestStars = (repo: string) => {
  let request = requests.get(repo);
  if (!request) {
    request = fetch(`https://api.github.com/repos/${repo}`)
      .then(async (response) => {
        const data = await response.json();
        return typeof data.stargazers_count === 'number'
          ? formatStars(data.stargazers_count)
          : null;
      })
      .catch(() => null);
    requests.set(repo, request);
  }
  return request;
};

/** Compact star count of a GitHub repository ("25.8k"); the fallback until the request resolves. */
export const useGithubStars = (repo: string, fallback: string) => {
  const [stars, setStars] = useState(fallback);

  useEffect(() => {
    let active = true;
    requestStars(repo).then((value) => {
      if (active && value) setStars(value);
    });
    return () => {
      active = false;
    };
  }, [repo]);

  return stars;
};
