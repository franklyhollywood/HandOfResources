const pool = require('../utils/pool');

module.exports = class Haveyoudoneit {
  id;
  haveyoudoneit;
  isdone;

  constructor(row) {
    this.id = row.id;
    this.haveyoudoneit = row.have_you_done_it;
    this.isdone = row.is_done;
  }

  static async insert({ haveyoudoneit, isdone }) {
    const { rows } = await pool.query(
      'INSERT INTO haveyoudoneit(have_you_done_it, is_done) VALUES ($1, $2) RETURNING *;',
      [haveyoudoneit, isdone]
    );
    return new Haveyoudoneit(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM haveyoudoneit;');
    return rows.map((row) => new Haveyoudoneit(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM haveyoudoneit WHERE id=$1;',
      [id]
    );

    if (!rows[0]) return null;
    return new Haveyoudoneit(rows[0]);
  }

  static async updateById(id, { haveyoudoneit, isdone }) {
    const result = await pool.query(
      `
      SELECT * FROM haveyoudoneit WHERE id=$1;
      `,
      [id]
    );
    const existingHaveyoudoneit = result.rows[0];

    if (!existingHaveyoudoneit) {
      const error = new Error(`Have you done it ${id} not found`);
      error.status = 404;
      throw error;
    }
    const newhaveyoudoneit =
      haveyoudoneit ?? existingHaveyoudoneit.have_you_done_it;
    const newisdone = isdone ?? existingHaveyoudoneit.is_done;

    const { rows } = await pool.query(
      'UPDATE haveyoudoneit SET have_you_done_it=$2, is_done=$3 WHERE id=$1 RETURNING *;',
      [id, newhaveyoudoneit, newisdone]
    );
    return new Haveyoudoneit(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM haveyoudoneit WHERE id=$1 RETURNING *;',
      [id]
    );
    if (!rows[0]) return null;
    return new Haveyoudoneit(rows[0]);
  }
};
