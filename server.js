const express = require('express')
const app = express()
const port = 11107


app.use(express.static(__dirname + '/public'))

app.get('/search', function(req, res){
  res.send(`<h2>Search result for ${req.query.search_id}:</h2>`)
})

app.listen(port)
