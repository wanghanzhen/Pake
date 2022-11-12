import axios from 'axios';

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36';

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