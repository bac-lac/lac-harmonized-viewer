
export function format(first: string, middle: string, last: string): string {
  return (
    (first || '') +
    (middle ? ` ${middle}` : '') +
    (last ? ` ${last}` : '')
  );
}

export function root(element: HTMLElement) {
  if (!element) {
    return undefined;
  }
  if (element.parentElement) {
    return root(element.parentElement);
  }
  else {
    return element;
  }
}