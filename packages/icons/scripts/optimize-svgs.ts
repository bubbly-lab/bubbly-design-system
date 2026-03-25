import { optimize } from 'svgo';

const processAny = globalThis as any;
const nodeProcess = processAny.process;

if (!nodeProcess?.getBuiltinModule) {
  throw new Error('Node.js with process.getBuiltinModule is required');
}

const fs = nodeProcess.getBuiltinModule('node:fs') as any;
const path = nodeProcess.getBuiltinModule('node:path') as any;
const textEncoder = new TextEncoder();

const scriptDirUrl = new URL('.', import.meta.url);
const SVG_DIR = decodeURIComponent(new URL('../svg/', scriptDirUrl).pathname);

const svgoConfig: any = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          convertPathData: false,
        },
      },
    },
    'removeDimensions',
    {
      name: 'convertColors',
      params: { currentColor: true },
    },
  ],
};

function getAllSvgFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...getAllSvgFiles(entryPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.svg')) {
      files.push(entryPath);
    }
  }

  return files.sort((a, b) => a.localeCompare(b));
}

function optimizeWithConfiguredWarnings(content: string, filePath: string) {
  const originalWarn = console.warn;

  console.warn = (...args: any[]) => {
    const message = args.map(String).join(' ');

    if (message.includes('removeViewBox which is not part of preset-default')) {
      return;
    }

    originalWarn(...args);
  };

  try {
    return optimize(content, {
      path: filePath,
      ...svgoConfig,
    });
  } finally {
    console.warn = originalWarn;
  }
}

async function optimizeSvg(filePath: string): Promise<void> {
  const content = fs.readFileSync(filePath, 'utf-8');

  if (!content.trim()) {
    console.warn(`[optimize-svgs] Skipping empty file: ${filePath}`);
    return;
  }

  const beforeSize = textEncoder.encode(content).byteLength;
  const result = optimizeWithConfiguredWarnings(content, filePath);
  const afterSize = textEncoder.encode(result.data).byteLength;
  const savings = ((1 - afterSize / beforeSize) * 100).toFixed(1);

  fs.writeFileSync(filePath, result.data, 'utf-8');
  console.log(
    `[optimize-svgs] ${path.relative(SVG_DIR, filePath)}: ${beforeSize}B → ${afterSize}B (${savings}% saved)`,
  );
}

async function main(): Promise<void> {
  const svgFiles = getAllSvgFiles(SVG_DIR);
  console.log(`[optimize-svgs] Processing ${svgFiles.length} SVG files...`);

  for (const filePath of svgFiles) {
    await optimizeSvg(filePath);
  }

  console.log('[optimize-svgs] Done!');
}

main().catch((error: unknown) => {
  console.error('[optimize-svgs] Error:', error);
  nodeProcess.exit(1);
});
