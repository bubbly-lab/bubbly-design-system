/**
 * Programmatic design token validator.
 *
 * Handles what JSON Schema structurally cannot:
 *   - $type inheritance resolution (via Style Dictionary's typeDtcgDelegate)
 *   - $value content validation per resolved type
 *
 * Usage: node validate-tokens.js
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { typeDtcgDelegate } from 'style-dictionary/utils';

// ---------------------------------------------------------------------------
// JSONC parser — strips // and /* */ comments while preserving strings
// ---------------------------------------------------------------------------

function stripJsoncComments(text) {
  let result = '';
  let i = 0;

  while (i < text.length) {
    // String literal — copy as-is including escaped characters
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

    // Single-line comment
    if (text[i] === '/' && text[i + 1] === '/') {
      while (i < text.length && text[i] !== '\n') i++;
      continue;
    }

    // Multi-line comment
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
// File discovery — matches config.js source patterns
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

  // Walk directories that match config.js source globs
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
    // tokens/**/*.tokens.jsonc or tokens/**/*.tokens.json
    if (rel.startsWith('tokens/') && /\.tokens\.jsonc?$/.test(f)) return true;
    // assets/**/*.json
    if (rel.startsWith('assets/') && f.endsWith('.json')) return true;
    return false;
  });
}

// ---------------------------------------------------------------------------
// Deep merge
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
// Token tree walker
// ---------------------------------------------------------------------------

/**
 * After typeDtcgDelegate, tokens have `value` and `type` ($ prefix stripped).
 * Groups have neither.
 */
function collectTokens(obj, path = []) {
  const tokens = [];

  for (const [key, entry] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    if (typeof entry !== 'object' || entry === null) continue;

    // A node is a token if it has a `value` property (post-delegation)
    // or `$value` (pre-delegation fallback)
    const value = entry.value ?? entry.$value;
    if (value !== undefined) {
      tokens.push({
        path: [...path, key].join('.'),
        type: entry.type ?? entry.$type ?? null,
        value,
      });
    } else {
      tokens.push(...collectTokens(entry, [...path, key]));
    }
  }

  return tokens;
}

// ---------------------------------------------------------------------------
// Alias detection
// ---------------------------------------------------------------------------

const ALIAS_RE = /^\{[^{}]+\}$/;

function isAlias(value) {
  return typeof value === 'string' && ALIAS_RE.test(value);
}

// ---------------------------------------------------------------------------
// Validators per $type
// Each returns null if valid, or an error message string.
// ---------------------------------------------------------------------------

