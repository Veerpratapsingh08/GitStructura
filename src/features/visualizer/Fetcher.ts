export type RepoFile = {
  path: string;
  mode: string;
  type: "blob" | "tree";
  sha: string;
  size?: number;
  url: string;
};

export type RepoTree = {
  sha: string;
  url: string;
  tree: RepoFile[];
  truncated: boolean;
};


async function checkRateLimit(response: Response) {
  if (response.status === 403 || response.status === 429) {
    const reset = response.headers.get("x-ratelimit-reset");
    const resetTime = reset ? new Date(parseInt(reset) * 1000).toLocaleTimeString() : "unknown";
    throw new Error(`API Rate Limit Exceeded. Resets at ${resetTime}. Try providing a token.`);
  }
}

export const fetchRepoTree = async (owner: string, repo: string, token?: string) => {
  const headers: HeadersInit = {
    "Accept": "application/vnd.github+json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }


  const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
  await checkRateLimit(repoRes);
  if (!repoRes.ok) throw new Error("Repository not found");
  
  const repoData = await repoRes.json();
  const defaultBranch = repoData.default_branch;


  const treeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${defaultBranch}?recursive=1`, { headers });
  await checkRateLimit(treeRes);
  if (!treeRes.ok) throw new Error("Failed to fetch tree");

  const treeData: RepoTree = await treeRes.json();
  let files = treeData.tree;

  // Performance cap: limit to top 5000 largest files to prevent WebGL crashing
  const MAX_FILES = 5000;
  const blobs = files.filter(f => f.type === 'blob');
  
  if (blobs.length > MAX_FILES) {
    blobs.sort((a, b) => (b.size || 0) - (a.size || 0));
    const topBlobs = new Set(blobs.slice(0, MAX_FILES).map(b => b.path));
    files = files.filter(f => f.type === 'tree' || topBlobs.has(f.path));
    
    (files as any).isCapped = true;
  }

  return files;
};

export const parseRepoUrl = (url: string) => {
  try {
    const urlObj = new URL(url);
    const parts = urlObj.pathname.split("/").filter(Boolean);
    if (parts.length >= 2) {
      return { owner: parts[0], repo: parts[1] };
    }
  } catch (e) {

    const parts = url.split("/").filter(Boolean);
    if (parts.length === 2) {
      return { owner: parts[0], repo: parts[1] };
    }
  }
  return null;
};
