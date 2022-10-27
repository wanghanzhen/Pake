import axios from 'axios';

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Safari/605.1.15';

export async function getTitleByURL(url: string): Promise<string> {
  const { data } = await axios.get<string>(url, {
    headers: {
      // Fake user agent for pages like http://messenger.com
      'User-Agent': USER_AGENT,
    },
  });
  const title = /<\s*title.*?>(?<title>.+?)<\s*\/title\s*?>/i.exec(data)?.groups?.title ?? 'Webapp';
  return title;
}
