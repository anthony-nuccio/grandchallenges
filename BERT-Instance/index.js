import 'dotenv/config';
import express from 'express';
import embeddingsRouter from './routes/embeddings.js';
import matchRouter from './routes/match.js';

const app = express();
app.use(express.json({ limit: '2mb' }));

app.use('/api/embeddings', embeddingsRouter);
app.use('/api/match', matchRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`RoomieRadar API running on :${port}`));
