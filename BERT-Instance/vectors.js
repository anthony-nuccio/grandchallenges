export function packFloat32LE(arr) {
  const buf = Buffer.allocUnsafe(arr.length * 4);
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  arr.forEach((v, i) => view.setFloat32(i * 4, v, true));
  return buf;
}

export function unpackFloat32LE(buf) {
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  const out = new Float32Array(buf.length / 4);
  for (let i = 0; i < out.length; i++) out[i] = view.getFloat32(i * 4, true);
  return Array.from(out);
}

export function cosine(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    const x = a[i], y = b[i];
    dot += x * y; na += x * x; nb += y * y;
  }
  const denom = Math.sqrt(na) * Math.sqrt(nb);
  return denom === 0 ? 0 : dot / denom;
}
