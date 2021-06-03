import type { Config } from "@jest/types";
import { pathsToModuleNameMapper } from "ts-jest/utils";
import { compilerOptions } from "./tsconfig.paths.json";

const config: Config.InitialOptions = {
  resetMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  modulePaths: ["<rootDir>"],
  setupFiles: ["<rootDir>/setupJestEnv.js"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};

export default config;
