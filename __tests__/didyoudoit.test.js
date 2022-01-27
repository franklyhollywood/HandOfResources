const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Didyoudoit = require('../lib/models/Didyoudoit.js');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a did you do it', async () => {
    const res = await request(app).post('/api/v1/didyoudoit').send({
      didyoudoit: 'Punch me in the face',
      isToBlame: false,
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      didyoudoit: 'Punch me in the face',
      isToBlame: false,
    });
  });

  it('should get a didyoudoit by id', async () => {
    const didyoudoit = await Didyoudoit.insert({
      didyoudoit: 'Eat my lunch out of the fridge?',
      isToBlame: true,
    });
    const res = await request(app).get('/api/v1/didyoudoit/1');
    expect(res.body).toEqual(didyoudoit);
  });

  it('should list all the you done its', async () => {
    const didyoudoit = await Didyoudoit.insert({
      didyoudoit: 'Make someone cry',
      isToBlame: true,
    });
    const didyoudoit2 = await Didyoudoit.insert({
      didyoudoit: 'Eat a handful of rocks',
      isToBlame: true,
    });
    const res = await request(app).get('/api/v1/didyoudoit');
    expect(res.body).toEqual([didyoudoit, didyoudoit2]);
  });

  it('should update what you did by id', async () => {
    const didyoudoit = await Didyoudoit.insert({
      didyoudoit: 'Cause a bathroom incident',
      isToBlame: true,
    });
    const res = await request(app)
      .patch('/api/v1/didyoudoit/1')
      .send({ isToBlame: false });

    expect(res.body).toEqual({
      ...didyoudoit,
      isToBlame: false,
    });
  });

  it('should delete what you did by id', async () => {
    const noDidyoudoit = await Didyoudoit.insert({
      didyoudoit: 'Make me pregnant',
      isToBlame: true,
    });
    const res = await request(app).delete(
      `/api/v1/didyoudoit/${noDidyoudoit.id}`
    );
    expect(res.body).toEqual(noDidyoudoit);
    expect(await Didyoudoit.getById(noDidyoudoit.id)).toBeNull();
  });
});
