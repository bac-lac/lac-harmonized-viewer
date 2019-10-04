
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

export function load(key: string): any {
  var value = window.localStorage.getItem(key);
  if(value) {
    return value;
  }
  else {
    return undefined;
  }
}

export function save(key: string, value: string): void {
  window.localStorage.setItem(key, value);
}