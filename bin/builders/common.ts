import path from 'path';
import { checkRustInstalled, installRust } from '@/helpers/rust.js';
import appRootPath from 'app-root-path';
import prompts from 'prompts';

export async function prepareCheck() {
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
    await installRust();
  } else {
    console.error('Error: Pake need Rust to package your webapp!!!');
    process.exit(2);
  }
}

export function getBuildedAppPath(name: string, version: string) {
  return path.join(appRootPath.path, 'src-tauri/target/universal-apple-darwin/release/bundle/dmg', `${name}_${version}_universal.dmg`);
}
