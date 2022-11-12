import fs from 'fs/promises';
import path from 'path';
import prompts from 'prompts';
import { checkRustInstalled, installRust } from '@/helpers/rust.js';
import { PakeAppOptions } from '@/types.js';
import { IBuilder } from './base.js';
import appRootPath from 'app-root-path';
import { shellExec } from '@/utils/shell.js';

export default class MacBuilder implements IBuilder {
  async prepare() {
    if (checkRustInstalled()) {
      console.log('Rust has been installed');
      return;
    }

    console.warn('Rust is not installed, show prompt');
    const res = await prompts({
      type: 'confirm',
      message: 'Detect you have not installed Rust, install it now?',
      name: 'value',
    });

    if (res.value) {
      // TODO 国内有可能会超时
      await installRust();
    } else {
      console.error('Error: Pake need Rust to package your webapp!!!');
      process.exit(2);
    }
  }

  async build(url: string, options: PakeAppOptions) {
    console.log('PakeAppOptions', options);
    const tauriConfPath = path.join(appRootPath.path, 'src-tauri/tauri.conf.json');
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
      tauriConf.tauri.bundle.icon = [options.icon];

      await fs.writeFile(tauriConfPath, JSON.stringify(tauriConf, null, 2));
      const code = await shellExec(`${path.join(appRootPath.path, '/node_modules/.bin/tauri')} build --config ${tauriConfPath} --target universal-apple-darwin`);
      const dmgName = `${name}_${'0.2.0'}_universal.dmg`;
      await fs.copyFile(this.getBuildedAppPath(dmgName), path.resolve(dmgName));
    } catch (error) {
      console.error('handle tauri.conf.json error', error);
      return;
    }
  }

  getBuildedAppPath(dmgName: string) {
    return path.join(appRootPath.path, 'src-tauri/target/universal-apple-darwin/release/bundle/dmg', dmgName);
  }
}
