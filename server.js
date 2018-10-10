const express = require('express')
const fs = require('fs')
const app = express()
const port = 11007
const bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 

var students_str = fs.readFileSync('./students.json', 'utf-8')
var students = JSON.parse(students_str)

app.use(express.static(__dirname + '/public'))

app.get('/search', function(req, res){
  var search_id = req.query.search_id 
  res.send(students[search_id])
});

app.get('/list_student', function(req, res){
  // console.log(students_str);
  pretty_str = students_str.substring(1, students_str.length-1).split(',').join('<br>') 
  res.send(pretty_str)
});

app.post('/add', function(req,res){
  students[req.body.new_id] = req.body.new_name;
  students_str = JSON.stringify(students);
  fs.writeFile("students.json", students_str, function(err){
    if (err){
      console.log(err);
    }
  })
});

app.post('/delete', function(req, res){
  delete students[req.body.del_id];
  students_str = JSON.stringify(students);
  fs.writeFile("students.json", students_str, function(err){
    if (err){
      console.log(err);
    }
  });
})

app.listen(port)
