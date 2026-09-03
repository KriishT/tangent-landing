export const GITHUB_REPO = "KriishT/Tangent";

/** Fallback if the GitHub API is unreachable — keep in sync with the last known good release. */
export const FALLBACK_VERSION = "1.0.1";
export const FALLBACK_WINDOWS_URL =
  "https://github.com/KriishT/Tangent/releases/download/v1.0.1/Tangent_1.0.1_x64-setup.exe";
export const FALLBACK_MAC_URL =
  "https://github.com/KriishT/Tangent/releases/download/v1.0.1/Tangent_1.0.1_aarch64.dmg";

export const LINKS = {
  github: `https://github.com/${GITHUB_REPO}`,
  changelog: `https://github.com/${GITHUB_REPO}/releases`,
  privacy: "#privacy",
  contact: "mailto:hello@tangent.app",
} as const;

export const CAPTURE_TEXT = "check if the retry logic handles 429s";
export const CONTEXT_CHIP = "payments-api / retry.ts";
export const DEFAULT_HOTKEY = ["Ctrl", "Shift", "Space"] as const;
