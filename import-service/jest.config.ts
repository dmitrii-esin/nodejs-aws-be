import type { Config } from "@jest/types";
import { pathsToModuleNameMapper } from "ts-jest/utils";

// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
import { compilerOptions } from "./tsconfig.paths.json";

const config: Config.InitialOptions = {
  // [...]
  // Replace `ts-jest` with the preset you want to use
  // from the above list
  resetMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  modulePaths: ["<rootDir>"],
  setupFiles: ["<rootDir>/setEnvVars.js"],
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths /*, { prefix: '<rootDir>/' } */
  ),
};

export default config;
