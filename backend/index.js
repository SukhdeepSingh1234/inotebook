const connectToMongo=require('./db');
const express = require('express');

connectToMongo();
const app = express()
const port = 1330

app.use(express.json()); // Used to send data in json format

// Available routes
app.use('/api/auth',require('./routes/auth')); // it is invoked when request is made at /api/auth
app.use('/api/notes',require('./routes/notes'));// it is invoked when request is made at /api/notes



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) 