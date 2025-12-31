# Roast as a service

## Provides configurable roasts as an API service for bots, streams, and party apps.

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

## ENDPOINTS: 

- Basic implementation: 
	- GET `/roast/random?length=200`;
	- POST `/roast/app-type=bots/random?level=3&theme=gaming&gameperformace=2&length=240`;
- Advanced ( based on the configuration styles): 
	- DELETE
	- PUT
	- PATCH
- Can also include generic endpoints for : GET `/health` & GET `/meta`

## TECH STACK:
- Typescript/Node.js + P-SQL 
- Stack : Express + Prisma + P-SQL + OpenAI SDK
- Additional features: Rate limiting to prevent abuse

## DATA MODELS:

- prisma/schema.prisma
	- models: `ApiKey`, `RoastLog` 
	- enums: `AppType`, `Theme`

- `API` specs: 
   - POST `/v1/roast`
	- returns a roast as JSON (main endpoint);
	- Example:
      
      "request" : 
      ```{
				"theme":"gaming",
				"heat":3,
				"length":200,
				"context":{
				   "name":"xX_NoScope_Xx",
				   "game":"Battlefield VI",
			           "performance":"0 kills, 15 deaths",
				   "customPrompt": "They instalock Jett every game"
				   }
		}
        ```
       "response": 
       ``` 
        {
  				"roast": "0 kills and 15 deaths? xX_NoScope_Xx, the only thing you're carrying is the enemy team's KDA. Maybe try Minecraft—at least the zombies move slower than your reaction time.",
  				"theme": "gaming",
  				"heat": 3,
  				"generatedAt": "2025-01-15T10:30:00Z"
    	 }
         ```
            
  - GET `/v1/themes`
	- List of all available themes
	- Example: 
      "themes": 
        ```
        [
            { "id": "coding", "description": "Dev/programming roasts", "sampleContext": ["language", "bugType", "stackOverflowVisits"] },
            { "id": "productivity", "description": "Habit/discipline roasts", "sampleContext": ["screenTime", "tasksMissed", "streakBroken"] },
            { "id": "gaming", "description": "Gamer performance roasts", "sampleContext": ["game", "performance", "rank"] },
            { "id": "educational", "description": "Student/learning roasts", "sampleContext": ["subject", "score", "questionsWrong"] }
        ]
        ```

  - POST `/v1/api-keys` 
	- self-service key generation
	- Example: 
 ```   
            "request": 
                    {
                     "name": "My Discord Bot",
                     "email": "dev@example.com",
                     "appType": "discord"
                     }
                        
            "response": 
                    {
                     "apiKey": "roast_live_abc123...",
                     "message": "Store this key securely. It won't be shown again."
                     }	
```

  - GET `/health`
       - status of the endpoints 
	- `{"status": "ok", "version": "1.0.0^"}`

## AUTH PATTERN
``` Header-based: `Authorization:Bearer roast_live_abc123...`
Prefix keys with `roast_live_` for clarity ```

## Folder structure: 
```
roast-api/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── routes/
│   │   ├── roast.ts
│   │   ├── themes.ts
│   │   └── apiKeys.ts
│   ├── services/
│   │   └── roastGenerator.ts   # OpenAI logic
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── rateLimit.ts
│   ├── prompts/
│   │   └── templates.ts        # Theme-specific system prompts
│   └── index.ts
├── docs/                        # Your fake docs page
└── demo/
    └── discord-bot/            # Integration demo
```

## TODO:
- Define data models for custom roasts (fields/placeholders)
- DRAFT all custom API endpoints requests/ response
- Sketch one primary integration ( webpage/ discord bot)
- Write fake `docs page` text

## License:

Check ![License](https://img.shields.io/badge/License-MIT-green) for the same. 




