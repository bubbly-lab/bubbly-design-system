'use client';

import { type CSSProperties, forwardRef, type ReactNode } from 'react';

import { ListRow, type ListRowProps } from '../list-row';
import { Thumbnail } from '../thumbnail';

/**
 * Visual type of the leading element, mirroring Figma's AutocompleteItem
 * `type` axis. Controls how the leading slot is presented; the consumer still
 * supplies the actual icon node (`leadingIcon`) or image (`leadingSrc`).
 *
 * - `icon`: 24×24 inline icon (default)
 * - `largeIcon`: icon centered in a 60×56 container
 * - `portraitThumbnail`: `Thumbnail` with `ratio="3:4"`, `radius="8px"`
 * - `roundThumbnail`: `Thumbnail` with `ratio="1:1"`, `radius="full"`
 */
export type AutocompleteItemType =
  | 'icon'
  | 'largeIcon'
  | 'portraitThumbnail'
  | 'roundThumbnail';

export type AutocompleteItemProps = Omit<ListRowProps, 'leading'> & {
  /**
   * Leading visual type (Figma `type` axis).
   * @default 'icon'
   */
  type?: AutocompleteItemType;
  /**
   * Icon node for `type="icon"` / `type="largeIcon"`.
   * Ignored when a thumbnail type is used.
   */
  leadingIcon?: ReactNode;
  /**
   * Image source for `type="portraitThumbnail"` / `type="roundThumbnail"`.
   * Ignored when an icon type is used.
   */
  leadingSrc?: string;
  /**
   * Alt text for the thumbnail image. Required for accessibility when
   * `leadingSrc` is provided.
   */
  leadingAlt?: string;
  /**
   * Escape hatch: render a fully custom leading node, bypassing `type`.
   * Takes precedence over `leadingIcon` / `leadingSrc`.
   */
  leading?: ReactNode;
};

const ICON_SIZE: Record<AutocompleteItemType, string> = {
  icon: '24px',
  largeIcon: '32px',
  portraitThumbnail: '24px',
  roundThumbnail: '24px',
};

const largeIconStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '60px',
  height: '56px',
  fontSize: ICON_SIZE.largeIcon,
};

const PORTRAIT_THUMBNAIL_WIDTH = '60px';
const ROUND_THUMBNAIL_WIDTH = '56px';

export const AutocompleteItem = forwardRef<
  HTMLDivElement,
  AutocompleteItemProps
>(function AutocompleteItem(
  { type = 'icon', leadingIcon, leadingSrc, leadingAlt = '', leading, ...rest },
  ref,
) {
  const resolvedLeading = resolveLeading({
    type,
    leadingIcon,
    leadingSrc,
    leadingAlt,
    leading,
  });

  return <ListRow ref={ref} leading={resolvedLeading} {...rest} />;
});

interface ResolveLeadingArgs {
  type: AutocompleteItemType;
  leadingIcon?: ReactNode;
  leadingSrc?: string;
  leadingAlt: string;
  leading?: ReactNode;
}

function resolveLeading({
  type,
  leadingIcon,
  leadingSrc,
  leadingAlt,
  leading,
}: ResolveLeadingArgs): ReactNode {
  // Explicit custom node wins.
  if (leading != null) return leading;

  if (type === 'portraitThumbnail') {
    return (
      <Thumbnail
        src={leadingSrc}
        alt={leadingAlt}
        ratio="3:4"
        radius="8px"
        style={{ width: PORTRAIT_THUMBNAIL_WIDTH }}
      />
    );
  }

  if (type === 'roundThumbnail') {
    return (
      <Thumbnail
        src={leadingSrc}
        alt={leadingAlt}
        ratio="1:1"
        radius="full"
        style={{ width: ROUND_THUMBNAIL_WIDTH }}
      />
    );
  }

  if (type === 'largeIcon') {
    return leadingIcon != null ? (
      <span style={largeIconStyle}>{leadingIcon}</span>
    ) : null;
  }

  // type === 'icon'
  return leadingIcon ?? null;
}
