import { getIdentifier } from '../helpers/tauriConfig.js';
import { PakeAppOptions, PakeCliOptions } from '../types.js';
import { handleIcon } from './icon.js';
import { getTitleByURL } from './title.js';

export default async function handleOptions(options: PakeCliOptions, url: string): Promise<PakeAppOptions> {
  const appOptions: PakeAppOptions = {
    ...options,
    identifier: '',
  };
  if (!appOptions.title) {
    appOptions.title = await getTitleByURL(url);
  }

  if (!appOptions.name) {
    appOptions.name = appOptions.title;
  }

  appOptions.identifier = getIdentifier(appOptions.name, url);

  appOptions.icon = await handleIcon(appOptions, url);

  return appOptions;
}
