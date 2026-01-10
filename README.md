# Roast as a service

## What is it?
[![License: Apache](https://img.shields.io/badge/License-Apache-yellow.svg)](/LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.0+-purple.svg)](https://www.prisma.io/)

A configurable AI-powered roast API for Discord bots, streams, educational apps, and productivity tools. Generate witty, personalized burns with adjustable intensity levels.

## Table of Contents

- [Features](#-features)
- [Use Cases](#-use-cases)
- [Content rules](#content-rules)
- [Tech Stack](#️-tech-stack)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Configuration](#️-configuration)
- [Deployment](#-deployment)
- [Demo](#-demo)
- [Contributing](#-contributing)
- [License](#-license)

## Features

- **4 Themed Roast Categories**: Gaming, Coding, Productivity, Educational
- **Heat Meter (1-5)**: Control roast intensity from grandma-safe to unfiltered
- **Context-Aware**: Personalize roasts with names, game stats, scores, and more
- **Safe Defaults**: SFW by default, no slurs or hate speech at any level
- **Rate Limiting**: Built-in abuse prevention
- **Self-Service API Keys**: No manual approval needed

## USECASES:

-  First case: 
	- Website : `let's say on an educational site where a student doesn't get the answers correct at all time , so they can be roasted lightly to motivate them, e.g. if someone scores a 0, we can say , good grace, the Aryabhatta invented zero because he knew you are gonna give this test one day.`

- Second case :
	- Discord Bots : `i think it would be mostly used for gaming in teams. so the roast could be something along those lines , based on the username, game, score etc.`

- Third case: 
	- Slack : `i think this could be either for a startup with small teams, or students working on group projects/ Since it is professional settings , we can keep the roast lighter.`

- Fourth case:
	- Dedication/Discipline/Motivation/Habit apps: `screentime , habit builder, anything related, we can provide roasts based on the user name, what activity is being performed , how far are they in building that activity/ habit , are they doing bare min or not. Something along those lines.`

## CONTENT RULES:

- Be SFW until explicitly describes by the user ( we can have a heat meter , higher heat means more edgier roasts, max = 5 (allows NSFW), default=2, min=1). 
- Under License that states User understands the repercussions if used incorrectly and developer wont be held responsible under any circumstances.
- No minors related content. Allows eddy/profane but no slurs/hate speech (only in NSFW mode). 
- Themes can be chosen on configuration. Most commonly listed themes are `coding`, `productivity`, `motivation`, `gaming`, `hangouts`, `educational`.
- Max length allowed is 400 characters ( or about 5 lines).
- Parameters can be included in the API req to make it more memorable. Most common params include: `name (username/ full name)`, `based on the theme: (e.g. gaming: game name , type, player performance)`, `length: if more words requested, then response will be more creative, certain params are only available based on app-type selection` 
- Safe defaults; as mentioned earlier, it is important to have safe defaults to allow users to get started with minimum config requirements. Some of these include: themes set to `generic`, heat-meter : `2`, params: `none`, app-type: `website`, length: `200 characters`.  
- Most responses are set to be randomized to ensure is it not repeated for entirety of list of size n , creating probability to be repeated to 1/n.
- Use a wide range of vocabulary, it includes `adjectives`, `adverbs` etc.

## Tech Stack

- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **AI**: OpenAI GPT-4o-mini
- **Deployment**: Railway

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- OpenAI API key

### Installation

```bash
# Clone the repository
git clone https://github.com/abhinavsingh1311/roast-api.git
cd roast-api

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```
### Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/roast_db
OPENAI_API_KEY=sk-your-openai-key
PORT=4000
```

## API Documentation

Base URL: `https://roast-api.up.railway.app`

### Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/health` | Health check | No |
| POST | `/v1/api-keys` | Create API key | No |
| GET | `/v1/themes` | List themes | No |
| POST | `/v1/roast` | Generate roast | Yes |

### Quick Example

```bash
# Create API key
curl -X POST https://roast-api.up.railway.app/v1/api-keys \
  -H "Content-Type: application/json" \
  -d '{"name": "My App", "email": "dev@example.com"}'

# Generate roast
curl -X POST https://roast-api.up.railway.app/v1/roast \
  -H "Content-Type: application/json" \
  -H "x-api-key: roast_your_key" \
  -d '{
    "theme": "GAMING",
    "heat": 3,
    "context": 
    {
      "name": "Dave",
      "game": "Valorant",
      "performance": "0 kills, 15 deaths"
    }
  }'
```
### Response

```json
{
  "roast": "0 kills and 15 deaths? Dave, the enemy team is using you as a health pack. Maybe try Minecraft—at least the zombies move slower than your reaction time.",
  "theme": "GAMING",
  "heat": 3
}
```

### Themes

| Theme | Description | Context Fields |
|-------|-------------|----------------|
| `CODING` | Dev/programming roasts | language, mistake, experience |
| `GAMING` | Gamer performance roasts | game, performance, rank |
| `PRODUCTIVITY` | Habit/discipline roasts | habit, streak, screenTime |
| `EDUCATIONAL` | Student/learning roasts | subject, score, mistake |

### Heat Levels

| Level | Name | Description |
|-------|------|-------------|
| 1 | Grandma Safe | Gentle teasing, almost a compliment |
| 2 | Office Appropriate | Light burns, no profanity (default) |
| 3 | Friend Group | Solid roasts, mild profanity okay |
| 4 | Harsh But Fair | Sharp wit, profanity allowed |
| 5 | Unfiltered | Brutal honesty, heavy profanity |

## Configuration

### Rate Limits

- 100 requests per 30 minutes per API key
- Configurable in `src/middleware/rateLimit.ts`


## Deployment

### Railway (Recommended)

1. Fork this repository
2. Create new project on [Railway](https://railway.app)
3. Connect GitHub repo
4. Add PostgreSQL database
5. Set environment variables:
   - `DATABASE_URL` (auto-set if using Railway Postgres)
   - `OPENAI_API_KEY`
6. Deploy

### Manual

```bash
# Build
npm run build

# Run migrations
npx prisma migrate deploy

# Start
npm start
```

## Demo

A Discord bot demo is included in `/demo/discord-bot/`.

### Features
- `/roast` slash command
- Configurable target, game, performance, and heat
- Easy Railway deployment

See [demo/discord-bot/README.md](demo/discord-bot/README.md) for setup instructions.

## Project Structure

```
roast-api/
├── app/
│   ├── routes/          # API endpoints
│   ├── services/        # Business logic
│   ├── middleware/      # Auth, rate limiting
│   ├── prompts/         # AI prompt templates
│   ├── types/           # TypeScript definitions
│   └── index.ts         # Entry point
├── prisma/
│   └── schema.prisma    # Database schema
├── demo/
│   └── discord-bot/     # Integration demo
├── docs/                # Documentation site
└── README.md
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Guidelines

- Follow existing code style
- Add tests for new features
- Update documentation as needed

## License

This project is licensed under the Apache License — see the [LICENSE](LICENSE) file for details.

**Disclaimer**: Users are responsible for how roasts are used in their applications. By using this API, you agree that the developer is not liable for misuse.

## Links

- [Live API](https://roast-api.up.railway.app)
- [Documentation](https://roast-api.up.railway.app/docs)
- [Discord Bot Demo](demo/discord-bot/)

## Author

**Abhinav Singh**

- GitHub: [@abhinavsingh1311](https://github.com/abhinavsingh1311)

---

<p align="center">Made in Alberta, Canada</p>
