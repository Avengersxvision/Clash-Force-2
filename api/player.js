export async function onRequest(context) {
  const url = new URL(context.request.url);
  const tag = url.searchParams.get('tag');

  if (!tag) {
    return Response.json({ error: 'Player tag is required' }, { status: 400 });
  }

  const cleanTag = tag.replace(/^#/, '').toUpperCase();
  const cocUrl = `https://api.clashofclans.com/v1/players/%23${cleanTag}`;

  const res = await fetch(cocUrl, {
    headers: {
      'Authorization': `Bearer ${context.env.coc_api}`,
      'Accept': 'application/json'
    }
  });

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
```

---

**Step 4 — Add your API key**
- Cloudflare Dashboard → Pages → clashforge → **Settings** → **Environment Variables**
- Add: `coc_api` = your CoC API token
- Click **Save**

---

**Step 5 — Whitelist Cloudflare IPs in CoC API**

Go to developer.clashofclans.com and add these to your API key:
```
162.158.0.0/15
172.64.0.0/13
173.245.48.0/20
103.21.244.0/22
```

---

**Step 6 — Test**
```
https://clashforge.pages.dev/api/player?tag=Q0GL8VQP9
```

Should return your full player JSON. Done — no more IP rotation issues, ever.

---

**Your folder structure on GitHub:**
```
clashforge/
├── index.html
├── ads.txt
├── README.md
└── functions/
    └── api/
        └── player.js   ← Cloudflare Pages Function
