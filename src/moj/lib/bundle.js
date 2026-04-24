const commonjs = require('@rollup/plugin-commonjs').default
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const { rollup } = require('rollup')

/**
 * @param {string} filePath - path to the file to bundle
 * @param {string} moduleName - class name of the module
 */
const bundleComponent = async (filePath, moduleName) => {
  const bundle = await rollup({
    input: filePath,
    plugins: [nodeResolve({ browser: true }), commonjs()]
  })

  const { output } = await bundle.generate({
    format: 'es'
  })

  const bundledCode = `
      ${output[0].code}
      // Make alert available on window
      window.${moduleName} = ${moduleName}
    `
  await bundle.close()

  return bundledCode
}

module.exports = {
  bundleComponent
}
