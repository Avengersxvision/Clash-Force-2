// Vercel Serverless Function — CoC Player Lookup
// Tries multiple API keys in case Vercel rotates IPs
// Add keys as coc_api_1, coc_api_2, coc_api_3 in Vercel Environment Variables

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { tag } = req.query;
  if (!tag) return res.status(400).json({ error: 'Player tag is required' });

  const cleanTag = tag.replace(/^#/, '').toUpperCase();
  const url = `https://api.clashofclans.com/v1/players/%23${encodeURIComponent(cleanTag)}`;

  // Try each key until one works
  const keys = [
    process.env.coc_api_1,
    process.env.coc_api_2,
    process.env.coc_api_3,
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

      // If IP not allowed, try next key
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

  // All keys failed
  return res.status(403).json({
    error: 'All API keys blocked. Add Vercel IP to CoC developer portal.',
    detail: lastError
  });
}
