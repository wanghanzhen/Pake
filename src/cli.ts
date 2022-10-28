#!/usr/bin/env node
import { program } from 'commander';
import { DEFAULT_PAKE_OPTIONS } from './defaults.js';
import pake from './pake.js';
import { PakeCliOptions } from './types.js';
import { validateNumberInput, validateUrlInput } from './utils/validate.js';
import handleInputOptions from './options/index.js';
import { prepareCheck } from './helpers/prepareCheck.js';

program.version('0.0.1').description('A cli application named pro');

program
  .argument('<url>', 'the web url you want to package', validateUrlInput)
  .option('--name <string>', 'application name')
  .option('--title <string>', 'application window title')
  .option('--icon <string>', 'application icon', DEFAULT_PAKE_OPTIONS.icon)
  .option('--height <number>', 'application window height', validateNumberInput, DEFAULT_PAKE_OPTIONS.height)
  .option('--width <number>', 'application window width', validateNumberInput, DEFAULT_PAKE_OPTIONS.width)
  .option('--no-resizable', 'whether the application window can be resizable', DEFAULT_PAKE_OPTIONS.resizable)
  .option('--fullscreen', 'makes the packaged app start in full screen', DEFAULT_PAKE_OPTIONS.fullscreen)
  .option('--transparent', 'transparent title bar', DEFAULT_PAKE_OPTIONS.transparent)
  .action(async (url: string, options: PakeCliOptions) => {
    await prepareCheck();

    const appOptions = await handleInputOptions(options, url);

    pake(url, appOptions);
  });

program.parse();
