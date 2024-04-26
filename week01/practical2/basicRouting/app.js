const express = require('express');
const app = express();
const port = 3000;

//GET
app.get('/', (req, res) => {
  res.send('Hello World from Express 2!')
})

//POST
app.post('/', (req, res) => {
    res.send('Got a POST request')
})

//PUT
app.put('/user', (req, res) => {
    res.send('Got a PUT request at /user')
})

//DELETE
app.delete('/user', (req, res) => {
    res.send('Got a DELETE request at /user')
})

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})
