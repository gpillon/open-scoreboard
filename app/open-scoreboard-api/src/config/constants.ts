import { Track } from '../api/track/entities/track.entity';
import { Game } from '../api/game/entities/game.entity';
import { PlayerScore } from '../api/game/entities/player-score.entity';
import { Lap } from '../api/lap/entities/lap.entity';
import { Player } from '../api/player/entities/player.entity';
import { GamePlayerSubscriber } from '../api/game/entities/game-player.subscriber';
import { PlayerSubscriber } from '../api/player/entities/player.subscriber';
import { User } from '../api/user/entities/user.entity';
import { UserCredential } from '../api/user/entities/user_credentials.entity';
import { UserSettings } from '../api/user/entities/user_settings.entity';
import { UserPhoto } from '../api/user/entities/user_photo.entity';

const TYPEORM_ENTITIES = [
  Track,
  Game,
  PlayerScore,
  Lap,
  Player,
  User,
  UserCredential,
  UserSettings,
  UserPhoto,
];
const TYPEORM_SUBSCRIBERS = [GamePlayerSubscriber, PlayerSubscriber];

export { TYPEORM_ENTITIES, TYPEORM_SUBSCRIBERS };
