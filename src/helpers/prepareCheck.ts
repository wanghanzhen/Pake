import shelljs from 'shelljs';
import prompts from 'prompts';
import ora from 'ora';
import { shellExec } from '../utils/shell.js';

const InstallRustScript = "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y";

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

function checkRustInstalled() {
  return shelljs.exec('rustc --version', { silent: true }).code === 0;
}

async function installRust() {
  const spinner = ora('Downloading Rust').start();
  try {
    await shellExec(InstallRustScript);
    spinner.succeed();
  } catch (error) {
    console.error('install rust return code', error.message);
    spinner.fail();

    process.exit(1);
  }
}
