const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Food = require('../lib/models/Food.js');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a food', async () => {
    const res = await request(app).post('/api/v1/foods').send({
      food: 'pizza',
      isEdible: true,
    });

    expect(res.body).toEqual({
      id: '1',
      food: 'pizza',
      isEdible: true,
    });
  });

  it('should get a food by id', async () => {
    const food = await Food.insert({
      food: 'raisins - The devils fruit',
      isEdible: false,
    });
    const res = await request(app).get('/api/v1/foods/1');
    expect(res.body).toEqual(food);
  });

  it('should list all the foods', async () => {
    const food = await Food.insert({
      food: 'Lasagna',
      isEdible: true,
    });
    const food2 = await Food.insert({
      food: 'Wet socks',
      isEdible: false,
    });
    const res = await request(app).get('/api/v1/foods');
    expect(res.body).toEqual([food, food2]);
  });

  it('should update foods by id', async () => {
    const food = await Food.insert({
      food: 'Cereal(Some)',
      isEdible: false,
    });
    const res = await request(app)
      .patch('/api/v1/foods/1')
      .send({ isEdible: true });

    expect(res.body).toEqual({
      ...food,
      isEdible: true,
    });
  });

  it('should delete a food by id', async () => {
    const noFood = await Food.insert({
      food: 'Corn',
      isEdible: true,
    });
    const res = await request(app).delete(`/api/v1/foods/${noFood.id}`);
    expect(res.body).toEqual(noFood);
    expect(await Food.getById(noFood.id)).toBeNull();
  });
});
