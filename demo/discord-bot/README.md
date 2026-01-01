# Roast Bot — Discord Integration Demo

A Discord bot that delivers AI-powered roasts using the [Roast as a Service](https://github.com/abhinavsingh1311/roast-api) API. Built as a demonstration of how to integrate the API into real-world applications.

## Features

- `/roast` slash command with configurable options
- Heat level control (1-5 intensity)
- Gaming-themed roasts by default
- Easy deployment to Railway or local development

## Tech Stack

- **Runtime**: Node.js
- **Library**: discord.js v14
- **API**: Roast as a Service

##  Prerequisites

- Node.js 18+
- Discord Bot Token ([Create one here](https://discord.com/developers/applications))
- Roast API Key ([Get one here](https://roast-api.up.railway.app))

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/abhinavsingh1311/roast-api.git
cd roast-api/demo/discord-bot
npm install
```

### 2. Configure Environment

Create a `.env` file:

```env
DISCORD_TOKEN=your_bot_token
ROAST_API_URL=https://roast-api.up.railway.app
ROAST_API_KEY=roast_your_key_here
CLIENT_ID=your_application_id
GUILD_ID=your_test_server_id
```

### 3. Register Slash Commands

Run once to register the `/roast` command with Discord:

```bash
node deploy-commands.js
```

### 4. Start the Bot

```bash
node index.js
```

## Usage

In any Discord channel where the bot is present:

```
/roast target:@username game:Valorant performance:"0 kills 15 deaths"
```

### Command Options

| Option | Required | Description |
|--------|----------|-------------|
| `target` | Yes | Who to roast |
| `game` | No | What game they failed at |
| `performance` | No | How badly they did |
| `heat` | No | Intensity 1-5 (default: 3) |

## Project Structure

```
discord-bot/
├── index.js            # Bot entry point
├── deploy-commands.js  # Slash command registration
├── commands/
│   └── roast.js        # Roast command logic
├── .env                # Environment variables
└── package.json
```

##  Deployment (Railway)

1. Create new service in Railway
2. Connect to GitHub repo
3. Set root directory to `demo/discord-bot`
4. Add environment variables
5. Deploy

Use internal URL if API is in same Railway project:
```
ROAST_API_URL=http://roast-api.railway.internal:4000
```

## Troubleshooting

**Command not appearing:**
- Re-run `node deploy-commands.js`
- Wait a few minutes for Discord to sync
- Check `CLIENT_ID` and `GUILD_ID` are correct

**"Unknown interaction" error:**
- Only run ONE instance of the bot at a time
- Stop local bot if running on Railway

**API connection failed:**
- Verify `ROAST_API_KEY` is valid
- Check `ROAST_API_URL` is accessible
- Ensure API service is running

##  License

MIT — See [LICENSE](../../LICENSE) for details.

## Links

- [Roast API Documentation](https://roast-api.up.railway.app)
- [Main Repository](https://github.com/abhinavsingh1311/roast-api)
- [Discord.js Guide](https://discordjs.guide/)