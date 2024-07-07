/** @type {import('prettier').Config} */
module.exports = {
  endOfLine: 'auto',
  semi: false,
  useTabs: true,
  singleQuote: true,
  arrowParens: 'avoid',
  tabWidth: 2,
  trailingComma: 'none',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.cjs'
}
