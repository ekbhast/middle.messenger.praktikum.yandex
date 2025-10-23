import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(uuid)/)',
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    roots: ['<rootDir>/src'],
    testMatch: [
        '**/__tests__/**/*.(test|spec).[tj]s?(x)',
        '**/?(*.)+(test|spec).[tj]s?(x)',
    ],
    clearMocks: true,
};

export default config;
