const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it.skip('should create a done it or not', async () => {
    const res = await request(app).post('/api/v1/dididoit').send({
      dididoit: 'start a big fire',
      isToBlame: false,
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      dididoit: 'start a big fire',
      isToBlame: false,
    });
  });
});
