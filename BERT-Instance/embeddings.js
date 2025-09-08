import { Router } from 'express';
import { getPool, sql } from '../services/sql.js';
import { embedText } from '../services/databricks.js';
import { packFloat32LE } from '../services/vectors.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { userId, bio } = req.body;
    if (!userId || !bio) return res.status(400).json({ error: 'userId and bio required' });

    const vec = await embedText(bio);
    const buf = packFloat32LE(vec);

    const pool = await getPool();
    await pool.request()
      .input('user_id', sql.BigInt, userId)
      .input('bio', sql.NVarChar(sql.MAX), bio)
      .input('embedding_binary', sql.VarBinary(sql.MAX), buf)
      .input('dim', sql.Int, vec.length)
      .query(`
        MERGE dbo.UserEmbeddings AS tgt
        USING (SELECT @user_id AS user_id) AS src
        ON tgt.user_id = src.user_id
        WHEN MATCHED THEN
          UPDATE SET bio=@bio, embedding_binary=@embedding_binary, dim=@dim, updated_at=SYSUTCDATETIME()
        WHEN NOT MATCHED THEN
          INSERT (user_id, bio, embedding_binary, dim, updated_at)
          VALUES (@user_id, @bio, @embedding_binary, @dim, SYSUTCDATETIME());
      `);

    res.json({ ok: true, userId, dim: vec.length });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

export default router;
