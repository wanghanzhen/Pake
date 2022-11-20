import axios from 'axios';
import { fileTypeFromBuffer } from 'file-type';
import url from 'url';
import { PakeAppOptions } from '../types.js';
import { dir, file } from 'tmp-promise';
import path from 'path';
import pageIcon from 'page-icon';
import png2icons from 'png2icons';
import ICO from 'icojs';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

export async function handleIcon(options: PakeAppOptions, url: string) {
  if (options.icon) {
    if (options.icon.startsWith('http')) {
      return downloadIcon(options.icon);
    } else {
      return path.resolve(options.icon);
    }
  }
  if (!options.icon) {
    return inferIcon(options.name, url);
  }
}

export async function inferIcon(name: string, url: string) {
  const npmDirectory = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
  return path.join(npmDirectory, 'pake-default.icns');
}

export async function getIconFromPageUrl(url: string) {
  const icon = await pageIcon(url);
  console.log(icon);
  if (icon.ext === '.ico') {
    const a = await ICO.parse(icon.data);
    icon.data = Buffer.from(a[0].buffer);
  }

  const iconDir = (await dir()).path;
  const iconPath = path.join(iconDir, `/icon.icns`);

  const out = png2icons.createICNS(icon.data, png2icons.BILINEAR, 0);

  await fs.writeFile(iconPath, out);
  return iconPath;
}

export async function getIconFromMacosIcons(name: string) {
  const data = {
    query: name,
    filters: 'approved:true',
    hitsPerPage: 10,
    page: 1,
  };
  const res = await axios.post('https://p1txh7zfb3-2.algolianet.com/1/indexes/macOSicons/query?x-algolia-agent=Algolia%20for%20JavaScript%20(4.13.1)%3B%20Browser', data, {
    headers: {
      'x-algolia-api-key': '0ba04276e457028f3e11e38696eab32c',
      'x-algolia-application-id': 'P1TXH7ZFB3',
    },
  });
  if (!res.data.hits.length) {
    return '';
  } else {
    return downloadIcon(res.data.hits[0].icnsUrl);
  }
}

export async function downloadIcon(iconUrl: string) {
  let iconResponse;
  try {
    iconResponse = await axios.get(iconUrl, {
      responseType: 'arraybuffer',
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }

  const iconData = await iconResponse.data;
  if (!iconData) {
    return null;
  }
  const fileDetails = await fileTypeFromBuffer(iconData);
  if (!fileDetails) {
    return null;
  }
  const { path } = await dir();
  const iconPath = `${path}/icon.${fileDetails.ext}`;
  await fs.writeFile(iconPath, iconData);
  return iconPath;
}
