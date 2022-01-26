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

  it('should create a artist', async () => {
    const res = await request(app).post('/api/v1/artists').send({
      artist: 'Saint Etienne',
      albumName: 'Foxbase Alpha',
      isFavorited: true,
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      artist: 'Saint Etienne',
      albumName: 'Foxbase Alpha',
      isFavorited: true,
    });
  });
});
