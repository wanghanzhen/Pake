import path from 'path';
import appRootPath from 'app-root-path';
import prompts from 'prompts';

export function getBuildedAppPath(name: string, version: string) {
  return path.join(appRootPath.path, 'src-tauri/target/universal-apple-darwin/release/bundle/dmg', `${name}_${version}_universal.dmg`);
}

export async function promptText(message: string, initial?: string) {
  const response = await prompts({
    type: 'text',
    name: 'content',
    message,
    initial,
  });
  return response.content;
}
