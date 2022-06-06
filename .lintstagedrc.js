module.exports = {
  'src/**/*.{js,ts,css,md}': 'prettier --write -u',
  'src/**/*/*.{js,ts}': 'eslint --cache --fix',
}
