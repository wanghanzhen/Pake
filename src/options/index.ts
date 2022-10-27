import { getIdentifier } from '../helpers/tauriConfig';
import { PakeAppOptions, PakeCliOptions } from '../types';
import { getTitleByURL } from './title';

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

  appOptions.identifier = getIdentifier(appOptions.name, url)

  return appOptions;
}
