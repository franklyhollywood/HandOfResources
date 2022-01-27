const pool = require('../utils/pool');

module.exports = class Didyoudoit {
  id;
  didyoudoit;
  isToBlame;

  constructor(row) {
    this.id = row.id;
    this.didyoudoit = row.did_you_do_it;
    this.isToBlame = row.istoblame;
  }

  static async insert({ didyoudoit, isToBlame }) {
    const { rows } = await pool.query(
      'INSERT INTO didyoudoit(did_you_do_it, istoblame) VALUES ($1, $2) RETURNING *;',
      [didyoudoit, isToBlame]
    );
    return new Didyoudoit(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM didyoudoit;');
    return rows.map((row) => new Didyoudoit(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM didyoudoit WHERE id=$1;', [
      id,
    ]);

    if (!rows[0]) return null;
    return new Didyoudoit(rows[0]);
  }

  static async updateById(id, { didyoudoit, isToBlame }) {
    const result = await pool.query(
      `
      SELECT * FROM didyoudoit WHERE id=$1;
      `,
      [id]
    );
    const existingDidyoudoit = result.rows[0];

    if (!existingDidyoudoit) {
      const error = new Error(`Did you do it ${id} not found`);
      error.status = 404;
      throw error;
    }
    const newdidyoudoit = didyoudoit ?? existingDidyoudoit.did_you_do_it;
    const newistoblame = isToBlame ?? existingDidyoudoit.istoblame;

    const { rows } = await pool.query(
      'UPDATE didyoudoit SET did_you_do_it=$2, istoblame=$3 WHERE id=$1 RETURNING *;',
      [id, newdidyoudoit, newistoblame]
    );
    return new Didyoudoit(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM didyoudoit WHERE id=$1 RETURNING *;',
      [id]
    );
    if (!rows[0]) return null;
    return new Didyoudoit(rows[0]);
  }
};
