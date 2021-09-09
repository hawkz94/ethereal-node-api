const express = require('express');
const cors = require('cors');
const { createEmail } = require('./bot');

const app = express();

app.use(cors());

const port = process.env.PORT;

app.get('/create-email', async (_, res) => {
  const result = await createEmail();
  res.send(result);
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})