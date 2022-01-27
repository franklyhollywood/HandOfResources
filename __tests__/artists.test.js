const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Artist = require('../lib/models/Artist.js');

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

  it('should get an artist by id', async () => {
    const artist = await Artist.insert({
      artist: 'Saint Etienne',
      albumName: 'Foxbase Alpha',
      isFavorited: true,
    });
    const res = await request(app).get('/api/v1/artists/1');
    expect(res.body).toEqual(artist);
  });

  it('should list all the artists', async () => {
    const artist = await Artist.insert({
      artist: 'Ministry',
      albumName: 'With Sympathy',
      isFavorited: true,
    });
    const artist2 = await Artist.insert({
      artist: 'Bauhaus',
      albumName: 'Press the Eject and Give Me the Tape',
      isFavorited: true,
    });
    const res = await request(app).get('/api/v1/artists');
    expect(res.body).toEqual([artist, artist2]);
  });

  it('should update artist by id', async () => {
    const artist = await Artist.insert({
      artist: 'The Blow',
      albumName: 'Paper Television',
      isFavorited: false,
    });
    const res = await request(app)
      .patch('/api/v1/artists/1')
      .send({ isFavorited: true });

    expect(res.body).toEqual({
      ...artist,
      isFavorited: true,
    });
  });

  it('should delete an artist by id', async () => {
    const noArtist = await Artist.insert({
      artist: 'The Blow',
      albumName: 'Paper Television',
      isFavorited: false,
    });
    const res = await request(app).delete(`/api/v1/artists/${noArtist.id}`);
    expect(res.body).toEqual(noArtist);
    expect(await Artist.getById(noArtist.id)).toBeNull();
  });
});
