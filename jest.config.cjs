const { pathsToModuleNameMapper } = require('ts-jest');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleNameMapper: pathsToModuleNameMapper(
		require('./.svelte-kit/tsconfig.json').compilerOptions.paths
	),
  testRegex: [
    '.*\\.test\\.ts$'
  ]
};
