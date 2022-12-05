import { FormGroup, FormControl, Validators } from '@angular/forms';

export const readHealthcheckDtoForm = new FormGroup({
  uptime: new FormControl(null, [Validators.required])
});

export const loginForm = new FormGroup({
  email: new FormControl(null, [Validators.required, Validators.email]),
  password: new FormControl(null, [Validators.required]),
  rememberMe: new FormControl(null, [Validators.required])
});

export const signUpDtoForm = new FormGroup({
  email: new FormControl(null, [Validators.required, Validators.email]),
  password: new FormControl(null, [Validators.required]),
  name: new FormControl(null, [Validators.required]),
  lastName: new FormControl(null, [])
});

export const resetPasswordForm = new FormGroup({
  email: new FormControl(null, [Validators.required, Validators.email]),
  password: new FormControl(null, [Validators.required]),
  confirmPassword: new FormControl(null, [Validators.required]),
  resetPasswordToken: new FormControl(null, [Validators.required])
});

export const emailForm = new FormGroup({
  email: new FormControl(null, [Validators.required, Validators.email])
});

export const tokensDtoForm = new FormGroup({
  expires_in: new FormControl(null, [Validators.required]),
  access_token: new FormControl(null, [Validators.required]),
  refresh_token: new FormControl(null, [Validators.required])
});

export const createUserDtoForm = new FormGroup({
  name: new FormControl(null, [Validators.required]),
  lastName: new FormControl(null, []),
  email: new FormControl(null, [Validators.required, Validators.email])
});

export const readUserDtoForm = new FormGroup({
  id: new FormControl(null, [Validators.required]),
  email: new FormControl(null, [Validators.required]),
  roles: new FormControl(null, [Validators.required]),
  name: new FormControl(null, []),
  lastName: new FormControl(null, [Validators.required])
});

export const updateUserDtoForm = new FormGroup({
  name: new FormControl(null, []),
  lastName: new FormControl(null, []),
  email: new FormControl(null, [Validators.email])
});

export const fileUploadDtoForm = new FormGroup({
  file: new FormControl(null, [Validators.required])
});

export const updateUserSettingsDtoForm = new FormGroup({
  themeName: new FormControl(null, [Validators.required])
});

export const updatePasswordDtoForm = new FormGroup({
  password: new FormControl(null, [Validators.required]),
  newPassword: new FormControl(null, [Validators.required])
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
  lapTime: new FormControl(null, [Validators.required]),
  lapNum: new FormControl(null, [])
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
  totalGames: new FormControl(null, [])
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
