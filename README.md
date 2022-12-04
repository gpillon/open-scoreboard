# OpenScoreboard

This project aims to creat a scoreboard for car raging game. Is still in development phase, so dont exept it works.

## TL;DR I wanto to Develop / try it!

```bash
# Pull the repo
git pull https://github.com/gpillon/open-scoreboard/
# Change directory
cd open-scoreboard
# Install Rush
npm install -g @microsoft/rush
# Install the NPM packages:
rush update
```

At this point monorepo is ready. for exaple, to run api:

```bash
# Pull the repo
cd open-scoreboard-api
# Install Rush
npm run start:dev
# Install the NPM packages:
rush update
```

## Its a Monorepo ❤!

Whole applicaiton is developed in a Monorepo, all packages composing application are in a single repo.

Folder Structure:

```bash
open-scorboard
├───app
│   ├───open-scoreboard-api
│   ├───open-scoreboard-fe
│   └───...
├───libs
│   ├───lib-1
│   ├───lib-2
│   └───...
└───other stuff
```

## TODO

- [x] Init Backend
- [ ] Auth for Backend
- [x] Init Frontend
- [ ] Realtime server
- [ ] Realtime fe Display
- [ ] k8s operators
- [ ] k8s operator

## Architecture

![](./docs/img/OpenScoreboardArch.drawio.png)
