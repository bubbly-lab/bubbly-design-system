const processAny = globalThis as any;
const nodeProcess = processAny.process;

if (!nodeProcess?.getBuiltinModule) {
  throw new Error('Node.js with process.getBuiltinModule is required');
}

const fs = nodeProcess.getBuiltinModule('node:fs') as any;

const scriptDirUrl = new URL('.', import.meta.url);
const SCRIPT_DIR = decodeURIComponent(scriptDirUrl.pathname);
const PACKAGE_ROOT = decodeURIComponent(new URL('../', scriptDirUrl).pathname);
const REPO_ROOT = decodeURIComponent(
  new URL('../../../', scriptDirUrl).pathname,
);

const FILE_KEY = 'REDACTED';
const FIGMA_API = 'https://api.figma.com/v1';
const BATCH_SIZE = 50;

type IconVariants = Partial<Record<'outline' | 'filled', string>>;
type IconManifest = Record<string, IconVariants>;

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function loadFigmaPat(): string {
  const envPath = `${REPO_ROOT}.env`;
  if (!fs.existsSync(envPath)) {
    throw new Error(`.env not found at ${envPath}`);
  }

  const content = fs.readFileSync(envPath, 'utf-8') as string;
  const lines = content.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }

    const separatorIndex = line.indexOf('=');
    if (separatorIndex < 0) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    if (key !== 'FIGMA_PAT') {
      continue;
    }

    let value = line.slice(separatorIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!value) {
      throw new Error('FIGMA_PAT is empty in .env');
    }

    return value;
  }

  throw new Error('FIGMA_PAT not found in .env');
}

async function figmaFetch(url: string, pat: string): Promise<Response> {
  let retries = 3;

  while (retries > 0) {
    const res = await fetch(url, {
      headers: {
        'X-Figma-Token': pat,
      },
    });

    if (res.status === 429) {
      const retryAfterHeader = res.headers.get('Retry-After') ?? '60';
      const retryAfterSeconds = Number.parseInt(retryAfterHeader, 10);
      const waitMs = Number.isNaN(retryAfterSeconds)
        ? 60_000
        : retryAfterSeconds * 1000;

      console.log(
        `[fetch-figma] Rate limited (429). Waiting ${Math.ceil(waitMs / 1000)}s before retry...`,
      );
      await sleep(waitMs);
      retries -= 1;
      continue;
    }

    return res;
  }

  throw new Error('Max retries exceeded for Figma API request');
}

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

async function fetchSvgUrls(
  nodeIds: string[],
  pat: string,
): Promise<Record<string, string>> {
  const result: Record<string, string> = {};
  const batches = chunk(nodeIds, BATCH_SIZE);

  for (const [index, batch] of batches.entries()) {
    const ids = batch.join(',');
    const url = `${FIGMA_API}/images/${FILE_KEY}?ids=${encodeURIComponent(ids)}&format=svg&svg_simplify_stroke=true&svg_include_id=false`;

    console.log(
      `[fetch-figma] Requesting batch ${index + 1}/${batches.length} (${batch.length} ids)...`,
    );
    const res = await figmaFetch(url, pat);

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Figma images API error: ${res.status} ${body}`);
    }

    const data = (await res.json()) as { images?: Record<string, string> };
    Object.assign(result, data.images ?? {});
  }

  return result;
}

async function downloadSvg(url: string, outputPath: string): Promise<void> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download SVG: ${res.status} (${url})`);
  }

  const content = await res.text();
  const parentDir = outputPath.slice(0, outputPath.lastIndexOf('/'));
  fs.mkdirSync(parentDir, { recursive: true });
  fs.writeFileSync(outputPath, content, 'utf-8');
}

async function main(): Promise<void> {
  const pat = loadFigmaPat();
  const manifestPath = `${SCRIPT_DIR}icon-manifest.json`;
  const manifest = JSON.parse(
    fs.readFileSync(manifestPath, 'utf-8') as string,
  ) as IconManifest;

  const nodeMap: Record<
    string,
    { iconName: string; variant: 'outline' | 'filled' }
  > = {};

  for (const [iconName, variants] of Object.entries(manifest)) {
    for (const variant of ['outline', 'filled'] as const) {
      const nodeId = variants[variant];
      if (!nodeId) {
        continue;
      }
      nodeMap[nodeId] = { iconName, variant };
    }
  }

  const allNodeIds = Object.keys(nodeMap);
  console.log(
    `[fetch-figma] Fetching SVG URLs for ${allNodeIds.length} variants...`,
  );

  const svgUrls = await fetchSvgUrls(allNodeIds, pat);
  const svgDir = `${PACKAGE_ROOT}svg`;
  fs.mkdirSync(svgDir, { recursive: true });

  for (const nodeId of allNodeIds) {
    const svgUrl = svgUrls[nodeId];
    if (!svgUrl) {
      console.warn(`[fetch-figma] No URL returned for node ${nodeId}`);
      continue;
    }

    const { iconName, variant } = nodeMap[nodeId];
    const outputPath = `${svgDir}/${iconName}/${variant}.svg`;
    console.log(`[fetch-figma] Downloading SVG for ${iconName}/${variant}...`);
    await downloadSvg(svgUrl, outputPath);
  }

  fs.writeFileSync(
    manifestPath,
    `${JSON.stringify(manifest, null, 2)}\n`,
    'utf-8',
  );
  console.log(
    `[fetch-figma] Done! Downloaded ${Object.values(svgUrls).filter(Boolean).length} SVGs.`,
  );
}

main().catch((error: unknown) => {
  console.error('[fetch-figma] Error:', error);
  nodeProcess.exit(1);
});
