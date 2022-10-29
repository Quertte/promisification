const fs = require('fs');

const readfile = (path, encoding) => new Promise((resolve, reject) => {
  fs.readFile(path, encoding, (error, data) => {
    if (error) {
      reject(error)
    } else {
      resolve(data);
    }
  })
})

const readdir = (path) => new Promise((resolve, reject) => {
  fs.readdir(path, (error, files) => {
    if (error) reject(error)
    else resolve(files)
  })
})

const stat = (file) => new Promise((resolve, reject) => {
  fs.stat(file, (err, stats) => {
    if (err) reject(err)
    else resolve(stats)
  })
})

const rename = (oldPath, newPath) => new Promise((resolve, reject) => {
  fs.rename(oldPath, newPath, (err) => {
    if (err) reject(err)
    else resolve()
  })
})


const randomStr = () => {
  let resultStr = '';
  for (let i = 0; i < 5; i++) {
    resultStr += String.fromCodePoint(Math.floor(Math.random() * (123 - 97 + 1)) + 97);
  }
  return resultStr;
}

readdir(`${__dirname}/notes`)
  .then(arrFiles => {
    arrFiles.forEach(file => {
      stat(`${__dirname}/notes/${file}`)
        .then(size => rename(`${__dirname}/notes/${file}`, `${__dirname}/notes/note-${randomStr()}-${size.size}-${size.birthtime}`)
        )
    })
  })
