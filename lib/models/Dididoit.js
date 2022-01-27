const pool = require('../utils/pool');

module.exports = class Dididoit {
  id;
  dididoit;
  isToBlame;

  constructor(row) {
    this.id = row.id;
    this.dididoit = row.did_i_doit;
    this.isToBlame = row.istoblame;
  }

  static async insert({ dididoit, isToBlame }) {
    const { rows } = await pool.query(
      'INSERT INTO dididoit(did_i_doit, istoblame) VALUES ($1, $2) RETURNING *;',
      [dididoit, isToBlame]
    );
    return new Dididoit(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM dididoit;');
    return rows.map((row) => new Dididoit(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM dididoit WHERE id=$1;', [
      id,
    ]);

    if (!rows[0]) return null;
    return new Dididoit(rows[0]);
  }

  static async updateById(id, { dididoit, isToBlame }) {
    const result = await pool.query(
      `
      SELECT * FROM dididoit WHERE id=$1;
      `,
      [id]
    );
    const existingDididoit = result.rows[0];

    if (!existingDididoit) {
      const error = new Error(`Did I do it ${id} not found`);
      error.status = 404;
      throw error;
    }
    const newdididoit = dididoit ?? existingDididoit.did_i_doit;
    const newistoblame = isToBlame ?? existingDididoit.istoblame;

    const { rows } = await pool.query(
      'UPDATE dididoit SET did_i_doit=$2, istoblame=$3 WHERE id=$1 RETURNING *;',
      [id, newdididoit, newistoblame]
    );
    return new Dididoit(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM dididoit WHERE id=$1 RETURNING *;',
      [id]
    );
    if (!rows[0]) return null;
    return new Dididoit(rows[0]);
  }
};
