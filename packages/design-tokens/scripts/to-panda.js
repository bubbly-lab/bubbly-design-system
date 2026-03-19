/**
 * DTCG JSON → Panda CSS token converter.
 *
 * Usage: node scripts/to-panda.js
 * Output: build/panda/tokens.ts
 */

import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { typeDtcgDelegate } from 'style-dictionary/utils';

// ---------------------------------------------------------------------------
// JSONC parser (same as validate-tokens.js)
// ---------------------------------------------------------------------------

function stripJsoncComments(text) {
  let result = '';
  let i = 0;

  while (i < text.length) {
    if (text[i] === '"') {
      let j = i + 1;
      while (j < text.length) {
        if (text[j] === '\\') {
          j += 2;
          continue;
        }
        if (text[j] === '"') {
          j++;
          break;
        }
        j++;
      }
      result += text.slice(i, j);
      i = j;
      continue;
    }

    if (text[i] === '/' && text[i + 1] === '/') {
      while (i < text.length && text[i] !== '\n') i++;
      continue;
    }

    if (text[i] === '/' && text[i + 1] === '*') {
      i += 2;
      while (i < text.length && !(text[i] === '*' && text[i + 1] === '/')) {
        if (text[i] === '\n') result += '\n';
        i++;
      }
      i += 2;
      continue;
    }

    result += text[i];
    i++;
  }

  return result;
}

// ---------------------------------------------------------------------------
// File discovery (same as validate-tokens.js)
// ---------------------------------------------------------------------------

function findTokenFiles(baseDir) {
  const files = [];

  function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory() && entry.name !== 'node_modules') {
        walk(fullPath);
      } else if (entry.isFile()) {
        files.push(fullPath);
      }
    }
  }

  const tokensDir = join(baseDir, 'tokens');
  const assetsDir = join(baseDir, 'assets');

  try {
    walk(tokensDir);
  } catch {
    /* tokens/ may not exist */
  }
  try {
    walk(assetsDir);
  } catch {
    /* assets/ may not exist */
  }

  return files.filter(f => {
    const rel = relative(baseDir, f);
    if (rel.startsWith('tokens/') && /\.tokens\.jsonc?$/.test(f)) return true;
    if (rel.startsWith('assets/') && f.endsWith('.json')) return true;
    return false;
  });
}

