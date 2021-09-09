const express = require('express');
const cors = require('cors');
const { v4 } = require('uuid');
const { createEmail } = require('./bot');

const app = express();

app.use(cors());

const port = process.env.PORT;

app.get('/api', (_, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

app.get('/create-email', async (_, res) => {
  const result = await createEmail();
  res.send(result);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
});