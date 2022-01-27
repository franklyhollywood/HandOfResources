const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Dididoit = require('../lib/models/Dididoit.js');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a did it or not', async () => {
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

  it('should get a dididoit by id', async () => {
    const dididoit = await Dididoit.insert({
      dididoit: 'Eat a whole turkey by myself',
      isToBlame: false,
    });
    const res = await request(app).get('/api/v1/dididoit/1');
    expect(res.body).toEqual(dididoit);
  });

  it('should list all the Done its', async () => {
    const dididoit = await Dididoit.insert({
      dididoit: 'Start an earthquake',
      isToBlame: false,
    });
    const dididoit2 = await Dididoit.insert({
      dididoit: 'Wear dirty socks',
      isToBlame: false,
    });
    const res = await request(app).get('/api/v1/dididoit');
    expect(res.body).toEqual([dididoit, dididoit2]);
  });

  it('should update projector by id', async () => {
    const dididoit = await Dididoit.insert({
      dididoit: 'cause someone to die.',
      isToBlame: true,
    });
    const res = await request(app)
      .patch('/api/v1/dididoit/1')
      .send({ isToBlame: false });

    expect(res.body).toEqual({
      ...dididoit,
      isToBlame: false,
    });
  });

  it('should delete a projector by id', async () => {
    const noDididoit = await Dididoit.insert({
      dididoit: 'I have children',
      isToBlame: false,
    });
    const res = await request(app).delete(`/api/v1/dididoit/${noDididoit.id}`);
    expect(res.body).toEqual(noDididoit);
    expect(await Dididoit.getById(noDididoit.id)).toBeNull();
  });
});
