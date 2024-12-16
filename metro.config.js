const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('png', 'jpg', 'jpeg',
  // Adds support for `.db` files for SQLite databases
  'db'
);

module.exports = config;
