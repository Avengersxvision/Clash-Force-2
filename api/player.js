export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { tag } = req.query;
  if (!tag) return res.status(400).json({ error: 'Player tag is required' });

  const cleanTag = tag.replace(/^#/, '').toUpperCase();
  const url = `https://api.clashofclans.com/v1/players/%23${encodeURIComponent(cleanTag)}`;

  const keys = [
    process.env.coc_api,
    process.env.coc_api_2,
  ].filter(Boolean);

  if (keys.length === 0) {
    return res.status(500).json({ error: 'No API keys configured on server' });
  }

  let lastError = null;

  for (const key of keys) {
    try {
      const cocRes = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${key}`,
          'Accept': 'application/json',
        },
      });

      const data = await cocRes.json();

      if (cocRes.status === 403 && data.reason === 'accessDenied.invalidIp') {
        lastError = data;
        continue;
      }

      return res.status(cocRes.status).json(data);

    } catch (err) {
      lastError = { error: err.message };
      continue;
    }
  }

  return res.status(403).json({
    error: 'All API keys blocked. Add current Vercel IP to CoC developer portal.',
    detail: lastError
  });
}
