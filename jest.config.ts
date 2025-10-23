import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // поддержка TypeScript через ts-jest
  testEnvironment: 'jsdom', // эмуляция браузера (для фронтенда)
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // трансформация TS → JS
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(uuid)/)' // транспилируем ESM-пакеты, например uuid
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // поддержка алиасов из Vite
  },
  roots: ['<rootDir>/src'], // тесты ищутся в src
  testMatch: [
    '**/__tests__/**/*.(test|spec).[tj]s?(x)', // стандартные папки
    '**/?(*.)+(test|spec).[tj]s?(x)', // файлы *.test.ts
  ],
  clearMocks: true, // очищает моки перед каждым тестом
};

export default config;
