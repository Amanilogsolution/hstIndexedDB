const jsonfile = require('./lib')
 
const file = './data.json'
const obj = { name: 'Amresh',age:10009,status:'Tooo Old' }
 
jsonfile.writeFile(file, obj, function (err) {
  if (err) console.error(err)
})

jsonfile.readFile(file, function (err, obj) {
    if (err) console.error(err)
    console.dir(obj)
  })
