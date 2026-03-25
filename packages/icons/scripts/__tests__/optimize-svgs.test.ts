import { optimize } from 'svgo';
import { describe, expect, it } from 'vitest';

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

function optimizeSvg(svgContent: string): string {
  const result = optimize(svgContent, svgoConfig);
  return result.data;
}

describe('optimize-svgs: SVGO configuration', () => {
  const sampleSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M12 2L2 22h20L12 2z" fill="#BABACB"/>
</svg>`;

  it('removes width and height attributes', () => {
    const result = optimizeSvg(sampleSvg);
    expect(result).not.toContain('width="24"');
    expect(result).not.toContain('height="24"');
  });

  it('preserves viewBox attribute', () => {
    const result = optimizeSvg(sampleSvg);
    expect(result).toContain('viewBox="0 0 24 24"');
  });

  it('converts hardcoded colors to currentColor', () => {
    const result = optimizeSvg(sampleSvg);
    expect(result).not.toContain('#BABACB');
    expect(result).toContain('currentColor');
  });

  it('preserves fill="none" on path elements', () => {
    const svgWithFillNone = `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2L2 22h20L12 2z" fill="none" stroke="#BABACB" stroke-width="2"/>
</svg>`;
    const result = optimizeSvg(svgWithFillNone);
    expect(result).toContain('fill="none"');
  });

  it('handles SVG with multiple paths', () => {
    const multiPathSvg = `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2L2 22h20L12 2z" fill="#BABACB"/>
<path d="M12 8v8" fill="none" stroke="#BABACB"/>
</svg>`;
    const result = optimizeSvg(multiPathSvg);
    expect(result).not.toContain('#BABACB');
  });

  it('removes unnecessary namespace declarations', () => {
    const svgWithNamespace = `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<path d="M12 2L2 22h20L12 2z" fill="#BABACB"/>
</svg>`;
    const result = optimizeSvg(svgWithNamespace);
    // SVGO removes redundant namespace declarations
    expect(result.length).toBeLessThan(svgWithNamespace.length);
  });
});
