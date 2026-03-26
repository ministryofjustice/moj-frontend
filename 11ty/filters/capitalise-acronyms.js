module.exports = function (string) {
  const acronyms = ['pds', 'moj']

  let output = String(string)

  acronyms.forEach((acronym) => {
    const regex = new RegExp(acronym, 'gi')
    output = output.replaceAll(regex, acronym.toUpperCase())
  })

  return output
}
