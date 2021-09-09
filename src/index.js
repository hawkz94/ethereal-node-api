const express = require('express');
const cors = require('cors');
const initBot = require('./bot')

const app = express();

app.use(cors());

const port = process.env.PORT;

app.get('/create-email', async (req, res) => {
  await initBot();
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})