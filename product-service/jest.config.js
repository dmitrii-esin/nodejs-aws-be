const { pathsToModuleNameMapper } = require('ts-jest/utils');

// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require('./tsconfig.paths.json');

module.exports = {
  // [...]
  // Replace `ts-jest` with the preset you want to use
  // from the above list
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths: ["<rootDir>"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths /*, { prefix: '<rootDir>/' } */),
}
