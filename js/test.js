var jsonfile = require('./lib')
var file = './data.json'

console.log(jsonfile)
abc()

function abc(){
//   var data = JSON.parse(localStorage.getItem('download'))
console.log(jsonfile)
data = [{name:"aman lohan"}]
    jsonfile.writeFile(file, data, function (err) {
      if (err) console.error(err)
    })

    jsonfile.readFile(file, function (err, obj1) {
      if (err) console.error(err)
      console.dir(obj1)
    })
  }

 