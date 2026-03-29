// Vercel Serverless Function — CoC Player Lookup
// File: /api/player.js
// Reads COC_API_KEY from Vercel environment variables
// Called by: /api/player?tag=ABC123

export default async function handler(req, res) {
  // Allow cross-origin from your own site
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { tag } = req.query;

  if (!tag) {
    return res.status(400).json({ error: 'Player tag is required' });
  }

  const apiKey = process.env.coc_api;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on server' });
  }

  // Clean tag — remove # and encode
  const cleanTag = tag.replace(/^#/, '').toUpperCase();
  const url = `https://api.clashofclans.com/v1/players/%23${cleanTag}`;

  try {
    const cocRes = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
      },
    });

    const data = await cocRes.json();

    if (!cocRes.ok) {
      return res.status(cocRes.status).json({
        error: data.message || `CoC API error: ${cocRes.status}`,
        reason: data.reason || 'unknown',
      });
    }

    // Return only what we need — no sensitive data
    return res.status(200).json({
      name:              data.name,
      tag:               data.tag,
      townHallLevel:     data.townHallLevel,
      expLevel:          data.expLevel,
      trophies:          data.trophies,
      bestTrophies:      data.bestTrophies,
      warStars:          data.warStars,
      attackWins:        data.attackWins,
      defenseWins:       data.defenseWins,
      donations:         data.donations,
      donationsReceived: data.donationsReceived,
      clan:              data.clan ? { name: data.clan.name, tag: data.clan.tag } : null,
      heroes:            (data.heroes || []).map(h => ({
        name:  h.name,
        level: h.level,
      })),
      league:            data.league ? data.league.name : null,
    });

  } catch (err) {
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
}
