const processAny = globalThis as any;
const nodeProcess = processAny.process;

if (!nodeProcess?.getBuiltinModule) {
  throw new Error('Node.js with process.getBuiltinModule is required');
}

const fs = nodeProcess.getBuiltinModule('node:fs') as any;
const path = nodeProcess.getBuiltinModule('node:path') as any;

const scriptDirUrl = new URL('.', import.meta.url);
const SCRIPT_DIR = decodeURIComponent(scriptDirUrl.pathname);
const PACKAGE_ROOT = decodeURIComponent(new URL('../', scriptDirUrl).pathname);
const SVG_DIR = path.join(PACKAGE_ROOT, 'svg');
const ICONS_DIR = path.join(PACKAGE_ROOT, 'src', 'icons');
const MANIFEST_PATH = path.join(SCRIPT_DIR, 'icon-manifest.json');

type IconVariant = 'outline' | 'filled';
type IconVariants = Partial<Record<IconVariant, string>>;
type IconManifest = Record<string, IconVariants>;

function toComponentName(iconName: string): string {
  return `Icon${iconName.charAt(0).toUpperCase()}${iconName.slice(1)}`;
}

function extractSvgContent(svgString: string): string {
  const match = svgString.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
  if (!match) {
    throw new Error('Invalid SVG content: missing <svg> wrapper');
  }

  return match[1].trim();
}

function svgToJsx(content: string): string {
  const toJsxAttrName = (attribute: string): string => {
    if (attribute === 'xlink:href') {
      return 'xlinkHref';
    }

    if (attribute === 'xml:space') {
      return 'xmlSpace';
    }

    return attribute.replace(/-([a-z])/g, (_, char: string) =>
      char.toUpperCase(),
    );
  };

  return content
    .replace(/\s+xmlns(?::xlink)?="[^"]*"/g, '')
    .replace(/\s([a-zA-Z_:][\w:.-]*)=/g, (_, attributeName: string) => {
      return ` ${toJsxAttrName(attributeName)}=`;
    });
}

function indentBlock(text: string, spaces: number): string {
  const prefix = ' '.repeat(spaces);
  return text
    .split('\n')
    .map(line => `${prefix}${line}`)
    .join('\n');
}

function readSvgContent(iconName: string, variant: IconVariant): string {
  const svgPath = path.join(SVG_DIR, iconName, `${variant}.svg`);
  if (!fs.existsSync(svgPath)) {
    throw new Error(`Missing SVG file: ${svgPath}`);
  }

  const raw = fs.readFileSync(svgPath, 'utf8');
  return svgToJsx(extractSvgContent(raw));
}

function renderSvgBody(iconName: string, variants: IconVariants): string {
  const hasOutline = Boolean(variants.outline);
  const hasFilled = Boolean(variants.filled);

  if (!hasOutline && !hasFilled) {
    throw new Error(`Icon "${iconName}" has no variants in manifest`);
  }

  if (hasOutline && hasFilled) {
    const outline = indentBlock(readSvgContent(iconName, 'outline'), 12);
    const filled = indentBlock(readSvgContent(iconName, 'filled'), 12);

    return `        {filled ? (
          <>
${filled}
          </>
        ) : (
          <>
${outline}
          </>
        )}`;
  }

  const variant: IconVariant = hasFilled ? 'filled' : 'outline';
  const onlyVariant = indentBlock(readSvgContent(iconName, variant), 8);

  return onlyVariant;
}

function generateComponent(iconName: string, variants: IconVariants): string {
  const componentName = toComponentName(iconName);
  const svgBody = renderSvgBody(iconName, variants);

  return `'use client';

import { forwardRef } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { IconProps } from '../types';

const ${componentName}: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>> = forwardRef<SVGSVGElement, IconProps>(
  function ${componentName}({ size = '1em', filled = false, color = 'currentColor', title, ...props }, ref) {
    void color;
    const hasA11y = Boolean(title ?? props['aria-label'] ?? props['aria-labelledby']);

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="currentColor"
        aria-hidden={hasA11y ? undefined : true}
        role={hasA11y ? 'img' : undefined}
        {...props}
      >
        {title && <title>{title}</title>}
${svgBody}
      </svg>
    );
  }
);

${componentName}.displayName = '${componentName}';

export { ${componentName} };
`;
}

async function main(): Promise<void> {
  const manifest = JSON.parse(
    fs.readFileSync(MANIFEST_PATH, 'utf8'),
  ) as IconManifest;

  fs.rmSync(ICONS_DIR, { recursive: true, force: true });
  fs.mkdirSync(ICONS_DIR, { recursive: true });

  let generated = 0;
  for (const [iconName, variants] of Object.entries(manifest)) {
    const componentName = toComponentName(iconName);
    const component = generateComponent(iconName, variants);
    const outputPath = path.join(ICONS_DIR, `${componentName}.tsx`);
    fs.writeFileSync(outputPath, component, 'utf8');
    console.log(`[generate-components] Generated ${componentName}.tsx`);
    generated += 1;
  }

  console.log(`[generate-components] Done! Generated ${generated} components.`);
}

main().catch(error => {
  console.error('[generate-components] Error:', error);
  nodeProcess.exit(1);
});
