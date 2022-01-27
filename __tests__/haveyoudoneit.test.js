const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Haveyoudoneit = require('../lib/models/Haveyoudoneit.js');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a have you done it', async () => {
    const res = await request(app).post('/api/v1/haveyoudoneits').send({
      haveyoudoneit: 'Kick a girl',
      isdone: false,
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      haveyoudoneit: 'Kick a girl',
      isdone: false,
    });
  });

  it('should get a have you done it by id', async () => {
    const haveyoudoneit = await Haveyoudoneit.insert({
      haveyoudoneit: 'Eat someone elses lunch out of the fridge?',
      isdone: true,
    });
    const res = await request(app).get('/api/v1/haveyoudoneits/1');
    expect(res.body).toEqual(haveyoudoneit);
  });

  it('should list all the have you done its', async () => {
    const haveyoudoneit = await Haveyoudoneit.insert({
      haveyoudoneit: 'Make someone cry',
      isdone: false,
    });
    const haveyoudoneit2 = await Haveyoudoneit.insert({
      haveyoudoneit: 'Giving a gift to a stanger',
      isdone: true,
    });
    const res = await request(app).get('/api/v1/haveyoudoneits');
    expect(res.body).toEqual([haveyoudoneit, haveyoudoneit2]);
  });

  it('should update Have you done it by id', async () => {
    const haveyoudoneit = await Haveyoudoneit.insert({
      haveyoudoneit: 'Brushed your tooth',
      isdone: true,
    });
    const res = await request(app)
      .patch('/api/v1/haveyoudoneits/1')
      .send({ isdone: false });

    expect(res.body).toEqual({
      ...haveyoudoneit,
      isdone: false,
    });
  });

  it('should delete what you have done by id', async () => {
    const noHaveyoudoneit = await Haveyoudoneit.insert({
      haveyoudoneit: 'Seen a shooting star',
      isdone: true,
    });
    const res = await request(app).delete(
      `/api/v1/haveyoudoneits/${noHaveyoudoneit.id}`
    );
    expect(res.body).toEqual(noHaveyoudoneit);
    expect(await Haveyoudoneit.getById(noHaveyoudoneit.id)).toBeNull();
  });
});
