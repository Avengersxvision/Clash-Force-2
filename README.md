# Clash-Force-2
# ⚔ ClashForge — Clash of Clans Fan Toolkit

> **Unofficial fan resource. Not affiliated with Supercell.**

A free, no-login Clash of Clans toolkit built for chiefs at every Town Hall level. Calculate, plan, and dominate — all in one place.

🌐 **Live site:** [clashforce.vercel.app](https://clashforce.vercel.app)

---

## 🛠️ Tools

| Tool | Description |
|------|-------------|
| ⏱ Build Timer | Speed boost calculator with booster time tracking |
| 🦸 Hero Tracker | Cost to max any hero at your TH level |
| 💰 Farming Calc | How many raids to fund your next upgrade |
| ⚔ War Weight | Redesigned war weight calculator with category breakdown |
| 🏰 Base Maxing Guide | Priority upgrade list for every TH aligned to Chief's Journey |
| ⚒️ Equip & Ores | Ore cost calculator for all Hero Equipment upgrades |
| 💎 Gem Calculator | Gems needed to skip any build timer |
| 🧱 Wall Calculator | Gold/Elixir to max all walls at your TH |
| 🏆 Base Strength Score | 0–100 strength score with Chief rank |
| 🗺️ Upgrade Roadmap | Week-by-week upgrade priority plan per TH |
| ⚖️ Loot Efficiency | Compare army training cost vs loot return |
| 🪪 Progress Card | Shareable hero progress card (screenshot ready) |
| 🚨 Rush Detector | Check if your base is rushed vs your TH level |
| ⏳ Time to Max | Estimate remaining time to max your TH |
| 🔍 Player Lookup | Live player data via CoC API (tag only, no login) |

---

## 📁 Project Structure

```
clashforge/
├── index.html        # Main single-page app (all tools)
├── api/
│   └── player.js     # Vercel serverless function — CoC API proxy
├── ads.txt           # AdSense verification
└── README.md
```

---

## 🚀 Deployment

This project is deployed on **Vercel**. Every push to `main` auto-deploys to production.

### Environment Variables

Set this in your Vercel project dashboard under **Settings → Environment Variables**:

| Variable | Description |
|----------|-------------|
| `coc_api` | Your Clash of Clans API key from [developer.clashofclans.com](https://developer.clashofclans.com) |

> ⚠️ The CoC API key must be whitelisted to your Vercel server's IP. The `/api/player.js` function acts as a proxy so users never see your key.

### How the API works

```
User enters player tag
        ↓
/api/player?tag=ABC123  (Vercel serverless function)
        ↓ (uses coc_api env variable — hidden from users)
api.clashofclans.com
        ↓
Player data → auto-fills Progress Card, Rush Detector, Time to Max
```

---

## ⚖️ Legal

ClashForge is an **unofficial fan resource** and is not affiliated with, endorsed by, or connected to **Supercell Oy** in any way.

Clash of Clans™ is a trademark of Supercell. All game content, names, and imagery belong to their respective owners.

All calculated values are community-based estimates and may vary in-game.

---

## 📬 Contact & Support

- **Ko-fi:** [ko-fi.com/clashforge](https://ko-fi.com/clashforge)
- **Bug reports / suggestions:** Use the Support page on the site

---

*Built with ❤️ by a fellow chief.*
