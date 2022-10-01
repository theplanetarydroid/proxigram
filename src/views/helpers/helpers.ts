
export function isvideo(type: string) {
  return type !== 'photo' ? true : false;
}

export function isundefine(data: any[]) {
  return typeof data === 'undefined' ? true : false;
}

export function length(data: any[]) {
  return data.length;
}

export function truncate(text: string) {
  if (!text) return;

  if (text.length > 40) {
    return `${text.slice(0, 40)}...`;
  }

  return text;
}


export function setVar(name: string, value: any, options: any) {
  options.data.root[name] = value;
}

export function parseProxyUrl(url: string) {
  let value = `/proxy/${url.split('.com/')[1]}`

  if (value === "/proxy/undefined") {
    value = `/proxy/${url.split('.net/')[1]}`
  }

  return value
}