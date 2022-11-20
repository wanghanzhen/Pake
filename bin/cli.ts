import { program } from 'commander';
import { DEFAULT_PAKE_OPTIONS } from './defaults.js';
import { PakeCliOptions } from './types.js';
import { validateNumberInput, validateUrlInput } from './utils/validate.js';
import handleInputOptions from './options/index.js';
import BuilderFactory from './builders/BuilderFactory.js';
import log from 'loglevel';

program.version('0.0.1').description('A cli application can package a web page to desktop application');

program
  .showHelpAfterError()
  .argument('<url>', 'the web url you want to package', validateUrlInput)
  .option('--name <string>', 'application name')
  .option('--icon <string>', 'application icon', DEFAULT_PAKE_OPTIONS.icon)
  .option('--height <number>', 'window height', validateNumberInput, DEFAULT_PAKE_OPTIONS.height)
  .option('--width <number>', 'window width', validateNumberInput, DEFAULT_PAKE_OPTIONS.width)
  .option('--no-resizable', 'whether the window can be resizable', DEFAULT_PAKE_OPTIONS.resizable)
  .option('--fullscreen', 'makes the packaged app start in full screen', DEFAULT_PAKE_OPTIONS.fullscreen)
  .option('--transparent', 'transparent title bar', DEFAULT_PAKE_OPTIONS.transparent)
  .option('--debug', 'debug', DEFAULT_PAKE_OPTIONS.transparent)
  .action(async (url: string, options: PakeCliOptions) => {
    log.setDefaultLevel('info')
    if (options.debug) {
      log.setLevel('debug');
    }

    const builder = BuilderFactory.create();
    await builder.prepare();

    const appOptions = await handleInputOptions(options, url);

    builder.build(url, appOptions);
  });

program.parse();
