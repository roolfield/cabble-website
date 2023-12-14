import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://0.0.0.0:4242/graphql',
  watch: ['src/**/*.ts?(x)'],
  documents: ['src/**/*.ts?(x)'],
  generates: {
    'src/generated/': {
      preset: 'client-preset',
    },
  },
};

export default config;
