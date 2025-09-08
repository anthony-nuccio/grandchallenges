import axios from 'axios';

const host = process.env.DATABRICKS_HOST;
const token = process.env.DATABRICKS_TOKEN;
const endpoint = process.env.DATABRICKS_SERVING;

const client = axios.create({
  baseURL: `${host}/api/2.0/serving-endpoints`,
  headers: { Authorization: `Bearer ${token}` },
  timeout: 30000
});

export async function embedText(text) {
  const resp = await client.post(`/${endpoint}/invocations`, {
    inputs: [{ text }]
  });
}

  const out = resp.data?.predictions?.[0];
  if (!out) throw new Error('No embedding returned from Databricks.');
  return out.embedding;
}
