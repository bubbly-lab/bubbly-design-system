import { Fragment, type ReactNode } from 'react';

import { AutocompleteHighlight } from './autocomplete-highlight';

const REGEX_SPECIAL_CHARS = /[.*+?^${}()|[\]\\]/g;

export function highlightMatch(
  text: string,
  query: string | null | undefined,
): ReactNode {
  if (!query) {
    return text;
  }

  const escaped = query.replace(REGEX_SPECIAL_CHARS, '\\$&');
  const pattern = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, i) => {
        const key = `${i}:${part}`;
        return i % 2 === 1 ? (
          <AutocompleteHighlight key={key}>{part}</AutocompleteHighlight>
        ) : (
          <Fragment key={key}>{part}</Fragment>
        );
      })}
    </>
  );
}
