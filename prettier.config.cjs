/** @typedef {import('@ianvs/prettier-plugin-sort-imports').PluginConfig} SortImportsConfig */
/** @typedef {import('prettier').Config} PrettierConfig */

/** @type {PrettierConfig | SortImportsConfig} */
const config = {
  semi: true,
  singleQuote: true,
  trailingComma: 'none',
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-packagejson',
    'prettier-plugin-tailwindcss'
  ],
  importOrder: [
    '^react',
    '',
    '<TYPES>',
    '<TYPES>^[./]',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/(.*)$',
    '',
    '^[./]'
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  tabWidth: 2,
  useTabs: false
};

module.exports = config;
