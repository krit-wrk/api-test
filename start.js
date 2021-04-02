const app = require('./server');
const db = require('./db');
db.connect().then(() => {
  app.listen(3000, () => console.log('app running'));
});
console.log('aaa');
