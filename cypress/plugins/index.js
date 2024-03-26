/// <reference types="cypress" />
/* eslint-disable linebreak-style */
const cucumber = require('cypress-cucumber-preprocessor').default;
const fs = require('fs-extra');
const path = require('path');

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('.', 'cypress', 'config', `${file}.json`);

  return fs.readJson(pathToConfigFile);
}

module.exports = (on, config) => {
  on('file:preprocessor', cucumber());
  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.family === 'chromium' && browser.name !== 'electron') {
      launchOptions.args.push('--disable-dev-shm-usage');
    }

    return launchOptions;
  });
  on('task', {
    readdir({ path }) {
      return fs.readdirSync(path);
    }
  });
  on('task', {
    log(message) {
      console.log(`\n*** ${message} ***\n`);
      return null;
    }
  });

  const file = config.env.configFile || 'qa';
  return getConfigurationByFile(file);
};
