const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs')
const xmlParser = require('xml2js').parseString

module.exports = (function (...args) {
  argv._.forEach(filename => {
    fs.readFile(filename, (err, data) => {
      if (err) return console.log('Cannot access file ' + filename)
      exportJson(data, filename)
    })
  })
})()

function exportJson(data, filename) {
  return xmlParser(data, (err, obj) => {
    if (err) return console.log('Error parsing XML from file ' + filename)
    saveJsonFile(filename + '.json', normalizeObject(obj))
  })
}

function saveJsonFile(filename, obj) {
  const indent = (argv.M || argv.minimize) ? 0 : 2

  return fs.writeFile(filename, JSON.stringify(obj, null, indent), err => {
    if (err) console.log('Error saving exported JSON to file ' + filename)
  })
}

function normalizeObject(obj) {
  if (argv.B || argv.bypass) return obj
  if (!obj.FileZilla) return obj

  const groups = objPath(obj, 'Groups')
  obj.FileZilla.Groups = (groups || []).map(group => parseGroup(group.Group))

  return obj
}

//////////////////////////////////////////////////////
function parseItemName(obj) {
  if (obj === null) return
  const result = {}
  const namedResult = {}

  if (typeof (obj.$) === 'object') {
    Object.keys(obj.$).forEach(key => {
      if (key.toLowerCase() === 'name') {
        namedResult =
      }
    })
    const key = obj.$.Name || obj.$.name

    delete obj.$
  }

  return obj
}

function parseGroup(group) {
  var result = {}

  return group
}

function createObjPath(path) {
  return path.split('.')
}

function objPath(object, strPath, defaultValue) {
  const pathParts = strPath.split('.')

  if (pathParts[0] && pathParts[0].toLowerCase() !== 'filezillaserver') {
    pathParts.unshift('FileZillaServer')
  }

  return pathParts.reduce((o, k) =>
    Reflect.has(o, k) ? o[k] : defaultValue, object)
}


