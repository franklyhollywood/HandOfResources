const pool = require('../utils/pool');

module.exports = class Artist {
  id;
  artist;
  albumName;
  isFavorited;

  constructor(row) {
    this.id = row.id;
    this.artist = row.artist;
    this.albumName = row.album_name;
    this.isFavorited = row.is_favorited;
  }

  static async insert({ artist, albumName, isFavorited }) {
    const { rows } = await pool.query(
      'INSERT INTO artists(artist, album_name, is_favorited) VALUES ($1, $2, $3) RETURNING *;',
      [artist, albumName, isFavorited]
    );
    return new Artist(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM artists;');
    return rows.map((row) => new Artist(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM artists WHERE id=$1;', [
      id,
    ]);

    if (!rows[0]) return null;
    return new Artist(rows[0]);
  }

  static async updateById(id, { artist, albumName, isFavorited }) {
    const result = await pool.query(
      `
      SELECT * FROM artists WHERE id=$1;
      `,
      [id]
    );
    const existingArtist = result.rows[0];

    if (!existingArtist) {
      const error = new Error(`Artist ${id} not found`);
      error.status = 404;
      throw error;
    }
    const newartist = artist ?? existingArtist.artist;
    const newalbumName = albumName ?? existingArtist.albumName;
    const newisFavorited = isFavorited ?? existingArtist.isFavorited;
    const { rows } = await pool.query(
      'UPDATE artists SET artist=$2, album_name=$3, is_favorited=$4 WHERE id=$1 RETURNING *;',
      [id, newartist, newalbumName, newisFavorited]
    );
    return new Artist(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM artists WHERE id=$1 RETURNING *;',
      [id]
    );
    if (!rows[0]) return null;
    return new Artist(rows[0]);
  }
};
