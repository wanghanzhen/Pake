import tlds from 'tlds';

export function getDomain(url: string) {
  var parts = url.split('.');
  if (parts[0] === 'www' && parts[1] !== 'com') {
    parts.shift();
  }
  var ln = parts.length,
    i = ln,
    minLength = parts[parts.length - 1].length,
    part;

  // iterate backwards
  while ((part = parts[--i])) {
    // stop when we find a non-TLD part
    if (
      i === 0 || // 'asia.com' (last remaining must be the SLD)
      i < ln - 2 || // TLDs only span 2 levels
      part.length < minLength || // 'www.cn.com' (valid TLD as second-level domain)
      tlds.indexOf(part) < 0 // officialy not a TLD
    ) {
      return part;
    }
  }
}
