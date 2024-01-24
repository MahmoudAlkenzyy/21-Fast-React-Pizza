/** @type {import('prettier').Config} */
module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  pluginSearchDirs: true,
   plugins: ['eslint-config-prettier'],
  importOrder: ['^@', '^[a-zA-Z0-9-]+', '^[./]'],
}