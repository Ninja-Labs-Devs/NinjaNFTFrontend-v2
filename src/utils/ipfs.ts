const IPFS_GATEWAYS = [
  "https://gateway.pinata.cloud/ipfs/",
  "https://ipfs.io/ipfs/",
  "https://dweb.link/ipfs/",
  "https://nftstorage.link/ipfs/",
];

const toIpfsPath = (url?: string) => {
  if (!url) return "";
  return url.startsWith("ipfs://") ? url.slice("ipfs://".length) : "";
};

export const resolveIpfsUrl = (url?: string) => {
  const ipfsPath = toIpfsPath(url);
  if (!ipfsPath) return url || "";
  return `${IPFS_GATEWAYS[0]}${ipfsPath}`;
};

export const resolveIpfsGatewayUrls = (url?: string) => {
  const ipfsPath = toIpfsPath(url);
  if (!ipfsPath) return url ? [url] : [];
  return IPFS_GATEWAYS.map((gateway) => `${gateway}${ipfsPath}`);
};

export async function fetchIpfsJson<T>(url?: string): Promise<T> {
  const urls = resolveIpfsGatewayUrls(url);
  let lastError: unknown = null;

  for (const gatewayUrl of urls) {
    try {
      const response = await fetch(gatewayUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${gatewayUrl}: ${response.status}`);
      }
      return (await response.json()) as T;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("No IPFS gateway URL available");
}
