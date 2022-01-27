const pool = require('../utils/pool');

module.exports = class Food {
  id;
  food;
  isEdible;

  constructor(row) {
    this.id = row.id;
    this.food = row.food;
    this.isEdible = row.is_edible;
  }

  static async insert({ food, isEdible }) {
    const { rows } = await pool.query(
      'INSERT INTO foods(food, is_edible) VALUES ($1, $2, $3) RETURNING *;',
      [food, isEdible]
    );
    return new Food(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM foods;');
    return rows.map((row) => new Food(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM foods WHERE id=$1;', [id]);

    if (!rows[0]) return null;
    return new Food(rows[0]);
  }

  static async updateById(id, { food, isEdible }) {
    const result = await pool.query(
      `
      SELECT * FROM foods WHERE id=$1;
      `,
      [id]
    );
    const existingFood = result.rows[0];

    if (!existingFood) {
      const error = new Error(`Food ${id} not found`);
      error.status = 404;
      throw error;
    }
    const newfood = food ?? existingFood.food;
    const newisEdible = isEdible ?? existingFood.is_edible;

    const { rows } = await pool.query(
      'UPDATE foods SET food=$2, is_edible=$3 WHERE id=$1 RETURNING *;',
      [id, newfood, newisEdible]
    );
    return new Food(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM foods WHERE id=$1 RETURNING *;',
      [id]
    );
    if (!rows[0]) return null;
    return new Food(rows[0]);
  }
};
