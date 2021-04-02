const express = require('express');
const app = express();

const ash = require('express-async-handler');
const todo = require('./todo');

app.use(express.json());
app.get('/status', (req, res) => {
  res.send({ status: 'OK' });
});

app.get(
  '/todo',
  ash(async (req, res) => {
    const data = await todo.find(req.query);
    res.send(data);
  })
);

app.post(
  '/todo',
  ash(async (req, res) => {
    const td = new todo();
    td.label = req.body.label;
    await td.save();
    res.send();
  })
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
module.exports = app;
