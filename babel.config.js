module.exports = {
  browserslistEnv: 'javascripts',
  presets: ['@babel/preset-env'],
  env: {
    test: {
      browserslistEnv: 'node'
    }
  }
}
