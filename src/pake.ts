import fs from 'fs/promises';
import path from 'path';
import shelljs from 'shelljs';
import { PakeAppOptions } from './types.js';

export default async function pake(url: string, options: PakeAppOptions) {
  console.log('PakeAppOptions', options)
  const tauriConfPath = path.resolve('src-tauri/tauri.conf.json');
  const tauriConfString = await fs.readFile(tauriConfPath, 'utf-8');
  try {
    const tauriConf = JSON.parse(tauriConfString);

    const { width, height, fullscreen, transparent, title, resizable, identifier, name } = options;

    const tauriConfWindowOptions = {
      width,
      height,
      fullscreen,
      transparent,
      title,
      resizable,
    };

    Object.assign(tauriConf.tauri.windows[0], { url, ...tauriConfWindowOptions });
    tauriConf.package.productName = name;
    tauriConf.tauri.bundle.identifier = identifier;

    await fs.writeFile(tauriConfPath, JSON.stringify(tauriConf, null, 2));
    shelljs.exec('npm run build');
  } catch (error) {
    console.error('handle auri.conf.json error', error);
    return;
  }
}
