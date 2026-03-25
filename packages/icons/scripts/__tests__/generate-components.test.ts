import { describe, expect, it } from 'vitest';

// Pure functions extracted from generate-components.ts for testing
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

describe('generate-components: toComponentName', () => {
  it('converts single word to Icon-prefixed PascalCase', () => {
    expect(toComponentName('home')).toBe('IconHome');
    expect(toComponentName('star')).toBe('IconStar');
  });

  it('converts camelCase to Icon-prefixed PascalCase', () => {
    expect(toComponentName('arrowLeft')).toBe('IconArrowLeft');
    expect(toComponentName('userCircle')).toBe('IconUserCircle');
  });

  it('preserves existing capital letters', () => {
    expect(toComponentName('iPhone')).toBe('IconIPhone');
  });
});

describe('generate-components: extractSvgContent', () => {
  it('extracts inner content from SVG wrapper', () => {
    const svg = '<svg viewBox="0 0 24 24"><path d="M12 2L2 22"/></svg>';
    expect(extractSvgContent(svg)).toBe('<path d="M12 2L2 22"/>');
  });

  it('extracts content with multiple elements', () => {
    const svg =
      '<svg viewBox="0 0 24 24"><g><path d="M12 2"/><circle cx="12" cy="12" r="5"/></g></svg>';
    expect(extractSvgContent(svg)).toContain('<path d="M12 2"/>');
    expect(extractSvgContent(svg)).toContain('<circle');
  });

  it('trims whitespace from extracted content', () => {
    const svg = '<svg viewBox="0 0 24 24">  \n  <path d="M12 2"/>  \n  </svg>';
    const result = extractSvgContent(svg);
    expect(result).toBe('<path d="M12 2"/>');
    expect(result).not.toMatch(/^\s/);
    expect(result).not.toMatch(/\s$/);
  });

  it('throws on invalid SVG without wrapper', () => {
    expect(() => extractSvgContent('<div>not svg</div>')).toThrow(
      'Invalid SVG content',
    );
  });

  it('handles SVG with nested groups', () => {
    const svg =
      '<svg viewBox="0 0 24 24"><g><g><path d="M12 2"/></g></g></svg>';
    const result = extractSvgContent(svg);
    expect(result).toContain('<g>');
    expect(result).toContain('<path d="M12 2"/>');
  });
});

describe('generate-components: svgToJsx', () => {
  it('converts fill-rule to fillRule', () => {
    const content = '<path fill-rule="evenodd" d="M12 2"/>';
    expect(svgToJsx(content)).toContain('fillRule=');
    expect(svgToJsx(content)).not.toContain('fill-rule=');
  });

  it('converts clip-rule to clipRule', () => {
    const content = '<path clip-rule="evenodd" d="M12 2"/>';
    expect(svgToJsx(content)).toContain('clipRule=');
  });

  it('converts stroke-width to strokeWidth', () => {
    const content = '<path stroke-width="2" d="M12 2"/>';
    expect(svgToJsx(content)).toContain('strokeWidth=');
  });

  it('converts stroke-linecap to strokeLinecap', () => {
    const content = '<path stroke-linecap="round" d="M12 2"/>';
    expect(svgToJsx(content)).toContain('strokeLinecap=');
  });

  it('removes xmlns attributes', () => {
    const content = '<path xmlns="http://www.w3.org/2000/svg" d="M12 2"/>';
    expect(svgToJsx(content)).not.toContain('xmlns=');
  });

  it('removes xmlns:xlink attributes', () => {
    const content =
      '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon"/>';
    expect(svgToJsx(content)).not.toContain('xmlns:xlink=');
  });

  it('converts xlink:href to xlinkHref', () => {
    const content = '<use xlink:href="#icon"/>';
    expect(svgToJsx(content)).toContain('xlinkHref=');
    expect(svgToJsx(content)).not.toContain('xlink:href=');
  });

  it('converts xml:space to xmlSpace', () => {
    const content = '<text xml:space="preserve">text</text>';
    expect(svgToJsx(content)).toContain('xmlSpace=');
    expect(svgToJsx(content)).not.toContain('xml:space=');
  });

  it('handles multiple attributes in single element', () => {
    const content =
      '<path fill-rule="evenodd" stroke-width="2" clip-rule="evenodd" d="M12 2"/>';
    const result = svgToJsx(content);
    expect(result).toContain('fillRule=');
    expect(result).toContain('strokeWidth=');
    expect(result).toContain('clipRule=');
  });

  it('preserves attribute values', () => {
    const content = '<path d="M12 2L2 22" fill="currentColor"/>';
    const result = svgToJsx(content);
    expect(result).toContain('d="M12 2L2 22"');
    expect(result).toContain('fill="currentColor"');
  });
});

describe('generate-components: component naming', () => {
  it('generates valid React component names', () => {
    const names = ['home', 'arrowLeft', 'userCircle', 'star'];
    names.forEach(name => {
      const componentName = toComponentName(name);
      expect(componentName).toMatch(/^Icon[A-Z]/);
      expect(componentName).not.toContain('-');
      expect(componentName).not.toContain('_');
    });
  });
});
