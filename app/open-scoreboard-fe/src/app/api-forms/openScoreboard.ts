import { FormGroup, FormControl, Validators } from '@angular/forms';

export const readHealthcheckDtoForm = new FormGroup({
  uptime: new FormControl(null, [Validators.required])
});

export const countDtoForm = new FormGroup({
  count: new FormControl(null, [Validators.required])
});

export const createPlayerScoreDtoForm = new FormGroup({
  player: new FormControl(null, [Validators.required]),
  laps: new FormControl(null, [Validators.required])
});

export const createGameDtoForm = new FormGroup({
  playerScore: new FormControl(null, [Validators.required]),
  track: new FormControl(null, [Validators.required])
});

export const idNicknameDtoForm = new FormGroup({
  id: new FormControl(null, [Validators.required]),
  nickname: new FormControl(null, [Validators.required])
});

export const lapWithoutTrackAndPlayerForm = new FormGroup({
  lapNum: new FormControl(null, [Validators.required]),
  lapTime: new FormControl(null, [Validators.required])
});

export const readPlayerScoreDtoForm = new FormGroup({
  player: new FormControl(null, [Validators.required]),
  laps: new FormControl(null, [Validators.required]),
  totalTime: new FormControl(null, [Validators.required])
});

export const idNameDtoForm = new FormGroup({
  id: new FormControl(null, [Validators.required]),
  name: new FormControl(null, [Validators.required])
});

export const readGameDtoForm = new FormGroup({
  id: new FormControl(null, [Validators.required]),
  playerScore: new FormControl(null, [Validators.required]),
  track: new FormControl(null, [Validators.required]),
  createdAt: new FormControl(null, [Validators.required])
});

export const alreadyExistsErrForm = new FormGroup({
  message: new FormControl(null, [Validators.required]),
  error: new FormControl(null, [Validators.required]),
  statusCode: new FormControl(null, [Validators.required])
});

export const notFoundErrForm = new FormGroup({
  message: new FormControl(null, [Validators.required]),
  error: new FormControl(null, [Validators.required]),
  statusCode: new FormControl(null, [Validators.required])
});

export const updateGameDtoForm = new FormGroup({
  track: new FormControl(null, [])
});

export const badRequestDecoratorForm = new FormGroup({
  message: new FormControl(null, [Validators.required]),
  error: new FormControl(null, [Validators.required]),
  statusCode: new FormControl(null, [Validators.required])
});

export const createTrackDtoForm = new FormGroup({
  name: new FormControl(null, [Validators.required]),
  description: new FormControl(null, [])
});

export const readTrackDtoForm = new FormGroup({
  id: new FormControl(null, [Validators.required]),
  name: new FormControl(null, [Validators.required]),
  description: new FormControl(null, [Validators.required])
});

export const updateTrackDtoForm = new FormGroup({
  name: new FormControl(null, []),
  description: new FormControl(null, [])
});

export const createPlayerDtoForm = new FormGroup({
  nickname: new FormControl(null, [Validators.required])
});

export const readPlayerDtoForm = new FormGroup({
  id: new FormControl(null, [Validators.required]),
  nickname: new FormControl(null, [Validators.required]),
  totalGames: new FormControl(null, [Validators.required])
});

export const updatePlayerDtoForm = new FormGroup({
  nickname: new FormControl(null, [])
});

export const createLapDtoForm = new FormGroup({
  track: new FormControl(null, [Validators.required]),
  player: new FormControl(null, [Validators.required]),
  lapNum: new FormControl(null, [Validators.required]),
  lapTime: new FormControl(null, [Validators.required])
});

export const readLapDtoForm = new FormGroup({
  id: new FormControl(null, [Validators.required]),
  track: new FormControl(null, [Validators.required]),
  player: new FormControl(null, [Validators.required]),
  lapNum: new FormControl(null, [Validators.required]),
  lapTime: new FormControl(null, [Validators.required])
});

export const updateLapDtoForm = new FormGroup({
  track: new FormControl(null, []),
  player: new FormControl(null, []),
  lapNum: new FormControl(null, []),
  lapTime: new FormControl(null, [])
});