const validators = {
  color(value) {
    if (isAlias(value)) return null;
    if (typeof value === 'string') {
      // Space-separated RGB: "255 255 255"
      if (/^\d{1,3}( \d{1,3}){2}$/.test(value)) return null;
      // Percentage (opacity): "7%"
      if (/^\d{1,3}%$/.test(value)) return null;
      // Hex: "#ff0000" or "#ff0000ff"
      if (/^#?[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test(value)) return null;
    }
    // DTCG object format: { colorSpace, components }
    if (typeof value === 'object' && value !== null) {
      if (value.colorSpace && Array.isArray(value.components)) return null;
    }
    return `Invalid color value: ${JSON.stringify(value)}`;
  },

  dimension(value) {
    if (isAlias(value)) return null;
    // String format: "11px", "1.5rem"
    if (
      typeof value === 'string' &&
      /^-?\d+(\.\d+)?(px|rem|em|vh|vw|%)$/.test(value)
    )
      return null;
    // DTCG object format: { value, unit }
    if (typeof value === 'object' && value !== null) {
      if (typeof value.value === 'number' && typeof value.unit === 'string')
        return null;
    }
    return `Invalid dimension value: ${JSON.stringify(value)}`;
  },

  fontFamily(value) {
    if (isAlias(value)) return null;
    if (typeof value === 'string' && value.length > 0) return null;
    if (Array.isArray(value) && value.every(v => typeof v === 'string'))
      return null;
    return `Invalid fontFamily value: ${JSON.stringify(value)}`;
  },

  fontWeight(value) {
    if (isAlias(value)) return null;
    if (
      typeof value === 'number' &&
      Number.isInteger(value) &&
      value >= 1 &&
      value <= 1000
    )
      return null;
    if (typeof value === 'string') {
      const named = [
        'thin',
        'extraLight',
        'light',
        'normal',
        'medium',
        'semiBold',
        'bold',
        'extraBold',
        'black',
      ];
      if (named.includes(value)) return null;
    }
    return `Invalid fontWeight value: ${JSON.stringify(value)}`;
  },

  duration(value) {
    if (isAlias(value)) return null;
    if (typeof value === 'string' && /^-?\d+(\.\d+)?(ms|s)$/.test(value))
      return null;
    if (typeof value === 'object' && value !== null) {
      if (typeof value.value === 'number' && ['ms', 's'].includes(value.unit))
        return null;
    }
    return `Invalid duration value: ${JSON.stringify(value)}`;
  },

  cubicBezier(value) {
    if (isAlias(value)) return null;
    if (
      Array.isArray(value) &&
      value.length === 4 &&
      value.every(v => typeof v === 'number')
    )
      return null;
    return `Invalid cubicBezier value: ${JSON.stringify(value)}`;
  },

  number(value) {
    if (isAlias(value)) return null;
    if (typeof value === 'number') return null;
    return `Invalid number value: ${JSON.stringify(value)}`;
  },

  typography(value) {
    if (isAlias(value)) return null;
    if (typeof value === 'object' && value !== null) {
      // Our convention: fontSize + lineHeight required (fontFamily is global)
      if (value.fontSize !== undefined && value.lineHeight !== undefined)
        return null;
    }
    return `Invalid typography value: ${JSON.stringify(value)}. Expected object with at least fontSize and lineHeight.`;
  },

  strokeStyle(value) {
    if (isAlias(value)) return null;
    if (typeof value === 'string') {
      if (['solid', 'dashed', 'dotted', 'double'].includes(value)) return null;
    }
    if (typeof value === 'object' && value !== null && value.style) return null;
    return `Invalid strokeStyle value: ${JSON.stringify(value)}`;
  },

  border(value) {
    if (isAlias(value)) return null;
    if (typeof value === 'object' && value !== null) {
      if (
        value.width !== undefined &&
        value.style !== undefined &&
        value.color !== undefined
      )
        return null;
    }
    return `Invalid border value: ${JSON.stringify(value)}`;
  },

  transition(value) {
    if (isAlias(value)) return null;
    if (typeof value === 'object' && value !== null) {
      if (value.duration !== undefined && value.timingFunction !== undefined)
        return null;
    }
    return `Invalid transition value: ${JSON.stringify(value)}`;
  },

  shadow(value) {
    if (isAlias(value)) return null;
    const isValidLayer = layer =>
      typeof layer === 'object' && layer !== null && layer.color !== undefined;
    if (Array.isArray(value) && value.every(isValidLayer)) return null;
    if (isValidLayer(value)) return null;
    return `Invalid shadow value: ${JSON.stringify(value)}`;
  },

  gradient(value) {
    if (isAlias(value)) return null;
    if (typeof value === 'object' && value !== null) {
      if (value.kind && Array.isArray(value.stops)) return null;
    }
    return `Invalid gradient value: ${JSON.stringify(value)}`;
  },

  cssImport(value) {
    if (typeof value === 'string') return null;
    return `Invalid cssImport value: ${JSON.stringify(value)}. Expected URL string.`;
  },
};

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const baseDir = new URL('.', import.meta.url).pathname;

  // 1. Discover and parse token files
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
    // Remove $schema — not part of the token tree
    delete parsed.$schema;
    deepMerge(merged, parsed);
  }

  // 2. Resolve $type inheritance
  const delegated = typeDtcgDelegate(merged);

  // 3. Collect and validate tokens
  const tokens = collectTokens(delegated);
  const errors = [];

  for (const token of tokens) {
    if (!token.type) {
      errors.push({
        path: token.path,
        message:
          'Missing $type (not declared or inherited from ancestor group)',
      });
      continue;
    }

    const validate = validators[token.type];
    if (!validate) {
      errors.push({
        path: token.path,
        message: `Unknown $type: "${token.type}"`,
      });
      continue;
    }

    const error = validate(token.value);
    if (error) {
      errors.push({ path: token.path, message: error });
    }
  }

  // 4. Report
  if (errors.length > 0) {
    console.error(`\n\u274c ${errors.length} validation error(s):\n`);
    for (const { path, message } of errors) {
      console.error(`  ${path}: ${message}`);
    }
    console.error('');
    process.exit(1);
  }

  console.log(
    `\u2705 All ${tokens.length} tokens validated across ${files.length} file(s).`,
  );
}

main();
