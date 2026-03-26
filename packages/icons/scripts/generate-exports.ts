const processAny = globalThis as any;
const nodeProcess = processAny.process;

if (!nodeProcess?.getBuiltinModule) {
  throw new Error('Node.js with process.getBuiltinModule is required');
}

const fs = nodeProcess.getBuiltinModule('node:fs') as any;
const path = nodeProcess.getBuiltinModule('node:path') as any;

const scriptDirUrl = new URL('.', import.meta.url);
const PACKAGE_ROOT = decodeURIComponent(new URL('../', scriptDirUrl).pathname);
const ICONS_DIR = path.join(PACKAGE_ROOT, 'src', 'icons');
const INDEX_PATH = path.join(PACKAGE_ROOT, 'src', 'index.ts');

async function main(): Promise<void> {
  const files = fs
    .readdirSync(ICONS_DIR)
    .filter(
      (file: string) => file.endsWith('.tsx') && !file.endsWith('.stories.tsx'),
    )
    .sort((a: string, b: string) => a.localeCompare(b));

  const iconExports = files.map((file: string) => {
    const componentName = file.replace(/\.tsx$/, '');
    return `export { ${componentName} } from './icons/${componentName}';`;
  });

  const indexContent = [
    "export type { IconProps } from './types';",
    ...iconExports,
    '',
  ].join('\n');

  fs.writeFileSync(INDEX_PATH, indexContent, 'utf8');
  console.log(
    `[generate-exports] Generated src/index.ts with ${files.length} exports.`,
  );
}

main().catch((error: unknown) => {
  console.error('[generate-exports] Error:', error);
  nodeProcess.exit(1);
});