// ---------------------------------------------------------------------------
// Deep merge (same as validate-tokens.js)
// ---------------------------------------------------------------------------

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (
      typeof source[key] === 'object' &&
      source[key] !== null &&
      !Array.isArray(source[key]) &&
      typeof target[key] === 'object' &&
      target[key] !== null &&
      !Array.isArray(target[key])
    ) {
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// ---------------------------------------------------------------------------
// DTCG ref path → Panda category path mapping
//
// "color.violet.400" → "colors.violet.400"
// "text.fonts.sans"  → "fonts.sans"
// "dimension.4"      → "spacing.4"
// ---------------------------------------------------------------------------

const REF_PREFIX_MAP = [
  { from: 'text.fonts', to: 'fonts' },
  { from: 'color', to: 'colors' },
  { from: 'opacity', to: 'opacity' },
  { from: 'dimension', to: 'spacing' },
  { from: 'radius', to: 'radii' },
  { from: 'fontSize', to: 'fontSizes' },
  { from: 'lineHeight', to: 'lineHeights' },
  { from: 'fontWeight', to: 'fontWeights' },
];

function convertRefPath(dtcgPath) {
  for (const { from, to } of REF_PREFIX_MAP) {
    if (dtcgPath === from || dtcgPath.startsWith(`${from}.`)) {
      return `${to}${dtcgPath.slice(from.length)}`;
    }
  }
  return dtcgPath;
}

function convertRefsInString(value) {
  return value.replace(/\{([^{}]+)\}/g, (_match, ref) => {
    return `{${convertRefPath(ref)}}`;
  });
}

// ---------------------------------------------------------------------------
// Primitive value map — for resolving embedded refs in complex CSS values
// e.g. "rgb({color.violet.400} / {opacity.20})" → "rgb(133 102 255 / 0.2)"
// ---------------------------------------------------------------------------

function buildPrimitiveMap(tree) {
  const map = new Map();

  function walk(obj, path = []) {
    for (const [key, entry] of Object.entries(obj)) {
      if (key.startsWith('$')) continue;
      if (typeof entry !== 'object' || entry === null) continue;

      const currentPath = [...path, key];
      const value = entry.value ?? entry.$value;

      if (value !== undefined) {
        map.set(currentPath.join('.'), value);
      } else {
        walk(entry, currentPath);
      }
    }
  }

  walk(tree);
  return map;
}

function resolveValue(value, primitiveMap, depth = 0) {
  if (depth > 10) return value;

  if (typeof value === 'string' && /^\{[^{}]+\}$/.test(value)) {
    const ref = value.slice(1, -1);
    const resolved = primitiveMap.get(ref);
    if (resolved !== undefined) {
      return resolveValue(resolved, primitiveMap, depth + 1);
    }
  }

  return value;
}

function resolveEmbeddedRefs(value, primitiveMap) {
  return value.replace(/\{([^{}]+)\}/g, (_match, ref) => {
    return String(resolveValue(`{${ref}}`, primitiveMap));
  });
}

// ---------------------------------------------------------------------------
// Value converters
// ---------------------------------------------------------------------------

const PURE_ALIAS_RE = /^\{[^{}]+\}$/;
const EMBEDDED_REF_RE = /\{[^{}]+\}/;

function convertColorValue(value) {
  if (typeof value === 'string' && /^\d{1,3}( \d{1,3}){2}$/.test(value)) {
    return `rgb(${value})`;
  }
  return value;
}

function convertSemanticColorValue(value, primitiveMap) {
  if (typeof value !== 'string') return value;

  if (PURE_ALIAS_RE.test(value)) {
    return convertRefsInString(value);
  }

  if (EMBEDDED_REF_RE.test(value)) {
    return resolveEmbeddedRefs(value, primitiveMap);
  }

  return value;
}

function convertFontWeightValue(value) {
  if (typeof value === 'number') return String(value);
  return value;
}

function convertTypographyValue(value, primitiveMap) {
  if (typeof value !== 'object' || value === null) return value;

  const result = {};

  if (value.fontSize) {
    result.fontSize = String(resolveValue(value.fontSize, primitiveMap));
  }
  if (value.fontWeight) {
    result.fontWeight = String(resolveValue(value.fontWeight, primitiveMap));
  }
  if (value.lineHeight) {
    result.lineHeight = String(resolveValue(value.lineHeight, primitiveMap));
  }
  if (value.letterSpacing !== undefined) {
    result.letterSpacing = String(
      resolveValue(value.letterSpacing, primitiveMap),
    );
  }

  return result;
}

// ---------------------------------------------------------------------------
// Output builders
// ---------------------------------------------------------------------------

function setNested(obj, path, value) {
  let current = obj;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }
  current[path[path.length - 1]] = value;
}

function buildPandaOutput(tree, primitiveMap) {
  const tokens = {};
  const semanticTokens = {};
  const textStyles = {};
  const errors = [];

  function processToken(path, value, type) {
    const rootGroup = path[0];

    switch (rootGroup) {
      case 'color': {
        const converted = convertColorValue(value);
        setNested(tokens, ['colors', ...path.slice(1)], { value: converted });
        break;
      }

      case 'opacity':
        setNested(tokens, ['opacity', ...path.slice(1)], { value });
        break;

      case 'dimension':
        setNested(tokens, ['spacing', ...path.slice(1)], { value });
        setNested(tokens, ['sizes', ...path.slice(1)], { value });
        break;

      case 'radius': {
        const converted =
          typeof value === 'string' && PURE_ALIAS_RE.test(value)
            ? convertRefsInString(value)
            : value;
        setNested(tokens, ['radii', ...path.slice(1)], { value: converted });
        break;
      }

      case 'fontSize':
        setNested(tokens, ['fontSizes', ...path.slice(1)], { value });
        break;

      case 'lineHeight':
        setNested(tokens, ['lineHeights', ...path.slice(1)], { value });
        break;

      case 'fontWeight': {
        const converted = convertFontWeightValue(value);
        setNested(tokens, ['fontWeights', ...path.slice(1)], {
          value: converted,
        });
        break;
      }

      // text.fonts.X → fonts.X
      case 'text':
        if (path[1] === 'fonts' && path.length > 2) {
          const converted =
            typeof value === 'string' && PURE_ALIAS_RE.test(value)
              ? convertRefsInString(value)
              : value;
          setNested(tokens, ['fonts', ...path.slice(2)], { value: converted });
        }
        break;

      case 'typography': {
        const converted = convertTypographyValue(value, primitiveMap);
        setNested(textStyles, path.slice(1), { value: converted });
        break;
      }

      case 'content':
      case 'surface':
      case 'border':
      case 'background':
      case 'static':
      case 'state-layer': {
        const converted = convertSemanticColorValue(value, primitiveMap);
        setNested(semanticTokens, ['colors', ...path], { value: converted });
        break;
      }

      default:
        if (type !== 'cssImport') {
          errors.push(
            `Unknown root group: ${rootGroup} (token: ${path.join('.')})`,
          );
        }
    }
  }

  function walkTree(obj, path = []) {
    for (const [key, entry] of Object.entries(obj)) {
      if (key.startsWith('$')) continue;
      if (typeof entry !== 'object' || entry === null) continue;

      const currentPath = [...path, key];
      const value = entry.value ?? entry.$value;

      if (value !== undefined) {
        const type = entry.type ?? entry.$type ?? null;
        processToken(currentPath, value, type);
      } else {
        walkTree(entry, currentPath);
      }
    }
  }

  walkTree(tree);

  return { tokens, semanticTokens, textStyles, errors };
}

