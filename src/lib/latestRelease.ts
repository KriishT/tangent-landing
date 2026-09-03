import {
  FALLBACK_MAC_URL,
  FALLBACK_VERSION,
  FALLBACK_WINDOWS_URL,
  GITHUB_REPO,
} from "./constants";

export type LatestRelease = {
  version: string;
  windowsUrl: string;
  macUrl: string;
};

type GhAsset = { name: string; browser_download_url: string; size: number };
type GhRelease = {
  tag_name: string;
  assets: GhAsset[];
};

function pickAsset(assets: GhAsset[], test: (name: string) => boolean): GhAsset | undefined {
  return assets.find((a) => test(a.name.toLowerCase()));
}

function parseRelease(data: GhRelease): LatestRelease {
  const windows = pickAsset(
    data.assets,
    (n) => n.endsWith("x64-setup.exe") || n.endsWith(".exe"),
  );
  const mac = pickAsset(data.assets, (n) => n.endsWith(".dmg"));

  return {
    version: data.tag_name.replace(/^v/, ""),
    windowsUrl: windows?.browser_download_url ?? FALLBACK_WINDOWS_URL,
    macUrl: mac?.browser_download_url ?? FALLBACK_MAC_URL,
  };
}

const FALLBACK: LatestRelease = {
  version: FALLBACK_VERSION,
  windowsUrl: FALLBACK_WINDOWS_URL,
  macUrl: FALLBACK_MAC_URL,
};

let cached: Promise<LatestRelease> | null = null;

/** Resolves direct installer URLs from the latest published (non-prerelease) GitHub release. */
export function getLatestRelease(): Promise<LatestRelease> {
  if (!cached) {
    cached = fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`, {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        return parseRelease((await res.json()) as GhRelease);
      })
      .catch(() => FALLBACK);
  }
  return cached;
}
