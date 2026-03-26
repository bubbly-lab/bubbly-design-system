const processAny = globalThis as any;
const nodeProcess = processAny.process;

if (!nodeProcess?.getBuiltinModule) {
  throw new Error('Node.js with process.getBuiltinModule is required');
}

const childProcess = nodeProcess.getBuiltinModule('node:child_process') as any;
const path = nodeProcess.getBuiltinModule('node:path') as any;

const scriptDirUrl = new URL('.', import.meta.url);
const SCRIPT_DIR = decodeURIComponent(scriptDirUrl.pathname);
const PACKAGE_ROOT = decodeURIComponent(new URL('../', scriptDirUrl).pathname);

type Step = {
  name: string;
  fileName: string;
};

const steps: Step[] = [
  { name: 'Step 1: Fetch SVGs', fileName: 'fetch-figma.ts' },
  { name: 'Step 2: Optimize SVGs (SVGO)', fileName: 'optimize-svgs.ts' },
  {
    name: 'Step 3: Generate React components',
    fileName: 'generate-components.ts',
  },
  { name: 'Step 4: Generate barrel exports', fileName: 'generate-exports.ts' },
  {
    name: 'Step 5: Generate Storybook stories',
    fileName: 'generate-stories.ts',
  },
];

function runScript(step: Step): void {
  const scriptPath = path.join(SCRIPT_DIR, step.fileName);

  console.log(`\n[generate] ${step.name}...`);

  try {
    childProcess.execFileSync('npx', ['tsx', scriptPath], {
      cwd: PACKAGE_ROOT,
      env: { ...nodeProcess.env },
      stdio: 'inherit',
    });
    console.log(`[generate] ✓ ${step.name} done`);
  } catch (error) {
    console.error(`[generate] ✗ ${step.name} failed`);
    throw error;
  }
}

async function main(): Promise<void> {
  console.log('[generate] Starting icon generation pipeline...');

  for (const step of steps) {
    runScript(step);
  }

  console.log('\n[generate] ✓ Pipeline complete!');
}

main().catch((error: unknown) => {
  console.error('[generate] Error:', error);
  nodeProcess.exit(1);
});