// ---------------------------------------------------------------------------
// TypeScript output generation
// ---------------------------------------------------------------------------

function generateTypeScript(tokens, semanticTokens, textStyles) {
  const lines = ['// Auto-generated by scripts/to-panda.js — DO NOT EDIT', ''];

  lines.push(`export const tokens = ${formatObject(tokens, 0)};`);
  lines.push('');
  lines.push(
    `export const semanticTokens = ${formatObject(semanticTokens, 0)};`,
  );
  lines.push('');
  lines.push(`export const textStyles = ${formatObject(textStyles, 0)};`);
  lines.push('');

  return lines.join('\n');
}

function formatObject(obj, depth) {
  const indent = '  '.repeat(depth + 1);
  const closingIndent = '  '.repeat(depth);

  const entries = Object.entries(obj);
  if (entries.length === 0) return '{}';

  const lines = ['{'];

  for (const [key, val] of entries) {
    const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`;

    if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      lines.push(`${indent}${safeKey}: ${formatObject(val, depth + 1)},`);
    } else if (typeof val === 'string') {
      lines.push(`${indent}${safeKey}: '${val.replace(/'/g, "\\'")}',`);
    } else {
      lines.push(`${indent}${safeKey}: ${JSON.stringify(val)},`);
    }
  }

  lines.push(`${closingIndent}}`);
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const baseDir = new URL('..', import.meta.url).pathname;
  const outputDir = join(baseDir, 'build', 'panda');
  const outputFile = join(outputDir, 'tokens.ts');

  const files = findTokenFiles(baseDir);
  if (files.length === 0) {
    console.error('No token files found.');
    process.exit(1);
  }

  const merged = {};
  for (const file of files) {
    const raw = readFileSync(file, 'utf-8');
    const stripped = stripJsoncComments(raw);
    const parsed = JSON.parse(stripped);
    delete parsed.$schema;
    deepMerge(merged, parsed);
  }

  const delegated = typeDtcgDelegate(merged);
  const primitiveMap = buildPrimitiveMap(delegated);

  const { tokens, semanticTokens, textStyles, errors } = buildPandaOutput(
    delegated,
    primitiveMap,
  );

  if (errors.length > 0) {
    console.error(`\n\u26a0\ufe0f  ${errors.length} warning(s):\n`);
    for (const error of errors) {
      console.error(`  ${error}`);
    }
    console.error('');
  }

  mkdirSync(outputDir, { recursive: true });
  const output = generateTypeScript(tokens, semanticTokens, textStyles);
  writeFileSync(outputFile, output, 'utf-8');

  const tokenCount = countLeaves(tokens);
  const semanticCount = countLeaves(semanticTokens);
  const textStyleCount = countLeaves(textStyles);

  console.log(
    `\u2705 Panda tokens generated \u2192 ${relative(baseDir, outputFile)}`,
  );
  console.log(
    `   ${tokenCount} tokens, ${semanticCount} semantic tokens, ${textStyleCount} text styles`,
  );
}

function countLeaves(obj) {
  let count = 0;
  for (const val of Object.values(obj)) {
    if (typeof val === 'object' && val !== null && !('value' in val)) {
      count += countLeaves(val);
    } else {
      count++;
    }
  }
  return count;
}

main();
