const supertest = require('supertest');
const app = require('./server');
const db = require('./db');
const todo = require('./todo');
describe('Todo', () => {
  beforeAll(async () => {
    await db.connect();
    await todo.deleteMany();
  });

  it('status ok', async () => {
    const res = await supertest(app).get('/status');
    expect(res.body).toStrictEqual({ status: 'OK' });
  });

  it('reset todo', async () => {
    const res = await supertest(app).get('/todo');
    expect(res.body).toHaveLength(0);
  });

  it('add todo', async () => {
    const res = await supertest(app).post('/todo').send({ label: 'autotest' });
    expect(res.status).toBe(200);
  });

  it('search todo', async () => {
    const res = await supertest(app).get('/todo').query({ label: 'autotest' });
    expect(res.body).toHaveLength(1);
    expect(res.body[0].label).toBe('autotest');
  });

  it('add empty todo ', async () => {
    const res = await supertest(app).post('/todo');
    expect(res.status).toBe(500);
  });

  afterAll(async () => {
    await db.close();
  });
});
