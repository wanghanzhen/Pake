import url from 'url';
import isurl from 'is-url';

function appendProtocol(inputUrl: string): string {
  const parsed = url.parse(inputUrl);
  if (!parsed.protocol) {
    const urlWithProtocol = `https://${inputUrl}`;
    return urlWithProtocol;
  }
  return inputUrl;
}

export function normalizeUrl(urlToNormalize: string): string {
  const urlWithProtocol = appendProtocol(urlToNormalize);

  if (isurl(urlWithProtocol)) {
    return urlWithProtocol;
  } else {
    throw new Error(`Your url "${urlWithProtocol}" is invalid`);
  }
}
